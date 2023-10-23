import type { MarineDocument } from "@src/store";

export interface Scan extends MarineDocument {
  uri: string;
}

export interface VerifyFormData extends Pick<MarineDocument, "name" | "number"> {
  issueDate?: Date;
  expiryDate?: Date;
}
