import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import VoyagesDataTable from "@src/components/voyages/voyages-data-table";
import { VoyagesList } from "@src/components/voyages/voyages-list";

export default function VoyagesPage() {
  const { width } = useAppDimensions();
  if (width < 640) {
    return <VoyagesList />;
  }

  return (
    <AppScrollView wide>
      <VoyagesDataTable />
    </AppScrollView>
  );
}
