import React from "react";
import { useFormContext } from "react-hook-form";
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
        register,
        setValue,
        formState: { errors, touchedFields },
    } = useFormContext();
    const { onChange: removed, ...registerField } = register(name);

    const [dynamicFormatMask, setDynamicFormatMask] = React.useState<string>(format?.[0] || "");
    const handleInputChange = React.useCallback(
        (values: NumberFormatValues): void => {
            Array.isArray(format) && values.formattedValue.trimRight().length === format[0].length
                ? setDynamicFormatMask(format[1])
                : setDynamicFormatMask(format[0]);
            if (isFormated) {
                setValue(name, values.formattedValue.trimRight(), { shouldValidate: true });
            } else {
                setValue(name, values.value, { shouldValidate: true });
            }
        },
        [setValue, setDynamicFormatMask],
    );
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder}>
                <NumberFormat
                    {...registerField}
                    {...(props as any)}
                    className="form-control"
                    id={name}
                    aria-invalid={!!errors[name]}
                    onValueChange={handleInputChange}
                    format={!Array.isArray(format) ? format : dynamicFormatMask}
                />
                <span className="form-error">{errors[name]?.message}</span>
            </InputField>
        </Container>
    );
};

export default ReactHookInputNumberFormat;
