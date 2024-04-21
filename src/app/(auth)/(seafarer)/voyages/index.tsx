import { useAppDimensions } from "@src/common/hooks";
import AppSafeAreaView from "@src/components/app/app-safe-area-view";
import AppScrollView from "@src/components/app/app-scroll-view";
import VoyagesDataTable from "@src/components/voyages/voyages-data-table";
import VoyagesList from "@src/components/voyages/voyages-list";

export default function VoyagesPage() {
  const { width } = useAppDimensions();
  if (width < 800) {
    return (
      <AppSafeAreaView>
        <VoyagesList />
      </AppSafeAreaView>
    );
  }

  return (
    <AppScrollView wide>
      <VoyagesDataTable />
    </AppScrollView>
  );
}
