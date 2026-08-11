import FeaturedWork from '@/components/landing/featured-work';
import Hero from '@/components/landing/hero';
import OtherThings from '@/components/landing/other-things';
import CtaSection from '@/components/shared/cta-section';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <OtherThings />
      {/* A fifth section belongs here, after the work. It is specced and
          blocked on a sign-off from outside this project, and it drops in at
          this point without rearranging anything above or below. */}
      <CtaSection />
    </>
  );
};

export default LandingPage;
