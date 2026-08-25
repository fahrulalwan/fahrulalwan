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
      {/* A fifth section belongs here, after the work. It is specced and
          blocked on a sign-off from outside this project, and it drops in at
          this point without rearranging anything above or below. */}
      {/* Currently used to sit inside Hero. It moved here so the opening ends
          on one screen and the first openable link arrives earlier in the page.
          It followed the gate-anchor section until that was cut; with the slot
          empty it now runs straight on from the work, which is the order this
          page had before the anchor was written. */}
      <Currently />
      <CtaSection />
      {/* Last thing on the page, deliberately after the CTA rather than before
          it: a colophon, not an argument. See the component for why the
          section that used to carry this link was cut instead of moved. */}
      <Colophon />
    </>
  );
};

export default LandingPage;
