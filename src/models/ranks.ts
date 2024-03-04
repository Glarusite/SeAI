import type { GetUserApiResponse } from "@src/store";

import type { DropDownList } from "./app";

export const rankList: DropDownList<GetUserApiResponse["rank"]> = [
  { label: "Not selected", value: "" },
  { label: "Master/Captain (CPT)", value: "Master/Captain (CPT)" },
  { label: "Chief Officer (C/O)", value: "Chief Officer (C/O)" },
  { label: "First Officer", value: "First Officer" },
  { label: "Second Officer (2/O)", value: "Second Officer (2/O)" },
  { label: "Third Officer (3/O)", value: "Third Officer (3/O)" },
  { label: "Deck Cadet (D/C)", value: "Deck Cadet (D/C)" },
  { label: "Chief Engineer (C/E)", value: "Chief Engineer (C/E)" },
  { label: "First Engineer (1/E)", value: "First Engineer (1/E)" },
  { label: "Second Engineer (2/E)", value: "Second Engineer (2/E)" },
  { label: "Third Engineer (3/E)", value: "Third Engineer (3/E)" },
  { label: "Fourth Engineer (4/E)", value: "Fourth Engineer (4/E)" },
  { label: "Electro-Technical Officer (ETO)", value: "Electro-Technical Officer (ETO)" },
  { label: "Boatswain (BSN)", value: "Boatswain (BSN)" },
  { label: "Able Seaman (AB)", value: "Able Seaman (AB)" },
  { label: "Ordinary Seaman (OS)", value: "Ordinary Seaman (OS)" },
  { label: "Chief Steward (C/STW)", value: "Chief Steward (C/STW)" },
  { label: "Steward (STW)", value: "Steward (STW)" },
  { label: "Messman (MSN)", value: "Messman (MSN)" },
  { label: "Fitter (FTR)", value: "Fitter (FTR)" },
  { label: "Pumpman (P/P)", value: "Pumpman (P/P)" },
  { label: "Cook (C/K)", value: "Cook (C/K)" },
  { label: "Motorman (M/M)", value: "Motorman (M/M)" },
  { label: "Oiler", value: "Oiler" },
  { label: "Welder", value: "Welder" },
  { label: "Refrigeration Engineer", value: "Refrigeration Engineer" },
  { label: "Trainee Officer", value: "Trainee Officer" },
  { label: "Radio Officer/Radio Operator", value: "Radio Officer/Radio Operator" },
];
