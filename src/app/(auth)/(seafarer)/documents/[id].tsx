import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import DocumentFormView from "@src/components/documents/document-form-view";
import { useLocalSearchParams } from "expo-router";

export default function DocumentPage() {
  const { wide, documentId } = useDocumentPage();

  return (
    <AppScrollView wide={wide}>
      <DocumentFormView documentId={documentId} wide={wide} />
    </AppScrollView>
  );
}

function useDocumentPage() {
  const { id } = useLocalSearchParams();
  const documentId = Array.isArray(id) ? id[0] : id;

  const { width } = useAppDimensions();
  const wide = width >= 720;

  return { documentId, wide };
}
