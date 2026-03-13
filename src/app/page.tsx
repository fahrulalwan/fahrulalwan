import ApproachTeaser from '@/components/landing/approach-teaser';
import FeaturedWork from '@/components/landing/featured-work';
import Hero from '@/components/landing/hero';
import WhatIBring from '@/components/landing/what-i-bring';
import CtaSection from '@/components/shared/cta-section';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <ScrollReveal>
        <WhatIBring />
      </ScrollReveal>
      <ScrollReveal delay="0.1s">
        <FeaturedWork />
      </ScrollReveal>
      <ScrollReveal delay="0.2s">
        <ApproachTeaser />
      </ScrollReveal>
      <ScrollReveal delay="0.3s">
        <CtaSection />
      </ScrollReveal>
    </>
  );
};

export default LandingPage;
