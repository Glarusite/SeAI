import { DocumentsList } from "@src/components/documents/documents-list";
import BackButton from "@src/components/ui/buttons/back-button";
import NarrowView from "@src/components/ui/narrow-view";
import { PageTitle } from "@src/components/ui/page-title";

export default function DocumentsPage() {
  return (
    <NarrowView>
      <PageTitle>Documents</PageTitle>
      <BackButton />
      <DocumentsList />
    </NarrowView>
  );
}
