import {
  AppSteps,
  CallToAction,
  EditorPreview,
  Footer,
  Hero,
} from "./components";

export function LandingPage() {
  return (
    <main>
      <Hero/>
      <AppSteps />
      <EditorPreview />
      <CallToAction />
      <Footer />
    </main>
  );
}
