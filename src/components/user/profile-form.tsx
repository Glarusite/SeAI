import { toLocalDate, toUtcDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { isBlank, isInvalidDate } from "@src/common/validators";
import type { DropDownList, ProfileFormData } from "@src/models";
import { useAppSelector, useGetUserQuery, useUpdateUserMutation } from "@src/store";
import { useEffect, useMemo } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { DimensionValue } from "react-native";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledDropDown from "../ui/form/controlled-drop-down";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

export interface ProfileFormProps {
  wide: boolean;
}

export default function ProfileForm(props: ProfileFormProps) {
  const { control, errors, isDirty, isLoading, isSubmitting, update, setFocus } = useProfile();
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

      <Button icon="account-edit" mode="contained" onPress={update} disabled={!isDirty || isSubmitting}>
        {isSubmitting ? <ButtonActivityIndicator /> : "Update"}
      </Button>
    </FormView>
  );
}

function useStyles({ wide }: ProfileFormProps) {
  return useMemo(
    () =>
      StyleSheet.create({
        formContainer: {
          flexDirection: wide ? "row" : undefined,
          gap: 16,
        },

        inputContainer: {
          // TODO: figure out how to make calc work on iOS and Android
          width: wide ? ("calc(50% - 8px)" as DimensionValue) : undefined,
          gap: 16,
        },
      }),
    [wide],
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
      Toast.show({
        type: "error",
        text1: "Profile load error",
        text2: message,
      });
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

const statusList: DropDownList<ProfileFormData["status"]> = [
  { label: "Not selected", value: undefined },
  { label: "Home", value: "HOME" },
  { label: "On board", value: "ONBOARD" },
];

const rankList: DropDownList<ProfileFormData["rank"]> = [
  { label: "Not selected", value: undefined },
  { label: "Master/Captain (CPT)", value: "CAPTAIN" },
  { label: "Chief Officer (C/O)", value: "CAPTAIN" },
  { label: "First Officer", value: "CAPTAIN" },
  { label: "Second Officer (2/O)", value: "CAPTAIN" },
  { label: "Third Officer (3/O)", value: "CAPTAIN" },
  { label: "Deck Cadet (D/C)", value: "CAPTAIN" },
  { label: "Chief Engineer (C/E)", value: "CAPTAIN" },
  { label: "First Engineer (1/E)", value: "CAPTAIN" },
  { label: "Second Engineer (2/E)", value: "CAPTAIN" },
  { label: "Third Engineer (3/E)", value: "CAPTAIN" },
  { label: "Forth Engineer (4/E)", value: "CAPTAIN" },
  { label: "Electro-Technical Officer (ETO)", value: "CAPTAIN" },
  { label: "Boatswain (BSN)", value: "CAPTAIN" },
  { label: "Able Seaman (AB)", value: "CAPTAIN" },
  { label: "Ordinary Seaman (OS)", value: "CAPTAIN" },
  { label: "Chief Steward (C/STW)", value: "CAPTAIN" },
  { label: "Steward (STW)", value: "CAPTAIN" },
  { label: "Messman (MSN)", value: "CAPTAIN" },
  { label: "Fitter (FTR)", value: "CAPTAIN" },
  { label: "Pumpman (P/P)", value: "CAPTAIN" },
  { label: "Cook (C/K)", value: "CAPTAIN" },
  { label: "Motorman (M/M)", value: "CAPTAIN" },
  { label: "Oiler", value: "CAPTAIN" },
  { label: "Welder", value: "CAPTAIN" },
  { label: "Refrigeration Engineer", value: "CAPTAIN" },
  { label: "Trainee Officer", value: "CAPTAIN" },
  { label: "Radio Officer/Radio Operator", value: "CAPTAIN" },
];

const vesselTypeList: DropDownList<ProfileFormData["vesselType"]> = [
  { label: "Not selected", value: undefined },
  { label: "Container", value: "OIL_TANKER" },
  { label: "Crude Oil", value: "OIL_TANKER" },
  { label: "Product Oil", value: "OIL_TANKER" },
  { label: "LPG (Liquefied Petroleum Gas)", value: "OIL_TANKER" },
  { label: "LNG (Liquefied Natural Gas)", value: "OIL_TANKER" },
  { label: "Reefer", value: "OIL_TANKER" },
  { label: "Ro-Ro (Roll-On/Roll-Off)", value: "OIL_TANKER" },
  { label: "General Cargo", value: "OIL_TANKER" },
  { label: "Cruise", value: "OIL_TANKER" },
  { label: "Ferry", value: "OIL_TANKER" },
  { label: "Ocean Liner", value: "OIL_TANKER" },
  { label: "Catamaran", value: "OIL_TANKER" },
  { label: "Motor Yacht", value: "OIL_TANKER" },
  { label: "Sailing Yacht", value: "OIL_TANKER" },
  { label: "Mega Yacht", value: "OIL_TANKER" },
  { label: "Explorer Yacht", value: "OIL_TANKER" },
  { label: "Sport Fishing Yacht", value: "OIL_TANKER" },
];
