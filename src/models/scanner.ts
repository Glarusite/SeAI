import { MarineDocument } from "@src/store";

export interface Scan extends MarineDocument {
  uri: string;
}

export interface VerifyFormData extends Omit<MarineDocument, "id" | "createdDate" | "path" | "verified"> {}
