import { toErrorMessage } from "@src/common/error";
import { isBlank } from "@src/common/validators";
import { VerifyFormData } from "@src/models";
import { useAppSelector, useSaveDocumentMutation } from "@src/store";
import { resetScan } from "@src/store/slices/scan";
import { router } from "expo-router";
import { useCallback } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

export default function VerifyForm() {
  const { control, errors, isSubmitting, verify, setFocus, resetValues } = useVerify();

  console.log(errors.root);

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

      <ControlledTextInput
        control={control}
        name="issueDate"
        label="Issue date"
        onSubmitEditing={() => setFocus("expiryDate")}
      />

      <ControlledTextInput
        control={control}
        name="expiryDate"
        label="Expiration date"
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
      issueDate: scan.issueDate,
      expiryDate: scan.expiryDate,
    },
    resolver,
  });

  const [verifyRequest] = useSaveDocumentMutation();
  const verify = handleSubmit(async values => {
    try {
      if (scan.id == null || userId == null) {
        return;
      }

      await verifyRequest({ documentId: scan.id, userId, marineDocument: values }).unwrap();
      console.log("verifyRequest", values);
      dispatch(resetScan());
      router.replace("/scanner/");
      Toast.show({
        type: "success",
        text1: "Verification successful!",
        text2: "Your document has been saved to your profile.",
      });
    } catch (error) {
      console.error(error);
      const message = toErrorMessage(error);
      setError("root", { message });
    }
  });

  const resetValues = useCallback(() => {
    setValue("name", scan.name);
    setValue("number", scan.number);
    setValue("issueDate", scan.issueDate);
    setValue("expiryDate", scan.expiryDate);
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

  if (isBlank(issueDate)) {
    errors.issueDate = { type: "required", message: "Issue date is required" };
  }

  if (isBlank(expiryDate)) {
    errors.expiryDate = { type: "required", message: "Expiration date is required" };
  }

  return { errors, values };
}
