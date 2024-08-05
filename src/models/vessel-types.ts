import type { Option } from "react-native-paper-dropdown";

import type { GetUserResponse } from "@src/store";

export type VesselType = Required<GetUserResponse>["vesselType"];
export const vesselTypeLabels: Record<VesselType, string> = {
  BULK_CARRIER: "Bulk Carrier",
  CONTAINER: "Container",
  CRUDE_OIL: "Crude Oil",
  PRODUCT_OIL: "Product Oil",
  LPG: "LPG (Liquefied Petroleum Gas)",
  LNG: "LNG (Liquefied Natural Gas)",
  REEFER: "Reefer",
  RO_RO: "Ro-Ro (Roll-On/Roll-Off)",
  GENERAL_CARGO: "General Cargo",
  CRUISE: "Cruise",
  FERRY: "Ferry",
  OCEAN_LINER: "Ocean Liner",
  CATAMARAN: "Catamaran",
  MOTOR_YACHT: "Motor Yacht",
  SAILING_YACHT: "Sailing Yacht",
  MEGA_YACHT: "Mega Yacht",
  EXPLORER_YACHT: "Explorer Yacht",
  SPORT_FISHING_YACHT: "Sport Fishing Yacht",
};

export const vesselTypeList: Option[] = Object.entries(vesselTypeLabels).map(([value, label]) => ({ label, value }));
