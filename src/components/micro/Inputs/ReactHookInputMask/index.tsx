import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputMask, { Props as ReactInputMaskProps } from "react-input-mask";

import InputFieldWrapper from "../InputFieldWrapper";

import { Container } from "./styles";

export type ReactHookInputMaskProps = Omit<ReactInputMaskProps, "mask"> & {
    label: string;
    name: string;
    format: string | [string, string];
    unitOfMeasure?: string;
    mask?: string;
    isFormated?: boolean;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const ReactHookInputMask: React.FC<ReactHookInputMaskProps> = ({
    label,
    format,
    name,
    unitOfMeasure,
    isFormated = true,
    containerClassName,
    isHorizontal,
    thinBorder,
    mask = " ",
    ...props
}) => {
    const {
        register,
        setValue,
        formState: { errors, touchedFields, isSubmitSuccessful },
    } = useFormContext();
    const { onChange, ref, ...fieldProps } = register(name);

    const [dynamicFormatMask, setDynamicFormatMask] = React.useState<string>(format?.[0] || "");
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputFieldWrapper isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder} unitOfMeasure={unitOfMeasure}>
                <InputMask
                    id={name}
                    maskChar={mask}
                    mask={!Array.isArray(format) ? format : dynamicFormatMask}
                    onChange={(event): void => {
                        if (!Array.isArray(format) && event.target.value === format.replace(/a/g, mask).replace(/9/g, mask).replace(/\*/g, mask)) {
                            return;
                        }
                        const value = event.target.value.trimRight();
                        Array.isArray(format) && value.length === format[0].length ? setDynamicFormatMask(format[1]) : setDynamicFormatMask(format[0]);
                        if (value) {
                            !isSubmitSuccessful ? setValue(name, value, { shouldTouch: false, shouldValidate: true }) : onChange({ target: { value: value } });
                        }
                    }}
                    {...fieldProps}
                    {...props}
                >
                    {(inputProps) => <input className="form-control" ref={ref} {...inputProps} />}
                </InputMask>
                <span className="form-error">{errors[name]?.message}</span>
            </InputFieldWrapper>
        </Container>
    );
};

export default ReactHookInputMask;
