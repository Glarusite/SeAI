import type { MarineDocument } from "@src/store";

export interface Scan extends MarineDocument {
  uri: string;
}

export interface DocumentFormData extends Pick<MarineDocument, "name" | "number"> {
  issueDate?: Date;
  expiryDate?: Date;
}
