import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import DocumentFormView from "@src/components/documents/document-form-view";

export default function VerifyDocumentPage() {
  const { width } = useAppDimensions();
  const wide = width >= 720;

  return (
    <AppScrollView wide={wide}>
      <DocumentFormView wide={wide} />
    </AppScrollView>
  );
}
