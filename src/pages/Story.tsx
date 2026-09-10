import { useEffect } from 'react';
import { StoryHero } from '@/components/story/StoryHero';
import { FounderNote } from '@/components/story/FounderNote';
import { CraftPillars } from '@/components/story/CraftPillars';
import { VignetteGallery } from '@/components/story/VignetteGallery';
import { CommissionCta } from '@/components/story/CommissionCta';
import { siteConfig } from '@/config/site';

export function Story() {
  useEffect(() => {
    document.title = `Our story — ${siteConfig.name}`;
  }, []);

  return (
    <>
      <StoryHero />
      <FounderNote />
      <CraftPillars />
      <VignetteGallery />
      <CommissionCta />
    </>
  );
}
