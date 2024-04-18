import type { GetUserApiResponse } from "@src/store";

import type { DropDownList } from "./app";

export const rankList: DropDownList<GetUserApiResponse["rank"]> = [
  { label: "Not selected", value: "" },
  { label: "Master/Captain (CPT)", value: "CAPTAIN" },
  { label: "Chief Officer (C/O)", value: "CHIEF_OFFICER" },
  { label: "First Officer", value: "FIRST_OFFICER" },
  { label: "Second Officer (2/O)", value: "SECOND_OFFICER" },
  { label: "Third Officer (3/O)", value: "THIRD_OFFICER" },
  { label: "Deck Cadet (D/C)", value: "DECK_CADET" },
  { label: "Chief Engineer (C/E)", value: "CHIEF_ENGINEER" },
  { label: "First Engineer (1/E)", value: "FIRST_ENGINEER" },
  { label: "Second Engineer (2/E)", value: "SECOND_ENGINEER" },
  { label: "Third Engineer (3/E)", value: "THIRD_ENGINEER" },
  { label: "Fourth Engineer (4/E)", value: "FOURTH_ENGINEER" },
  { label: "Electro-Technical Officer (ETO)", value: "ELECTRO_TECHNICAL_OFFICER" },
  { label: "Boatswain (BSN)", value: "BOATSWAIN" },
  { label: "Able Seaman (AB)", value: "ABLE_SEAMAN" },
  { label: "Ordinary Seaman (OS)", value: "ORDINARY_SEAMAN" },
  { label: "Chief Steward (C/STW)", value: "CHIEF_STEWARD" },
  { label: "Steward (STW)", value: "STEWARD" },
  { label: "Messman (MSN)", value: "MESSMAN" },
  { label: "Fitter (FTR)", value: "FITTER" },
  { label: "Pumpman (P/P)", value: "PUMPMAN" },
  { label: "Cook (C/K)", value: "COOK" },
  { label: "Motorman (M/M)", value: "MOTORMAN" },
  { label: "Oiler", value: "OILER" },
  { label: "Welder", value: "WELDER" },
  { label: "Refrigeration Engineer", value: "REFRIGERATION_ENGINEER" },
  { label: "Trainee Officer", value: "TRAINEE_OFFICER" },
  { label: "Radio Officer/Radio Operator", value: "RADIO_OFFICER" },
];
