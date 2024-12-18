import AppScrollView from "@src/components/app/app-scroll-view";
import LogoImage from "@src/components/ui/logo-image";
import Navigation from "@src/components/ui/navigation";

export default function HomePage() {
  return (
    <AppScrollView>
      <LogoImage title="SeAI" />
      <Navigation />
    </AppScrollView>
  );
}
