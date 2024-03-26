import type { CreateVoyageRequest } from "@src/store";

export interface VoyageFormData extends Omit<CreateVoyageRequest, "joiningDate" | "leavingDate"> {
  joiningDate?: Date;
  leavingDate?: Date;
}
