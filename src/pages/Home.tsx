import { useEffect } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { CraftStory } from '@/components/home/CraftStory';
import { GalleryStrip } from '@/components/home/GalleryStrip';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { CustomOrderCta } from '@/components/home/CustomOrderCta';
import { siteConfig } from '@/config/site';

export function Home() {
  useEffect(() => {
    document.title = `${siteConfig.name} — ${siteConfig.tagline}`;
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <FeaturedCollection />
      <CraftStory />
      <GalleryStrip />
      <ReviewsSection />
      <CustomOrderCta />
    </>
  );
}
