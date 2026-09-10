-- Atelier Pétale — database schema and security model
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- SECURITY MODEL — read this before changing anything below.
--
-- The site is a public single-page app. Its bundle, including the anon key, is
-- readable by anyone. That is by design and is not a leak: the anon key grants
-- nothing on its own. Every permission decision happens here, in Postgres, and
-- cannot be bypassed from the browser.
--
-- Being signed in is NOT enough to write. Supabase's `authenticated` role is
-- handed to anyone who creates an account, so policies keyed on it would let a
-- stranger who signs up edit the catalogue. Writes require membership of the
-- `admins` table, which can only be changed from this SQL editor (the service
-- role bypasses RLS; nothing reachable from the browser can insert into it).
--
-- Shape note: these tables mirror src/types.ts, so the app maps rows to its
-- existing types without reshaping anything.

-- ---------------------------------------------------------------------------
-- Admin allowlist — the actual gate
-- ---------------------------------------------------------------------------
create table if not exists admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

-- Deliberately the ONLY policy on this table: an admin may confirm their own
-- row. There is no insert/update/delete policy, so the API cannot grant admin
-- rights to anyone, under any circumstances. Adding an admin is a manual SQL
-- step (see the bottom of this file).
drop policy if exists "admin reads own row" on admins;
create policy "admin reads own row" on admins
  for select using (user_id = auth.uid());

-- `security definer` lets this read `admins` past that policy. `search_path` is
-- pinned so the function cannot be hijacked by a shadowing schema.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Collections
-- ---------------------------------------------------------------------------
create table if not exists categories (
  id         text primary key,
  label      text not null,
  icon       text not null default 'local_florist',
  image      text,
  image_alt  text,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Products
--
-- variants / includes / images stay jsonb: they are always read and written
-- with the product as one unit and never queried across products.
-- ---------------------------------------------------------------------------
create table if not exists products (
  id            text primary key,
  slug          text not null unique,
  name          text not null,
  tagline       text not null default '',
  description   text not null default '',
  price         int  not null check (price >= 0),
  category_id   text references categories (id) on delete set null,
  badge         jsonb,                       -- { label, tone } | null
  images        jsonb not null default '[]', -- [{ src, alt }]
  variants      jsonb not null default '[]', -- [{ id, name, descriptor, swatch }]
  includes      jsonb not null default '[]', -- [{ label, note }]
  care          text not null default '',
  gifting       text not null default '',
  hours_to_make numeric(5,2) not null default 1 check (hours_to_make >= 0),
  in_stock      boolean not null default true,
  featured      boolean not null default false,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_category_idx on products (category_id);
create index if not exists products_featured_idx on products (featured) where featured;

-- ---------------------------------------------------------------------------
-- Reviews — entered by the studio, one row per review, keyed to a product.
-- `featured_on_home` drives the home page reviews carousel.
-- ---------------------------------------------------------------------------
create table if not exists reviews (
  id               uuid primary key default gen_random_uuid(),
  product_id       text not null references products (id) on delete cascade,
  author           text not null,
  initials         text not null default '',
  location         text,
  rating           int  not null check (rating between 1 and 5),
  body             text not null,
  review_date      date not null default current_date,
  verified         boolean not null default true,
  featured_on_home boolean not null default false,
  created_at       timestamptz not null default now()
);

create index if not exists reviews_product_idx on reviews (product_id);
create index if not exists reviews_home_idx on reviews (featured_on_home) where featured_on_home;

-- ---------------------------------------------------------------------------
-- Keep updated_at honest
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at() returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch_updated_at on products;
create trigger products_touch_updated_at
  before update on products
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- Reads: open, so the storefront works for signed-out visitors.
-- Writes: is_admin() only. Note each write policy carries BOTH `using` (which
-- rows may be touched) and `with check` (what the row may become) — omitting
-- `with check` would let an admin-only update smuggle in a row they cannot see.
-- ---------------------------------------------------------------------------
alter table categories enable row level security;
alter table products   enable row level security;
alter table reviews    enable row level security;

drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);

drop policy if exists "public read reviews" on reviews;
create policy "public read reviews" on reviews for select using (true);

drop policy if exists "admin writes categories" on categories;
create policy "admin writes categories" on categories
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin writes products" on products;
create policy "admin writes products" on products
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin writes reviews" on reviews;
create policy "admin writes reviews" on reviews
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Image storage
--
-- First create a PUBLIC bucket named `product-images` in Dashboard → Storage,
-- then these policies make it readable by all and writable by admins only.
-- ---------------------------------------------------------------------------
drop policy if exists "public read product images" on storage.objects;
create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "admin uploads product images" on storage.objects;
create policy "admin uploads product images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admin updates product images" on storage.objects;
create policy "admin updates product images" on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images' and public.is_admin())
  with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admin deletes product images" on storage.objects;
create policy "admin deletes product images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

-- ===========================================================================
-- FINAL STEP — grant yourself admin
--
-- 1. Dashboard → Authentication → Users → Add user. Use a real email and a
--    long, unique password. Turn OFF "Auto Confirm" only if you want to verify
--    by email first.
--
-- 2. Dashboard → Authentication → Providers → Email: turn OFF "Enable sign
--    ups". Nothing in this app signs anyone up, and the allowlist above already
--    blocks a stranger's account from writing — but closing the door as well
--    means no unexpected accounts exist at all.
--
-- 3. Run the line below with your email to add yourself to the allowlist.
--    This is the only way in, and it only works from this SQL editor.
-- ===========================================================================
-- insert into admins (user_id, email)
-- select id, email from auth.users where email = 'you@example.com'
-- on conflict (user_id) do nothing;

-- Verify who has access at any time:
-- select a.email, a.created_at from admins a order by a.created_at;
