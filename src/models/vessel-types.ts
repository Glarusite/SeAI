import type { GetUserResponse } from "@src/store";

import type { DropDownList } from "./app";

export const vesselTypeList: DropDownList<GetUserResponse["vesselType"]> = [
  { label: "Not selected", value: "" },
  { label: "Container", value: "Container" },
  { label: "Crude Oil", value: "Crude Oil" },
  { label: "Product Oil", value: "Product Oil" },
  { label: "LPG (Liquefied Petroleum Gas)", value: "LPG (Liquefied Petroleum Gas)" },
  { label: "LNG (Liquefied Natural Gas)", value: "LNG (Liquefied Natural Gas" },
  { label: "Reefer", value: "Reefer" },
  { label: "Ro-Ro (Roll-On/Roll-Off)", value: "Ro-Ro (Roll-On/Roll-Off)" },
  { label: "General Cargo", value: "General Cargo" },
  { label: "Cruise", value: "Cruise" },
  { label: "Ferry", value: "Ferry" },
  { label: "Ocean Liner", value: "Ocean Liner" },
  { label: "Catamaran", value: "Catamaran" },
  { label: "Motor Yacht", value: "Motor Yacht" },
  { label: "Sailing Yacht", value: "Sailing Yacht" },
  { label: "Mega Yacht", value: "Mega Yacht" },
  { label: "Explorer Yacht", value: "Explorer Yacht" },
  { label: "Sport Fishing Yacht", value: "Sport Fishing Yacht" },
];
