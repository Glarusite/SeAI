import { Image } from "expo-image";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { router, useFocusEffect } from "expo-router";
import { noop } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { Platform, StyleSheet, TouchableHighlight, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

import { useDocumentImageUri } from "./use-document-image";
import { useDocumentsDownload } from "./use-documents-download";
import { useDocumentsShare } from "./use-documents-share";

import { AsyncAlert } from "@src/common/async-alert";
import { toLocalDate, toUtcDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { toFormData } from "@src/common/form-data";
import { useAppDimensions } from "@src/common/hooks";
import { isBlank, isInvalidDate } from "@src/common/validators";
import type { DocumentFormData } from "@src/models";
import {
  useAppDispatch,
  useAppSelector,
  useCreateMutation,
  useDeleteApiV1UsersByUserIdDocumentsAndDocumentIdMutation,
  useFindQuery,
  useUpdateMutation,
  useUpload1Mutation,
} from "@src/store";
import { resetScan } from "@src/store/slices/scan";

export interface DocumentFormProps {
  id?: string;
  wide: boolean;
}

export default function DocumentForm(props: DocumentFormProps) {
  const {
    control,
    disabled,
    errors,
    expiryDateIsFocused,
    expiryDateValue,
    isDirty,
    isLoading,
    isNew,
    isSubmitting,
    issueDateValue,
    isVerify,
    uploadDateValue,
    uri,
    deleteDocument,
    discardDocument,
    expiryDateFocused,
    expiryDateBlurred,
    setDisabled,
    setFocus,
    submitDocument,
    uploadImage,
  } = useDocument(props);
  const styles = useStyles(props.wide);
  const { isSharing, shareSelection } = useDocumentsShare(props.id ? new Set([props.id]) : undefined);
  const { isDownloading, downloadSelection } = useDocumentsDownload(props.id ? new Set([props.id]) : undefined);

  const setNumberFocus = useCallback(() => setFocus("number"), [setFocus]);
  const setIssueDateFocus = useCallback(() => setFocus("issueDate"), [setFocus]);
  const setExpiryDateFocus = useCallback(() => setFocus("expiryDate"), [setFocus]);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <View style={styles.container}>
      {(isSharing || isDownloading) && (
        <View style={styles.overlay}>
          <ActivityIndicator size={100} />
        </View>
      )}

      {uri ? (
        disabled ? (
          <View style={styles.imageContainer}>
            <Image source={uri} style={styles.image} contentFit="contain" />
          </View>
        ) : (
          <TouchableHighlight style={styles.imageContainer} onPress={uploadImage}>
            <>
              <Image source={uri} style={styles.image} contentFit="contain" />
            </>
          </TouchableHighlight>
        )
      ) : (
        <TouchableHighlight style={[styles.imageContainer, styles.newImageContainer]} onPress={uploadImage}>
          <Text style={styles.addImageText}>Add image</Text>
        </TouchableHighlight>
      )}

      <View style={styles.formContainer}>
        <FormView>
          <ControlledTextInput
            multiline
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

          {disabled && expiryDateValue == null ? (
            <TextInput disabled value="Unlimited" mode="outlined" label="Expiration date" />
          ) : (
            <ControlledDateInput
              control={control}
              name="expiryDate"
              label={expiryDateIsFocused || expiryDateValue != null ? "Expiration date" : "Expiration date (Unlimited)"}
              saveLabel="Save (leave blank for Unlimited)"
              withDateFormatInLabel={expiryDateIsFocused || expiryDateValue != null}
              onFocus={expiryDateFocused}
              onBlur={expiryDateBlurred}
              inputMode="end"
              locale="en-GB"
              validRange={{ startDate: issueDateValue }}
              onSubmitEditing={submitDocument}
            />
          )}

          {!isNew && (
            <DatePickerInput
              label="Upload date"
              inputMode="start"
              locale="en-GB"
              mode="outlined"
              value={uploadDateValue}
              iconStyle={styles.uploadDateIcon}
              onChange={noop}
              disabled
            />
          )}

          {!disabled && <ValidationText error={errors.root} />}

          <View style={styles.buttonContainer}>
            {disabled ? (
              <Button mode="contained" icon="file-edit" onPress={() => setDisabled(false)}>
                Edit
              </Button>
            ) : (
              <Button
                mode="contained"
                icon="content-save"
                disabled={!(isVerify || isDirty) || isSubmitting}
                onPress={submitDocument}
              >
                {isSubmitting ? <ButtonActivityIndicator /> : isNew ? "Create" : isVerify ? "Verify" : "Update"}
              </Button>
            )}

            {isNew || !disabled ? (
              <Button mode="contained-tonal" icon="file-undo" disabled={isSubmitting} onPress={discardDocument}>
                Discard
              </Button>
            ) : (
              <Button
                mode="contained-tonal"
                icon="delete"
                style={styles.deleteButton}
                textColor={styles.deleteButton.color}
                disabled={isSubmitting}
                onPress={deleteDocument}
              >
                Delete
              </Button>
            )}

            {!isNew &&
              disabled &&
              (Platform.OS === "web" ? (
                <Button mode="contained-tonal" icon="download" onPress={downloadSelection}>
                  Download
                </Button>
              ) : (
                <Button mode="contained-tonal" icon="share" onPress={shareSelection}>
                  Share
                </Button>
              ))}
          </View>
        </FormView>
      </View>
    </View>
  );
}

function useStyles(wide: boolean) {
  const { dark, colors } = useTheme();
  const { height } = useAppDimensions();

  return useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0.5,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        },

        container: {
          flexDirection: wide ? "row" : undefined,
          gap: 10,
          marginRight: 10,
        },

        imageContainer: {
          width: wide ? "50%" : undefined,
          justifyContent: "center",
          height: wide ? height - 96 : height / 3,
        },

        newImageContainer: {
          borderStyle: "dashed",
          borderRadius: 10,
          borderWidth: 5,
          borderColor: colors.inverseSurface,
        },

        addImageText: {
          alignSelf: "center",
          justifyContent: "center",
          paddingTop: 32,
        },

        image: {
          height: "100%",
        },

        formContainer: {
          flex: 1,
          width: wide ? "50%" : undefined,
          justifyContent: "center",
          alignContent: "center",
        },

        uploadDateIcon: {
          display: "none",
        },

        buttonContainer: {
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 16,
          width: "100%",
          justifyContent: "space-evenly",
        },

        deleteButton: {
          backgroundColor: dark ? colors.errorContainer : colors.error,
          color: dark ? colors.onErrorContainer : colors.onError,
        },
      }),
    [colors, dark, height, wide],
  );
}

function useDocument({ id }: DocumentFormProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data: document, isLoading, error } = useFindQuery({ documentId: id || "", userId }, { skip: !id });
  const scan = useAppSelector(state => state.scan);
  const isNew = id == null;
  const isVerify = !isNew && scan.id === id;
  const [uri, setUri] = useState(isVerify ? scan.uri : undefined);
  const imageUri = useDocumentImageUri(id);

  const [disabled, setDisabled] = useState(!(isVerify || isNew));
  const [expiryDateIsFocused, setExpiryDateIsFocused] = useState(false);
  const [uploadDateValue, setUploadDateValue] = useState<Date>();

  const [createRequest] = useCreateMutation();
  const [uploadFileRequest] = useUpload1Mutation();
  const [updateRequest] = useUpdateMutation();
  const [deleteRequest] = useDeleteApiV1UsersByUserIdDocumentsAndDocumentIdMutation();

  const {
    control,
    formState: { errors, isDirty, isSubmitting },
    setError,
    setFocus,
    reset,
    handleSubmit,
  } = useForm<DocumentFormData>({
    disabled,
    resolver,
  });

  const issueDateValue = useWatch({ control, name: "issueDate" });
  const expiryDateValue = useWatch({ control, name: "expiryDate" });

  const resetFailedScan = useCallback(() => {
    if (scan.id == null && scan.uri != null) {
      dispatch(resetScan());
    }
  }, [dispatch, scan]);
  useFocusEffect(() => resetFailedScan);

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
      setUploadDateValue(toLocalDate(createdDate));
    }
  }, [document, reset]);

  const submitDocument = handleSubmit(async values => {
    const { issueDate, expiryDate } = values;
    try {
      if (isNew) {
        const { id: documentId } = await createRequest({
          userId,
          createDocumentRequest: {
            ...values,
            issueDate: toUtcDate(issueDate)?.toJSON(),
            expiryDate: toUtcDate(expiryDate)?.toJSON(),
          },
        }).unwrap();

        if (uri != null) {
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

      if (isVerify) {
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

  const discardDocument = useCallback(async () => {
    if (isNew) {
      dispatch(resetScan());
      Toast.show({
        type: "info",
        text1: "New document discarded",
      });
      router.replace("/documents/");
    } else if (isVerify) {
      try {
        await deleteRequest({ documentId: id, userId }).unwrap();
        Toast.show({
          type: "info",
          text1: "Scanned document discarded",
        });
      } catch (deleteError) {
        Toast.show({
          type: "error",
          text1: "Discard error",
          text2: toErrorMessage(deleteError),
        });
      } finally {
        dispatch(resetScan());
        router.replace("/documents/");
      }
    } else {
      reset();
      setDisabled(true);
    }
  }, [deleteRequest, dispatch, id, isNew, isVerify, reset, userId]);

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

  const uploadImage = useCallback(async () => {
    const { assets, canceled } = await launchImageLibraryAsync({ mediaTypes: MediaTypeOptions.Images });

    if (!canceled) {
      const {
        0: { uri: newUri },
      } = assets;
      setUri(newUri);

      if (!isNew) {
        const body = await toFormData(newUri);
        await uploadFileRequest({ userId, documentId: id, body }).unwrap();

        Toast.show({
          type: "success",
          text1: "Image uploaded",
        });

        setDisabled(true);
      }
    }
  }, [id, isNew, uploadFileRequest, userId]);

  const expiryDateFocused = useCallback(() => setExpiryDateIsFocused(true), []);
  const expiryDateBlurred = useCallback(() => setExpiryDateIsFocused(false), []);

  return {
    control,
    disabled,
    errors,
    expiryDateIsFocused,
    expiryDateValue,
    isDirty,
    isLoading,
    isNew,
    isSubmitting,
    issueDateValue,
    isVerify,
    uploadDateValue,
    uri: uri || imageUri,
    deleteDocument,
    discardDocument,
    expiryDateFocused,
    expiryDateBlurred,
    setDisabled,
    setFocus,
    submitDocument,
    uploadImage,
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

  if (expiryDate && isInvalidDate(expiryDate)) {
    errors.expiryDate = { type: "invalid", message: "Expiration date is invalid" };
  }

  return { errors, values };
}
