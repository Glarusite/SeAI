import { isBlank, isValidDate } from "@src/common/validators";
import type { DocumentFormData } from "@src/models";
import { useCallback } from "react";
import type { Control, FieldErrors } from "react-hook-form";

import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledTextInput from "../ui/form/controlled-text-input";

export interface DocumentFormInputsProps {
  control: Control<DocumentFormData>;
  setFocus: (name: keyof DocumentFormData) => void;
}

export default function DocumentFormInputs({ control, setFocus }: DocumentFormInputsProps) {
  const setNumberFocus = useCallback(() => setFocus("number"), [setFocus]);
  const setIssueDateFocus = useCallback(() => setFocus("issueDate"), [setFocus]);
  const setExpiryDateFocus = useCallback(() => setFocus("expiryDate"), [setFocus]);

  return (
    <>
      <ControlledTextInput
        control={control}
        name="name"
        mode="outlined"
        label="Document name"
        onSubmitEditing={setNumberFocus}
      />

      <ControlledTextInput
        control={control}
        name="number"
        label="Document number"
        inputMode="numeric"
        onSubmitEditing={setIssueDateFocus}
      />

      <ControlledDateInput
        control={control}
        name="issueDate"
        label="Issue date"
        inputMode="start"
        locale="en-GB"
        onSubmitEditing={setExpiryDateFocus}
      />

      <ControlledDateInput
        control={control}
        name="expiryDate"
        label="Expiration date"
        inputMode="start"
        locale="en-GB"
      />
    </>
  );
}

export function resolver(values: DocumentFormData) {
  const { name, number, issueDate, expiryDate } = values;
  const errors: FieldErrors<DocumentFormData> = {};

  if (isBlank(name)) {
    errors.name = { type: "required", message: "Document name is required" };
  }

  if (isBlank(number)) {
    errors.number = { type: "required", message: "Document number is required" };
  }

  if (issueDate == null) {
    errors.issueDate = { type: "required", message: "Issue date is required" };
  } else if (!isValidDate(issueDate)) {
    errors.issueDate = { type: "invalid", message: "Issue date is invalid" };
  }

  if (expiryDate == null) {
    errors.expiryDate = { type: "required", message: "Expiration date is required" };
  } else if (!isValidDate(expiryDate)) {
    errors.expiryDate = { type: "invalid", message: "Expiration date is invalid" };
  }

  return { errors, values };
}
