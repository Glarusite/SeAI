import { toLocalDate, toUtcDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { isBlank, isInvalidDate } from "@src/common/validators";
import type { ProfileFormData } from "@src/models";
import { useAppSelector, useGetUserQuery, useUpdateUserMutation } from "@src/store";
import { useEffect } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

export default function ProfileForm() {
  const { control, errors, isDirty, isLoading, isSubmitting, update, setFocus } = useProfile();
  const email = useAppSelector(state => state.user.email);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <FormView>
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

      <ControlledTextInput control={control} name="rank" label="Rank" />

      <ControlledTextInput control={control} name="contractDuration" label="Contract duration" keyboardType="numeric" />

      <ControlledTextInput control={control} name="vesselType" label="Vessel type" />

      <ControlledTextInput control={control} name="manningAgents" label="Manning agents" />

      <ControlledTextInput control={control} name="presentEmployer" label="Present employer" />

      <ControlledDateInput
        control={control}
        name="readinessDate"
        label="Readiness date"
        inputMode="start"
        locale="en-GB"
      />

      <ControlledTextInput control={control} name="status" label="Status" />

      <ControlledTextInput control={control} name="homeAirport" label="Home airport" />

      <ValidationText error={errors.root} />

      <Button icon="account-edit" mode="contained" onPress={update} disabled={!isDirty || isSubmitting}>
        {isSubmitting ? <ButtonActivityIndicator /> : "Update"}
      </Button>
    </FormView>
  );
}

function useProfile() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const {
    data,
    isLoading,
    error: queryError,
  } = useGetUserQuery(userId, {
    skip: !userId,
  });

  const [updateProfile] = useUpdateUserMutation();

  const {
    control,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
    setError,
    setFocus,
    reset,
  } = useForm<ProfileFormData>({ resolver });

  const update = handleSubmit(async values => {
    setError("root", {});
    try {
      await updateProfile({
        userId,
        userUpdateRequest: {
          ...values,
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
      setError("root", { message });
    }
  }, [queryError, setError]);

  return { control, errors, isDirty, isLoading, isSubmitting, update, setFocus };
}

function resolver(values: ProfileFormData) {
  const { firstName, lastName, dateOfBirth, contractDuration } = values;
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

  return { errors, values };
}
