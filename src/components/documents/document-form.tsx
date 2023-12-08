import { toLocalDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import type { DocumentFormData } from "@src/models";
import { noop } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

import DocumentFormInputs, { resolver } from "./document-inputs";
import { useDocuments } from "./use-documents";

export interface DocumentFormProps {
  id: string;
}

export function DocumentForm(props: DocumentFormProps) {
  const { uploadDate, control, errors, isLoading, setFocus } = useDocument(props);

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
    </FormView>
  );
}

function useDocument({ id }: DocumentFormProps) {
  const { data, isLoading, error } = useDocuments();
  const document = data.find(item => item.id === id);
  const [disabled, setDisabled] = useState(true);
  const [uploadDate, setUploadDate] = useState<Date | undefined>();

  const {
    control,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
    setValue,
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
      setValue("name", name);
      setValue("number", number);
      setValue("issueDate", toLocalDate(issueDate));
      setValue("expiryDate", toLocalDate(expiryDate));
      setUploadDate(toLocalDate(createdDate));
    }
  }, [document, setValue]);

  return { uploadDate, control, disabled, errors, isLoading, isSubmitting, setDisabled, setFocus };
}
