import {
  AppSteps,
  CallToAction,
  EditorPreview,
  Footer,
  Hero,
} from "./components";

export function LandingPage() {
  return (
    <main className="p-4 pb-0">
      <Hero/>
      <AppSteps />
      <EditorPreview />
      <CallToAction />
      <Footer />
    </main>
  );
}
