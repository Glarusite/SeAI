import { toDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { isBlank, isValidDate } from "@src/common/validators";
import type { VerifyFormData } from "@src/models";
import { useAppSelector, useSaveDocumentMutation } from "@src/store";
import { resetScan } from "@src/store/slices/scan";
import { router } from "expo-router";
import { useCallback } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

export default function VerifyForm() {
  const { control, errors, isSubmitting, verify, setFocus, resetValues } = useVerify();

  return (
    <FormView>
      <ControlledTextInput
        control={control}
        name="name"
        mode="outlined"
        label="Document name"
        onSubmitEditing={() => setFocus("number")}
      />

      <ControlledTextInput
        control={control}
        name="number"
        label="Document number"
        inputMode="numeric"
        onSubmitEditing={() => setFocus("issueDate")}
      />

      <ControlledDateInput
        control={control}
        name="issueDate"
        label="Issue date"
        inputMode="start"
        locale="en"
        onSubmitEditing={() => setFocus("expiryDate")}
      />

      <ControlledDateInput
        control={control}
        name="expiryDate"
        label="Expiration date"
        inputMode="start"
        locale="en"
        onSubmitEditing={() => setFocus("expiryDate")}
      />

      <ValidationText error={errors.root} />

      <Button mode="contained" onPress={verify} disabled={isSubmitting}>
        {isSubmitting ? <ButtonActivityIndicator /> : "Verify"}
      </Button>

      <Button mode="contained-tonal" onPress={resetValues}>
        Reset
      </Button>
    </FormView>
  );
}

function useVerify() {
  const dispatch = useDispatch();
  const scan = useAppSelector(state => state.scan);
  const userId = useAppSelector(state => state.user.userId);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    setError,
    setFocus,
  } = useForm<VerifyFormData>({
    defaultValues: {
      name: scan.name,
      number: scan.number,
      issueDate: toDate(scan.issueDate),
      expiryDate: toDate(scan.expiryDate),
    },
    resolver,
  });

  const [verifyRequest] = useSaveDocumentMutation();
  const verify = handleSubmit(async ({ name, number, issueDate, expiryDate }) => {
    try {
      if (scan.id == null || userId == null) {
        return;
      }

      await verifyRequest({
        documentId: scan.id,
        userId,
        marineDocument: {
          name,
          number,
          issueDate: issueDate?.toJSON(),
          expiryDate: issueDate?.toJSON(),
        },
      }).unwrap();
      dispatch(resetScan());
      router.replace("/scanner/");
      Toast.show({
        type: "success",
        text1: "Verification successful!",
        text2: "Your document has been saved to your profile.",
      });
    } catch (error) {
      const message = toErrorMessage(error);
      setError("root", { message });
    }
  });

  const resetValues = useCallback(() => {
    setValue("name", scan.name);
    setValue("number", scan.number);
    setValue("issueDate", toDate(scan.issueDate));
    setValue("expiryDate", toDate(scan.expiryDate));
  }, [scan, setValue]);

  return { control, errors, isSubmitting, verify, setFocus, resetValues };
}

function resolver(values: VerifyFormData) {
  const { name, number, issueDate, expiryDate } = values;
  const errors: FieldErrors<VerifyFormData> = {};

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
