import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Home } from '@/pages/Home';
import { Shop } from '@/pages/Shop';
import { ProductDetail } from '@/pages/ProductDetail';
import { Cart } from '@/pages/Cart';
import { Story } from '@/pages/Story';
import { NotFound } from '@/pages/NotFound';

/**
 * The studio panel is code-split: none of it ships in the bundle a shopper
 * downloads. That is a size win, not a security measure — the real boundary is
 * Row Level Security in Postgres (see supabase/schema.sql).
 */
const AdminLogin = lazy(() =>
  import('@/pages/admin/AdminLogin').then((module) => ({ default: module.AdminLogin })),
);
const AdminLayout = lazy(() =>
  import('@/pages/admin/AdminLayout').then((module) => ({ default: module.AdminLayout })),
);
const AdminProducts = lazy(() =>
  import('@/pages/admin/AdminProducts').then((module) => ({ default: module.AdminProducts })),
);
const AdminProductForm = lazy(() =>
  import('@/pages/admin/AdminProductForm').then((module) => ({
    default: module.AdminProductForm,
  })),
);
const AdminReviews = lazy(() =>
  import('@/pages/admin/AdminReviews').then((module) => ({ default: module.AdminReviews })),
);
const AdminCollections = lazy(() =>
  import('@/pages/admin/AdminCollections').then((module) => ({
    default: module.AdminCollections,
  })),
);

function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <p className="text-body-sm text-on-surface-variant">Loading the studio…</p>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      {/* Storefront */}
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/story" element={<Story />} />
        {/* Legacy spelling keeps older Instagram links alive. */}
        <Route path="/our-story" element={<Navigate to="/story" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Studio */}
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<AdminLoading />}>
            <AdminLogin />
          </Suspense>
        }
      />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<AdminLoading />}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route index element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id" element={<AdminProductForm />} />
        <Route path="collections" element={<AdminCollections />} />
        <Route path="reviews" element={<AdminReviews />} />
      </Route>
    </Routes>
  );
}
