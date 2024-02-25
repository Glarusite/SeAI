import { AsyncAlert } from "@src/common/async-alert";
import { toLocalDate, toUtcDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { toFormData } from "@src/common/form-data";
import { isBlank, isInvalidDate } from "@src/common/validators";
import type { DocumentFormData } from "@src/models";
import {
  useAppDispatch,
  useAppSelector,
  useCreateMutation,
  useDeleteApiV1UsersByUserIdDocumentsAndDocumentIdMutation,
  useUpdateMutation,
  useUpload1Mutation,
} from "@src/store";
import { resetScan } from "@src/store/slices/scan";
import { router } from "expo-router";
import { noop } from "lodash";
import { useCallback, useEffect, useState } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Button } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

import { useDocuments } from "./use-documents";

export interface DocumentFormProps {
  id: string | undefined;
}

export function DocumentForm(props: DocumentFormProps) {
  const {
    uploadDate,
    control,
    disabled,
    errors,
    isLoading,
    isNew,
    isVerify,
    isSubmitting,
    deleteDocument,
    discardDocument,
    setDisabled,
    setFocus,
    submitDocument,
  } = useDocument(props);

  const setNumberFocus = useCallback(() => setFocus("number"), [setFocus]);
  const setIssueDateFocus = useCallback(() => setFocus("issueDate"), [setFocus]);
  const setExpiryDateFocus = useCallback(() => setFocus("expiryDate"), [setFocus]);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <FormView>
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
        onSubmitEditing={submitDocument}
      />

      {!isNew && (
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
      )}

      <ValidationText error={errors.root} />

      {disabled ? (
        <Button mode="contained" onPress={() => setDisabled(false)}>
          Edit
        </Button>
      ) : (
        <Button mode="contained" disabled={isSubmitting} onPress={submitDocument}>
          {isSubmitting ? <ButtonActivityIndicator /> : isNew ? "Create" : isVerify ? "Verify" : "Update"}
        </Button>
      )}

      {isNew || !disabled ? (
        <Button mode="contained-tonal" disabled={isSubmitting} onPress={discardDocument}>
          Discard
        </Button>
      ) : (
        <Button mode="contained-tonal" disabled={isSubmitting} onPress={deleteDocument}>
          Delete
        </Button>
      )}
    </FormView>
  );
}

function useDocument({ id }: DocumentFormProps) {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, userId } = useDocuments();
  const scan = useAppSelector(state => state.scan);
  const isNew = id == null;
  const isVerify = scan.id === id;
  const document = isVerify ? scan : data.find(item => item.id === id);

  const [disabled, setDisabled] = useState(!(isVerify || isNew));
  const [uploadDate, setUploadDate] = useState<Date | undefined>();

  const [createRequest] = useCreateMutation();
  const [uploadFileRequest] = useUpload1Mutation();
  const [updateRequest] = useUpdateMutation();
  const [deleteRequest] = useDeleteApiV1UsersByUserIdDocumentsAndDocumentIdMutation();

  const {
    control,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
    reset,
    handleSubmit,
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

  const submitDocument = handleSubmit(async values => {
    const { issueDate, expiryDate } = values;
    try {
      if (isNew) {
        const { uri } = scan;
        const { id: documentId } = await createRequest({
          userId,
          createDocumentRequest: {
            ...values,
            issueDate: toUtcDate(issueDate)?.toJSON(),
            expiryDate: toUtcDate(expiryDate)?.toJSON(),
          },
        }).unwrap();

        if (isNew && uri != null) {
          if (documentId) {
            const body = await toFormData(uri);
            await uploadFileRequest({ userId, documentId, body }).unwrap();
          } else {
            throw new Error("Document ID was not returned");
          }
        }
      } else {
        await updateRequest({
          documentId: id,
          userId,
          updateDocumentRequest: {
            ...values,
            issueDate: toUtcDate(issueDate)?.toJSON(),
            expiryDate: toUtcDate(expiryDate)?.toJSON(),
            verified: true,
          },
        });
      }

      if (document === scan) {
        dispatch(resetScan());
      }

      Toast.show({
        type: "success",
        text1: isNew ? "Document created" : isVerify ? "Document verified" : "Document updated",
      });

      if (isNew || isVerify) {
        router.push("/documents/");
      } else {
        setDisabled(true);
        reset(values);
      }
    } catch (submitError) {
      Toast.show({
        type: "error",
        text1: "Submit error",
        text2: toErrorMessage(submitError),
      });
    }
  });

  const discardDocument = useCallback(() => {
    if (isNew) {
      dispatch(resetScan());
      Toast.show({
        type: "info",
        text1: "New document discarded",
      });
      router.replace("/documents/");
    } else {
      reset();
      setDisabled(true);
    }
  }, [dispatch, isNew, reset]);

  const deleteDocument = useCallback(async () => {
    if (isNew || userId == null) {
      return;
    }

    const result = await AsyncAlert.confirm("Confirm deletion", `Are you sure you want to delete the document?`);
    if (!result) {
      return;
    }

    try {
      await deleteRequest({ documentId: id, userId }).unwrap();
      router.replace("/documents/");
      Toast.show({ type: "info", text1: "Document deleted" });
    } catch (deleteError) {
      Toast.show({ type: "error", text1: "Delete error", text2: toErrorMessage(deleteError) });
    }
  }, [deleteRequest, id, isNew, userId]);

  return {
    uploadDate,
    control,
    disabled,
    errors,
    isNew,
    isLoading,
    isSubmitting,
    isVerify,
    deleteDocument,
    discardDocument,
    setDisabled,
    setFocus,
    submitDocument,
  };
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
  } else if (isInvalidDate(issueDate)) {
    errors.issueDate = { type: "invalid", message: "Issue date is invalid" };
  }

  if (expiryDate == null) {
    errors.expiryDate = { type: "required", message: "Expiration date is required" };
  } else if (isInvalidDate(expiryDate)) {
    errors.expiryDate = { type: "invalid", message: "Expiration date is invalid" };
  }

  return { errors, values };
}
