import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import DocumentsDataTable from "@src/components/documents/documents-data-table";
import DocumentsList from "@src/components/documents/documents-list";

export default function DocumentsPage() {
  const { width } = useAppDimensions();
  if (width < 640) {
    return <DocumentsList />;
  }

  return (
    <AppScrollView wide>
      <DocumentsDataTable />
    </AppScrollView>
  );
}
