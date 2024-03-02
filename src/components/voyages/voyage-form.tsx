import { AsyncAlert } from "@src/common/async-alert";
import { toLocalDate, toUtcDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { isBlank, isInvalidDate } from "@src/common/validators";
import type { DropDownList, ProfileFormData, VoyageFormData } from "@src/models";
import { useAppSelector, useCreateVoyageMutation, useDeleteVoyageMutation, useUpdateVoyageMutation } from "@src/store";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Button } from "react-native-paper";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledDropDown from "../ui/form/controlled-drop-down";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

import { useVoyages } from "./use-voyages";

export interface VoyageFormProps {
  id?: string;
}

export default function VoyageForm(props: VoyageFormProps) {
  const {
    control,
    disabled,
    errors,
    isDirty,
    isLoading,
    isNew,
    isSubmitting,
    deleteVoyage,
    discardVoyage,
    setDisabled,
    setFocus,
    submitVoyage,
  } = useVoyage(props);

  if (isLoading) {
    return <ActivityIndicator size={100} />;
  }

  return (
    <FormView>
      <ControlledTextInput
        control={control}
        name="vesselName"
        label="Vessel Name"
        onSubmitEditing={() => setFocus("rank")}
      />

      <ControlledDropDown control={control} name="rank" label="Rank" list={rankList} />

      <ControlledDropDown control={control} name="vesselType" label="Vessel Type" list={vesselTypeList} />

      <ControlledTextInput control={control} inputMode="numeric" maxLength={7} name="imoNumber" label="IMO Number" />

      <ControlledTextInput control={control} name="joiningPort" label="Joining Port" />

      <ControlledDateInput control={control} name="joiningDate" label="Joining Date" inputMode="start" locale="en-GB" />

      <ControlledTextInput control={control} name="leavingPort" label="Leaving Port" />

      <ControlledDateInput control={control} name="leavingDate" label="Leaving Date" inputMode="end" locale="en-GB" />

      <ControlledTextInput control={control} name="remarks" label="Remarks" multiline />

      {disabled ? (
        <Button mode="contained" onPress={() => setDisabled(false)}>
          Edit
        </Button>
      ) : (
        <>
          <ValidationText error={errors.root} />

          <Button mode="outlined" icon="plus" onPress={showFeatureInDevelopmentToast}>
            Add contract document
          </Button>

          <Button mode="contained" onPress={submitVoyage} disabled={!isDirty || isSubmitting}>
            {isSubmitting ? <ButtonActivityIndicator /> : isNew ? "Create" : "Update"}
          </Button>

          {!isNew || !disabled ? (
            <Button mode="contained-tonal" disabled={isSubmitting} onPress={discardVoyage}>
              Discard
            </Button>
          ) : (
            <Button mode="contained-tonal" disabled={isSubmitting} onPress={deleteVoyage}>
              Delete
            </Button>
          )}
        </>
      )}
    </FormView>
  );
}

function useVoyage({ id }: VoyageFormProps) {
  const { data, isLoading, error: loadError } = useVoyages();
  const userId = useAppSelector(state => state.user.userId) || "";
  const voyage = data.find(item => item.id === id);
  const isNew = id == null;
  const [disabled, setDisabled] = useState(!isNew);

  const [createRequest] = useCreateVoyageMutation();
  const [updateRequest] = useUpdateVoyageMutation();
  const [deleteRequest] = useDeleteVoyageMutation();

  const {
    control,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    setError,
    setFocus,
    reset,
  } = useForm<VoyageFormData>({
    disabled,
    resolver,
  });

  useEffect(() => {
    if (loadError) {
      const message = toErrorMessage(loadError);
      Toast.show({
        type: "error",
        text1: "Voyage load error",
        text2: message,
      });
    }
  }, [loadError, setError]);

  useEffect(() => {
    if (voyage) {
      const { joiningDate, leavingDate, ...values } = voyage;
      reset({
        ...values,
        joiningDate: toLocalDate(joiningDate),
        leavingDate: toLocalDate(leavingDate),
      });
    }
  }, [voyage, reset]);

  const submitVoyage = handleSubmit(async values => {
    setError("root", {});
    try {
      const voyageRequest = {
        ...values,
        joiningDate: toUtcDate(values.joiningDate)?.toJSON(),
        leavingDate: toUtcDate(values.leavingDate)?.toJSON(),
      };
      await (
        id === undefined
          ? createRequest({ userId, createVoyageRequest: voyageRequest })
          : updateRequest({ userId, voyageId: id, updateVoyageRequest: voyageRequest })
      ).unwrap();

      Toast.show({
        type: "success",
        text1: isNew ? "Voyage created" : "Voyage updated",
      });

      if (isNew) {
        router.push("/voyages/");
      } else {
        setDisabled(true);
        reset(values);
      }
    } catch (error) {
      const message = toErrorMessage(error);
      setError("root", { message });
    }
  });

  const discardVoyage = useCallback(() => {
    if (isNew) {
      router.replace("/voyages/");
    } else {
      reset();
      setDisabled(true);
    }
  }, [isNew, reset]);

  const deleteVoyage = useCallback(async () => {
    if (isNew) {
      return;
    }

    const result = await AsyncAlert.confirm("Confirm deletion", `Are you sure you want to delete the voyage?`);
    if (!result) {
      return;
    }

    try {
      await deleteRequest({ userId, voyageId: id });
      router.push("/(auth)/(seafarer)/voyages/");
      Toast.show({ text1: "Voyage deleted" });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Delete error",
        text2: toErrorMessage(error),
      });
    }
  }, [deleteRequest, id, isNew, userId]);

  return {
    control,
    disabled,
    errors,
    isDirty,
    isLoading,
    isNew,
    isSubmitting,
    deleteVoyage,
    discardVoyage,
    setDisabled,
    setFocus,
    submitVoyage,
  };
}

export function resolver(values: VoyageFormData) {
  const { vesselName, rank, imoNumber, joiningDate, leavingDate } = values;
  const errors: FieldErrors<VoyageFormData> = {};

  if (isBlank(vesselName)) {
    errors.vesselName = { type: "required", message: "Vessel name is required" };
  }

  if (isBlank(rank)) {
    errors.rank = { type: "required", message: "Rank is required" };
  }

  if (imoNumber && !/^\d{7}$/.test(imoNumber)) {
    errors.imoNumber = { type: "invalid", message: "IMO number must be 7 digits long" };
  }

  if (!joiningDate) {
    errors.joiningDate = { type: "required", message: "Joining date is required" };
  } else if (isInvalidDate(joiningDate)) {
    errors.joiningDate = { type: "invalid", message: "Joining date is invalid" };
  } else if (leavingDate) {
    if (isInvalidDate(leavingDate)) {
      errors.leavingDate = { type: "invalid", message: "Leaving date is invalid" };
    } else if (leavingDate < joiningDate) {
      errors.leavingDate = { type: "invalid", message: "Leaving date cannot be before joining date" };
    }
  }

  return { errors, values };
}

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
