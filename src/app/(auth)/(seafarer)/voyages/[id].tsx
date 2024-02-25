import AppScrollView from "@src/components/app/app-scroll-view";
import { VoyageForm } from "@src/components/voyages/voyage-form";
import { useLocalSearchParams } from "expo-router";

export default function VoyagePage() {
  const { voyageId } = useVoyagePage();

  return (
    <AppScrollView>
      <VoyageForm id={voyageId} />
    </AppScrollView>
  );
}

function useVoyagePage() {
  const { id } = useLocalSearchParams();
  const voyageId = Array.isArray(id) ? id[0] : id;

  return { voyageId };
}
