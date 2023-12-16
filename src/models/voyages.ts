import type { Voyage } from "@src/store";

import type { ProfileFormData } from "./user";

export interface VoyageFormData extends Omit<Voyage, "joiningDate" | "leavingDate"> {
  vesselType: ProfileFormData["vesselType"];
  joiningDate?: Date;
  leavingDate?: Date;
}
