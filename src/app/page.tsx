import Currently from '@/components/landing/currently';
import FeaturedWork from '@/components/landing/featured-work';
import Hero from '@/components/landing/hero';
import OtherThings from '@/components/landing/other-things';
import CtaSection from '@/components/shared/cta-section';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <FeaturedWork />
      {/* A fifth section belongs here, after the work. It is specced and
          blocked on a sign-off from outside this project, and it drops in at
          this point without rearranging anything above or below. */}
      <OtherThings />
      {/* Currently used to sit inside Hero. It moved here so the opening ends
          on one screen and the first openable link arrives at 35% of the page
          rather than 48%. It sits after the short list rather than directly
          after the case studies, so the two evidence sections stay adjacent
          and the reserved slot above keeps its place. */}
      <Currently />
      <CtaSection />
    </>
  );
};

export default LandingPage;
