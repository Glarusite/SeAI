import { router } from "expo-router";
import { Base64 } from "js-base64";
import { AsYouType, validatePhoneNumberLength } from "libphonenumber-js";
import { useCallback, useEffect, useMemo } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, TextInput, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledDropDown from "../ui/form/controlled-drop-down";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

import { AsyncAlert } from "@src/common/async-alert";
import { toLocalDate, toLocaleDateString, toUtcDate } from "@src/common/date";
import { downloadFile } from "@src/common/download";
import { toErrorMessage } from "@src/common/error";
import { isBlank, isInvalidDate } from "@src/common/validators";
import { rankList, vesselTypeList, rankLabels, statusLabels, statusList, vesselTypeLabels } from "@src/models";
import type { ProfileFormData } from "@src/models";
import {
  resetAppValue,
  setUser,
  useAppDispatch,
  useAppSelector,
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@src/store";

export interface ProfileFormProps {
  wide: boolean;
}

export default function ProfileForm(props: ProfileFormProps) {
  const {
    control,
    errors,
    isDirty,
    isLoading,
    isSubmitting,
    deleteProfile,
    formatPhone,
    profileReport,
    updateProfile,
    setFocus,
  } = useProfile();
  const email = useAppSelector(state => state.user.email);
  const styles = useStyles(props);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <FormView>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <ControlledDateInput
            control={control}
            name="readinessDate"
            label="Readiness date"
            inputMode="start"
            locale="en-GB"
          />

          <ControlledDropDown control={control} name="status" label="Status" list={statusList} />

          <TextInput label="E-mail" mode="outlined" value={email} disabled />

          <ControlledTextInput
            control={control}
            name="firstName"
            label="First name"
            textContentType="givenName"
            onSubmitEditing={() => setFocus("lastName")}
          />

          <ControlledTextInput control={control} name="lastName" label="Last name" textContentType="familyName" />

          <ControlledDateInput
            control={control}
            name="dateOfBirth"
            label="Date of birth"
            inputMode="start"
            locale="en-GB"
          />

          <ControlledTextInput
            control={control}
            name="phone"
            label="Phone"
            keyboardType="phone-pad"
            onChangeText={formatPhone}
          />
        </View>

        <View style={styles.inputContainer}>
          <ControlledDropDown control={control} name="rank" label="Rank" list={rankList} />

          <ControlledTextInput
            control={control}
            name="contractDuration"
            label="Contract duration"
            keyboardType="numeric"
          />

          <ControlledDropDown control={control} name="vesselType" label="Vessel type" list={vesselTypeList} />

          <ControlledTextInput control={control} name="manningAgents" label="Manning agents" />

          <ControlledTextInput control={control} name="presentEmployer" label="Present employer" />

          <ControlledTextInput control={control} name="homeAirport" label="Home airport" />

          <ValidationText error={errors.root} />
        </View>
      </View>

      <Button icon="account-edit" mode="contained" onPress={updateProfile} disabled={!isDirty || isSubmitting}>
        {isSubmitting ? <ButtonActivityIndicator /> : "Update"}
      </Button>

      <Button icon="file-account" mode="contained-tonal" onPress={profileReport}>
        Download Personal Data Report
      </Button>

      <Button
        mode="contained-tonal"
        icon="delete"
        style={styles.deleteButton}
        textColor={styles.deleteButton.color}
        disabled={isSubmitting}
        onPress={deleteProfile}
      >
        Delete
      </Button>
    </FormView>
  );
}

function useStyles({ wide }: ProfileFormProps) {
  const { dark, colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        formContainer: {
          flexDirection: wide ? "row" : undefined,
          marginRight: 16,
          gap: 16,
        },

        inputContainer: {
          width: wide ? "50%" : undefined,
          gap: 16,
        },

        deleteButton: {
          backgroundColor: dark ? colors.errorContainer : colors.error,
          color: dark ? colors.onErrorContainer : colors.onError,
        },
      }),
    [colors, dark, wide],
  );
}

function useProfile() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.userId) || "";
  const {
    data,
    isLoading,
    error: queryError,
  } = useGetUserQuery(userId, {
    skip: !userId,
  });

  const {
    control,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
    setError,
    setFocus,
    reset,
  } = useForm<ProfileFormData>({ resolver });

  const [updateRequest] = useUpdateUserMutation();
  const updateProfile = handleSubmit(async values => {
    setError("root", {});
    try {
      await updateRequest({
        userId,
        userUpdateRequest: {
          ...values,
          rank: values.rank || undefined,
          status: values.status || undefined,
          vesselType: values.vesselType || undefined,
          contractDuration: Number(values.contractDuration),
          dateOfBirth: toUtcDate(values.dateOfBirth)?.toJSON(),
          readinessDate: toUtcDate(values.readinessDate)?.toJSON(),
        },
      }).unwrap();
      Toast.show({
        type: "success",
        text1: "Profile updated",
      });
      reset(values);
    } catch (error) {
      const message = toErrorMessage(error);
      setError("root", { message });
    }
  });

  const profileReport = useCallback(() => {
    void downloadFile(
      `seai-personal-data`,
      "text/plain",
      Base64.encode(
        [
          `First name: ${data?.firstName}`,
          `Last name: ${data?.lastName}`,
          `Date of birth: ${toLocaleDateString(data?.dateOfBirth) || "N/A"}`,
          `Phone: ${data?.phone || "N/A"}`,
          `Rank: ${data?.rank ? rankLabels[data.rank] : "N/A"}`,
          `Contract duration: ${data?.contractDuration || "N/A"}`,
          `Vessel type: ${data?.vesselType ? vesselTypeLabels[data.vesselType] : "N/A"}`,
          `Manning agents: ${data?.manningAgents || "N/A"}`,
          `Present employer: ${data?.presentEmployer || "N/A"}`,
          `Home airport: ${data?.homeAirport || "N/A"}`,
          `Readiness date: ${toLocaleDateString(data?.readinessDate) || "N/A"}`,
          `Status: ${data?.status ? statusLabels[data.status] : "N/A"}`,
        ].join("\n"),
      ),
    );
  }, [data]);

  const [deleteRequest] = useDeleteUserMutation();
  const deleteProfile = useCallback(async () => {
    const result = await AsyncAlert.confirm(
      "Confirm deletion",
      [
        `All uploaded personal files and data will be permanently removed!`,
        `Are you sure you want to delete your user profile?`,
      ].join("\n"),
    );

    if (!result) {
      return;
    }

    try {
      await deleteRequest(userId).unwrap();
      dispatch(setUser({}));
      dispatch(resetAppValue("nextLoginReminderTimestamp"));
      router.replace("/");
      Toast.show({ type: "info", text1: "Profile deleted" });
    } catch (deleteError) {
      Toast.show({ type: "error", text1: "Delete error", text2: toErrorMessage(deleteError) });
    }
  }, [deleteRequest, dispatch, userId]);

  const formatPhone = useCallback((value: string) => new AsYouType().input(value.replace(/^0(?:0|11)/, "+")), []);

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        contractDuration: data.contractDuration?.toString(),
        dateOfBirth: toLocalDate(data.dateOfBirth),
        readinessDate: toLocalDate(data.readinessDate),
      });
    }
  }, [data, reset]);

  useEffect(() => {
    if (queryError) {
      const message = toErrorMessage(queryError);
      Toast.show({
        type: "error",
        text1: "Profile load error",
        text2: message,
      });
    }
  }, [queryError, setError]);

  return {
    control,
    errors,
    isDirty,
    isLoading,
    isSubmitting,
    deleteProfile,
    formatPhone,
    profileReport,
    updateProfile,
    setFocus,
  };
}

function resolver(values: ProfileFormData) {
  const { firstName, lastName, dateOfBirth, contractDuration, phone } = values;
  const errors: FieldErrors<ProfileFormData> = {};

  if (isBlank(firstName)) {
    errors.firstName = { type: "required", message: "First name is required" };
  }

  if (isBlank(lastName)) {
    errors.lastName = { type: "required", message: "Last name is required" };
  }

  if (dateOfBirth && isInvalidDate(dateOfBirth)) {
    errors.dateOfBirth = { type: "invalid", message: "Date of birth is invalid" };
  }

  if (contractDuration != null && Number.isNaN(contractDuration)) {
    errors.contractDuration = { type: "invalid", message: "Contract duration is invalid" };
  }

  if (!isBlank(phone)) {
    const phoneValidationResult = validatePhoneNumberLength(phone);
    switch (phoneValidationResult) {
      case "TOO_SHORT": {
        errors.phone = { type: "invalid", message: "Phone number is too short" };
        break;
      }
      case "TOO_LONG": {
        errors.phone = { type: "invalid", message: "Phone number is too long" };
        break;
      }
      case "NOT_A_NUMBER": {
        errors.phone = { type: "invalid", message: "Phone number must start with '+' followed by digits" };
        break;
      }
      case "INVALID_COUNTRY": {
        errors.phone = {
          type: "invalid",
          message: "Phone number must start with '+' followed by a valid country code",
        };
        break;
      }
      case "INVALID_LENGTH": {
        errors.phone = { type: "invalid", message: "Phone number is invalid" };
        break;
      }
    }
  }

  return { errors, values };
}
