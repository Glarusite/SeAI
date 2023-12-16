import { VoyageForm } from "./voyage-form";

export interface VoyageReviewProps {
  voyageId: string;
}

export default function VoyageReview({ voyageId }: VoyageReviewProps) {
  return <VoyageForm id={voyageId} />;
}
