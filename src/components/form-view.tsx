import React, { ReactElement } from "react";
import {
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  Resolver,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export interface FormViewProps<TData extends FieldValues, TContext = unknown> {
  children(errors: FieldErrors<TData>): Record<Path<TData>, ReactElement> & { submit: ReactElement };
  context?: TContext;
  resolver: Resolver<TData, TContext>;
  submitFactory(formHooks: SubmitFormHooks<TData, TContext>): SubmitHandler<TData>;
}

export default function FormView<TData extends FieldValues, TContext = unknown>({
  children,
  context,
  resolver,
  submitFactory,
}: FormViewProps<TData, TContext>) {
  const {
    control,
    clearErrors,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
    resetField,
    setError,
  } = useForm<TData, TContext>({
    context,
    resolver,
  });

  const onSubmit = handleSubmit(submitFactory({ clearErrors, reset, resetField, setError }));

  const { submit, ...inputs } = children(errors);
  const formInputs = Object.entries(inputs) as [Path<TData>, ReactElement][];

  return (
    <>
      <KeyboardAvoidingView>
        <RootComponent onSubmit={onSubmit}>
          {formInputs.map(([key, { type, props }]) => (
            <React.Fragment key={key}>
              <Controller
                control={control}
                defaultValue={getDefaultValue(type)}
                name={key}
                render={({ field }) => React.createElement(type, { ...props, ...field })}
              />
              {errors[key] && <HelperText type="error">{errors[key]?.message as string}</HelperText>}
            </React.Fragment>
          ))}
          {errors.root && <HelperText type="error">{errors.root?.message}</HelperText>}
        </RootComponent>
      </KeyboardAvoidingView>

      {React.createElement(submit.type, { ...submit.props, disabled: isSubmitting, onPress: onSubmit })}
    </>
  );
}

const RootComponent = Platform.OS === "web" ? "form" : React.Fragment;

function getDefaultValue<TData>(type: ReactElement["type"]) {
  if (type === TextInput) {
    return "" as PathValue<TData, Path<TData>>;
  }
}

type SubmitFormHooks<TData extends FieldValues, TContext> = Pick<
  UseFormReturn<TData, TContext>,
  "clearErrors" | "reset" | "resetField" | "setError"
>;
