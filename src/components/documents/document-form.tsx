import { toLocalDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import type { DocumentFormData } from "@src/models";
import { useAppSelector, useDeleteApiV1UsersByUserIdDocumentsAndDocumentIdMutation } from "@src/store";
import { router } from "expo-router";
import { noop } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Button } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import Toast from "react-native-toast-message";

import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

import DocumentFormInputs, { resolver } from "./document-inputs";
import { useDocuments } from "./use-documents";

export interface DocumentFormProps {
  id: string;
}

export function DocumentForm(props: DocumentFormProps) {
  const { uploadDate, control, disabled, errors, isLoading, deleteDocument, setDisabled, setFocus } =
    useDocument(props);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <FormView>
      <DocumentFormInputs control={control} setFocus={setFocus} />

      <DatePickerInput
        label="Upload date"
        inputMode="start"
        locale="en-GB"
        mode="outlined"
        value={uploadDate}
        iconStyle={{ display: "none" }}
        onChange={noop}
        disabled
      />

      <ValidationText error={errors.root} />

      {disabled ? (
        <Button mode="contained" onPress={() => setDisabled(false)}>
          Edit
        </Button>
      ) : (
        <Button mode="contained" onPress={showFeatureInDevelopmentToast}>
          Submit
        </Button>
      )}

      <Button mode="contained-tonal" onPress={deleteDocument}>
        Delete
      </Button>
    </FormView>
  );
}

function useDocument({ id }: DocumentFormProps) {
  const { data, isLoading, error } = useDocuments();
  const document = data.find(item => item.id === id);
  const userId = useAppSelector(state => state.user.userId);

  const [disabled, setDisabled] = useState(true);
  const [uploadDate, setUploadDate] = useState<Date | undefined>();
  const [deleteRequest] = useDeleteApiV1UsersByUserIdDocumentsAndDocumentIdMutation();

  const {
    control,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
    reset,
  } = useForm<DocumentFormData>({
    disabled,
    resolver,
  });

  useEffect(() => {
    if (error) {
      const message = toErrorMessage(error);
      setError("root", { message });
    }
  }, [error, setError]);

  useEffect(() => {
    if (document) {
      const { name, number, issueDate, expiryDate, createdDate } = document;
      reset({ name, number, issueDate: toLocalDate(issueDate), expiryDate: toLocalDate(expiryDate) });
      setUploadDate(toLocalDate(createdDate));
    }
  }, [document, reset]);

  const deleteDocument = useCallback(async () => {
    try {
      if (id == null || userId == null) {
        return;
      }

      // TODO: Add modal confirmation
      await deleteRequest({ documentId: id, userId }).unwrap();
      router.replace("/(auth)/(seafarer)/documents/");
      Toast.show({ type: "info", text1: "Document deleted" });
    } catch (deleteError) {
      const message = toErrorMessage(deleteError);
      Toast.show({ type: "error", text1: "Delete error", text2: message });
    }
  }, [deleteRequest, id, userId]);

  return { uploadDate, control, disabled, errors, isLoading, isSubmitting, deleteDocument, setDisabled, setFocus };
}
