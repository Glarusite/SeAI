import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import DocumentReview from "@src/components/documents/document-review";
import { useLocalSearchParams } from "expo-router";

export default function DocumentPage() {
  const { wide, documentId } = useDocumentPage();

  return (
    <AppScrollView wide={wide}>
      <DocumentReview documentId={documentId} wide={wide} />
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
