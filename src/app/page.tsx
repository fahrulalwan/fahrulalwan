import Colophon from '@/components/landing/colophon';
import Currently from '@/components/landing/currently';
import FeaturedWork from '@/components/landing/featured-work';
import Hero from '@/components/landing/hero';
import CtaSection from '@/components/shared/cta-section';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <FeaturedWork />
      {/* A fifth section belongs here, specced and blocked on an external
          sign-off. It drops in without rearranging anything around it. */}
      <Currently />
      <CtaSection />
      {/* After the CTA, not before: a colophon, not an argument. */}
      <Colophon />
    </>
  );
};

export default LandingPage;
