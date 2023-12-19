import AppScrollView from "@src/components/app/app-scroll-view";
import VoyageReview from "@src/components/voyages/voyage-review";
import { useLocalSearchParams } from "expo-router";

export default function VoyagePage() {
  const { voyageId } = useVoyagePage();

  return (
    <AppScrollView>
      <VoyageReview voyageId={voyageId} />
    </AppScrollView>
  );
}

function useVoyagePage() {
  const { id } = useLocalSearchParams();
  const voyageId = Array.isArray(id) ? id[0] : id;

  return { voyageId };
}
