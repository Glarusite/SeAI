import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledDateInput from "../ui/form/controlled-date-input";
import ControlledDropDown from "../ui/form/controlled-drop-down";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

import { useVoyages } from "./use-voyages";

import { AsyncAlert } from "@src/common/async-alert";
import { toLocalDate, toUtcDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { isBlank, isInvalidDate } from "@src/common/validators";
import type { VoyageFormData } from "@src/models";
import { rankList, vesselTypeList } from "@src/models";
import { useAppSelector, useCreateVoyageMutation, useDeleteVoyageMutation, useUpdateVoyageMutation } from "@src/store";

export interface VoyageFormProps {
  id?: string;
}

export default function VoyageForm(props: VoyageFormProps) {
  const styles = useStyles();
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

      <ControlledDropDown control={control} name="vesselType" label="Vessel Type" options={vesselTypeList} />

      <ControlledTextInput control={control} name="flag" label="Vessel Flag" defaultValue={disabled ? "N/A" : ""} />

      <ControlledTextInput control={control} inputMode="numeric" maxLength={7} name="imoNumber" label="IMO Number" />

      <ControlledDropDown control={control} name="rank" label="Rank" options={rankList} />

      <ControlledTextInput control={control} name="joiningPort" label="Joining Port" />

      <ControlledDateInput control={control} name="joiningDate" label="Joining Date" inputMode="start" locale="en-GB" />

      <ControlledTextInput control={control} name="leavingPort" label="Leaving Port" />

      <ControlledDateInput control={control} name="leavingDate" label="Leaving Date" inputMode="end" locale="en-GB" />

      <ControlledTextInput control={control} name="remarks" label="Remarks" multiline />

      {!disabled && <ValidationText error={errors.root} />}

      <View style={styles.buttonContainer}>
        {!disabled && Platform.OS === "web" && (
          <Button mode="outlined" icon="plus" onPress={showFeatureInDevelopmentToast}>
            Add contract
          </Button>
        )}

        {disabled ? (
          <Button mode="contained" icon="file-edit" onPress={() => setDisabled(false)}>
            Edit
          </Button>
        ) : (
          <Button mode="contained" icon="content-save" disabled={!isDirty || isSubmitting} onPress={submitVoyage}>
            {isSubmitting ? <ButtonActivityIndicator /> : isNew ? "Create" : "Update"}
          </Button>
        )}

        {isNew || !disabled ? (
          <Button mode="contained-tonal" icon="file-undo" disabled={isSubmitting} onPress={discardVoyage}>
            Discard
          </Button>
        ) : (
          <Button
            mode="contained-tonal"
            icon="delete"
            style={styles.deleteButton}
            textColor={styles.deleteButton.color}
            disabled={isSubmitting}
            onPress={deleteVoyage}
          >
            Delete
          </Button>
        )}
      </View>
    </FormView>
  );
}

function useStyles() {
  const { dark, colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
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
    [colors, dark],
  );
}

function useVoyage({ id }: VoyageFormProps) {
  const { data, isLoading } = useVoyages();
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
        rank: values.rank || undefined,
        vesselType: values.vesselType || undefined,
        joiningDate: toUtcDate(values.joiningDate)?.toJSON(),
        leavingDate: toUtcDate(values.leavingDate)?.toJSON(),
      };
      await (
        isNew
          ? createRequest({ userId, createVoyageRequest: voyageRequest })
          : updateRequest({ userId, voyageId: id, updateVoyageRequest: voyageRequest })
      ).unwrap();

      Toast.show({
        type: "success",
        text1: isNew ? "Voyage created" : "Voyage updated",
      });

      if (isNew) {
        router.push("/voyages");
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
      router.replace("/voyages");
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
      router.push("/voyages");
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
