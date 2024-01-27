import type { GetDocumentResponse } from "@src/store";

export interface Scan extends GetDocumentResponse {
  uri: string;
}

export interface DocumentFormData extends Pick<GetDocumentResponse, "name" | "number"> {
  issueDate?: Date;
  expiryDate?: Date;
}
