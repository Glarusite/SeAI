import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import DocumentsDataTable from "@src/components/documents/documents-data-table";
import DocumentsList from "@src/components/documents/documents-list";
import { useLocalSearchParams } from "expo-router";

export default function DocumentsPage() {
  const { width } = useAppDimensions();
  const { filter } = useLocalSearchParams();
  if (width < 640) {
    return <DocumentsList filter={filter} />;
  }

  return (
    <AppScrollView wide>
      <DocumentsDataTable filter={filter} />
    </AppScrollView>
  );
}
