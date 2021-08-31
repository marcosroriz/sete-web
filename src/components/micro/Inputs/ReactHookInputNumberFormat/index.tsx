import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import NumberFormat, { NumberFormatValues, NumberFormatProps } from "react-number-format";

import { Container, InputField } from "./styles";

export type ReactHookInputNumberFormatProps = React.InputHTMLAttributes<HTMLInputElement> &
    Omit<NumberFormatProps, "format"> & {
        label: string;
        name: string;
        format: string | [string, string];
        isFormated?: boolean;
        isHorizontal?: boolean | string;
        thinBorder?: boolean;
        containerClassName?: string;
    };

const ReactHookInputNumberFormat: React.FC<ReactHookInputNumberFormatProps> = ({
    label,
    format,
    name,
    isFormated = true,
    containerClassName,
    isHorizontal,
    thinBorder,
    ...props
}) => {
    const {
        setValue,
        formState: { errors, touchedFields },
    } = useFormContext();

    const [dynamicFormatMask, setDynamicFormatMask] = React.useState<string>(format?.[0] || "");

    React.useEffect(() => setValue(name, ""), []);
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder}>
                <Controller
                    name={name}
                    render={({ field: { onChange, ...fieldProps } }) => (
                        <NumberFormat
                            {...fieldProps}
                            {...(props as any)}
                            className="form-control"
                            id={name}
                            aria-invalid={!!errors[name]}
                            onValueChange={(values: NumberFormatValues): void => {
                                Array.isArray(format) && values.formattedValue.trimRight().length === format[0].length
                                    ? setDynamicFormatMask(format[1])
                                    : setDynamicFormatMask(format[0]);
                                if (isFormated) {
                                    onChange({ target: { value: values.formattedValue.trimRight() } });
                                } else {
                                    onChange({ target: { value: values.value } });
                                }
                            }}
                            format={!Array.isArray(format) ? format : dynamicFormatMask}
                        />
                    )}
                />

                <span className="form-error">{errors[name]?.message}</span>
            </InputField>
        </Container>
    );
};

export default ReactHookInputNumberFormat;
