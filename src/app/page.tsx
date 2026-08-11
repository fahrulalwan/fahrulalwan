import FeaturedWork from '@/components/landing/featured-work';
import Hero from '@/components/landing/hero';
import OtherThings from '@/components/landing/other-things';
import CtaSection from '@/components/shared/cta-section';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <ScrollReveal>
        <FeaturedWork />
      </ScrollReveal>
      <ScrollReveal delay="0.05s">
        <OtherThings />
      </ScrollReveal>
      {/* A fifth section belongs here, after the work. It is specced and
          blocked on a sign-off from outside this project, and it drops in at
          this point without rearranging anything above or below. */}
      <ScrollReveal delay="0.2s">
        <CtaSection />
      </ScrollReveal>
    </>
  );
};

export default LandingPage;
