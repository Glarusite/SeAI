import type { GetVoyageResponse } from "@src/store";

import type { ProfileFormData } from "./user";

export interface VoyageFormData extends Omit<GetVoyageResponse, "joiningDate" | "leavingDate"> {
  vesselType: ProfileFormData["vesselType"];
  joiningDate?: Date;
  leavingDate?: Date;
}
