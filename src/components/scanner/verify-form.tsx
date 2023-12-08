import { toLocalDate, toUtcDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import type { DocumentFormData } from "@src/models";
import { useAppSelector, useDiscardMutation, useSaveDocumentMutation } from "@src/store";
import { resetScan } from "@src/store/slices/scan";
import { router } from "expo-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import DocumentFormInputs, { resolver } from "../documents/document-inputs";
import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

export default function VerifyForm() {
  const { control, errors, isSubmitting, discard, verify, setFocus } = useVerify();

  return (
    <FormView>
      <DocumentFormInputs control={control} setFocus={setFocus} />

      <ValidationText error={errors.root} />

      <Button mode="contained" onPress={verify} disabled={isSubmitting}>
        {isSubmitting ? <ButtonActivityIndicator /> : "Verify"}
      </Button>

      <Button mode="contained-tonal" onPress={discard}>
        Discard
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
    setError,
    setFocus,
  } = useForm<DocumentFormData>({
    defaultValues: {
      name: scan.name,
      number: scan.number,
      issueDate: toLocalDate(scan.issueDate),
      expiryDate: toLocalDate(scan.expiryDate),
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
          issueDate: toUtcDate(issueDate)?.toJSON(),
          expiryDate: toUtcDate(expiryDate)?.toJSON(),
        },
      }).unwrap();

      dispatch(resetScan());
      router.replace("/scanner/");
      Toast.show({
        text1: "Verification successful",
        text2: "Your document has been saved to your profile.",
      });
    } catch (error) {
      const message = toErrorMessage(error);
      setError("root", { message });
    }
  });

  const [discardRequest] = useDiscardMutation();
  const discard = useCallback(async () => {
    try {
      if (scan.id == null || userId == null) {
        return;
      }

      await discardRequest({ documentId: scan.id, userId }).unwrap();

      dispatch(resetScan());
      router.replace("/scanner/");
      Toast.show({ type: "info", text1: "Document discarded" });
    } catch (error) {
      const message = toErrorMessage(error);
      Toast.show({ type: "error", text1: "Discard error", text2: message });
    }
  }, [discardRequest, dispatch, scan.id, userId]);

  return { control, errors, isSubmitting, discard, verify, setFocus };
}
