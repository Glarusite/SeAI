import type { DropDownList } from "./app";

import type { GetUserResponse } from "@src/store";

export type Rank = Required<GetUserResponse>["rank"];

export const rankLabels: Record<Rank, string> = {
  CAPTAIN: "Master/Captain (CPT)",
  CHIEF_OFFICER: "Chief Officer (C/O)",
  FIRST_OFFICER: "First Officer",
  SECOND_OFFICER: "Second Officer (2/O)",
  THIRD_OFFICER: "Third Officer (3/O)",
  DECK_CADET: "Deck Cadet (D/C)",
  CHIEF_ENGINEER: "Chief Engineer (C/E)",
  FIRST_ENGINEER: "First Engineer (1/E)",
  SECOND_ENGINEER: "Second Engineer (2/E)",
  THIRD_ENGINEER: "Third Engineer (3/E)",
  FOURTH_ENGINEER: "Fourth Engineer (4/E)",
  ELECTRO_TECHNICAL_OFFICER: "Electro-Technical Officer (ETO)",
  BOATSWAIN: "Boatswain (BSN)",
  ABLE_SEAMAN: "Able Seaman (AB)",
  ORDINARY_SEAMAN: "Ordinary Seaman (OS)",
  CHIEF_STEWARD: "Chief Steward (C/STW)",
  STEWARD: "Steward (STW)",
  MESSMAN: "Messman (MSN)",
  FITTER: "Fitter (FTR)",
  PUMPMAN: "Pumpman (P/P)",
  COOK: "Cook (C/K)",
  MOTORMAN: "Motorman (M/M)",
  OILER: "Oiler",
  WELDER: "Welder",
  REFRIGERATION_ENGINEER: "Refrigeration Engineer",
  TRAINEE_OFFICER: "Trainee Officer",
  RADIO_OFFICER: "Radio Officer/Radio Operator",
};

export const rankList: DropDownList<Rank> = [
  { label: "Not selected", value: "" },
  ...Object.entries(rankLabels).map(([key, label]) => ({
    value: key as Rank,
    label,
  })),
];
