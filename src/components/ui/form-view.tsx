import React, { ReactElement } from "react";
import type * as ReactForm from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export interface FormViewProps<TData extends ReactForm.FieldValues, TContext = unknown> {
  children(
    errors: ReactForm.FieldErrors<TData>,
  ): Record<ReactForm.Path<TData>, ReactElement> & { submit: ReactElement };
  context?: TContext;
  resolver: ReactForm.Resolver<TData, TContext>;
  submitFactory(formHooks: SubmitFormHooks<TData, TContext>): ReactForm.SubmitHandler<TData>;
}

export default function FormView<TData extends ReactForm.FieldValues, TContext = unknown>({
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
  const formInputs = Object.entries(inputs) as [ReactForm.Path<TData>, ReactElement][];

  return (
    <>
      <KeyboardAvoidingView>
        <RootComponent>
          {formInputs.map(([key, { type, props }]) => (
            <React.Fragment key={key}>
              <Controller
                control={control}
                defaultValue={getDefaultValue(type)}
                name={key}
                render={({ field }) =>
                  React.createElement(type, {
                    ...props,
                    ...field,
                    onSubmitEditing: onSubmit,
                  })
                }
              />
              {errors[key] && <HelperText type="error">{errors[key]?.message as string}</HelperText>}
            </React.Fragment>
          ))}
          {errors.root && <HelperText type="error">{errors.root?.message}</HelperText>}
        </RootComponent>
      </KeyboardAvoidingView>

      {React.createElement(submit.type, {
        ...submit.props,
        disabled: isSubmitting,
        onPress: onSubmit,
      })}
    </>
  );
}

const RootComponent = Platform.OS === "web" ? "form" : React.Fragment;

function getDefaultValue<TData>(type: ReactElement["type"]) {
  if (type === TextInput) {
    return "" as ReactForm.PathValue<TData, ReactForm.Path<TData>>;
  }
}

type SubmitFormHooks<TData extends ReactForm.FieldValues, TContext> = Pick<
  ReactForm.UseFormReturn<TData, TContext>,
  "clearErrors" | "reset" | "resetField" | "setError"
>;
