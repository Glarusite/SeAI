import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import DocumentForm from "@src/components/documents/document-form";

export default function NewDocumentPage() {
  const { width } = useAppDimensions();
  const wide = width >= 720;

  return (
    <AppScrollView wide={wide}>
      <DocumentForm wide={wide} />
    </AppScrollView>
  );
}
