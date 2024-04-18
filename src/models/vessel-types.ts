import type { GetUserResponse } from "@src/store";

import type { DropDownList } from "./app";

export const vesselTypeList: DropDownList<GetUserResponse["vesselType"]> = [
  { label: "Not selected", value: "" },
  { label: "Container", value: "CONTAINER" },
  { label: "Crude Oil", value: "CRUDE_OIL" },
  { label: "Product Oil", value: "PRODUCT_OIL" },
  { label: "LPG (Liquefied Petroleum Gas)", value: "LPG" },
  { label: "LNG (Liquefied Natural Gas)", value: "LNG" },
  { label: "Reefer", value: "REEFER" },
  { label: "Ro-Ro (Roll-On/Roll-Off)", value: "RO_RO" },
  { label: "General Cargo", value: "GENERAL_CARGO" },
  { label: "Cruise", value: "CRUISE" },
  { label: "Ferry", value: "FERRY" },
  { label: "Ocean Liner", value: "OCEAN_LINER" },
  { label: "Catamaran", value: "CATAMARAN" },
  { label: "Motor Yacht", value: "MOTOR_YACHT" },
  { label: "Sailing Yacht", value: "SAILING_YACHT" },
  { label: "Mega Yacht", value: "MEGA_YACHT" },
  { label: "Explorer Yacht", value: "EXPLORER_YACHT" },
  { label: "Sport Fishing Yacht", value: "SPORT_FISHING_YACHT" },
];
