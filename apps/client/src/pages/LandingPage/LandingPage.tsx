import {
  AppSteps,
  CallToAction,
  EditorPreview,
  Footer,
  Hero,
} from "../../features/landing-page/components";

export function LandingPage() {
  return (
    <>
      <Hero />
      <AppSteps />
      <EditorPreview />
      <CallToAction />
      <Footer />
    </>
  );
}
