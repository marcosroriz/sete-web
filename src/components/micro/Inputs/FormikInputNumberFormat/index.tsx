import React from "react";
import { useField, useFormikContext } from "formik";
import NumberFormat, { NumberFormatValues, NumberFormatProps } from "react-number-format";

import { Container, InputField } from "./styles";

export type FormikInputNumberFormatProps = React.InputHTMLAttributes<HTMLInputElement> &
    NumberFormatProps & {
        label: string;
        name: string;
        format?: string;
        isFormated?: boolean;
        isHorizontal?: boolean | string;
        thinBorder?: boolean;
        containerClassName?: string;
    };

const FormikInputNumberFormat: React.FC<FormikInputNumberFormatProps> = ({
    label,
    format,
    isFormated = true,
    containerClassName,
    isHorizontal,
    thinBorder,
    ...props
}) => {
    const [phoneFormat, setPhoneFormat] = React.useState("(##) ####-#####");
    const [{ onChange: removed, ...field }, meta] = useField(props.name);
    const { setFieldValue } = useFormikContext();
    const handleInputChange = React.useCallback(
        (values: NumberFormatValues): void => {
            !format && values.value.length === 11 ? setPhoneFormat("(##) #####-####") : setPhoneFormat("(##) ####-#####");
            if (isFormated) {
                setFieldValue(props.name, values.formattedValue.trimRight());
            } else {
                setFieldValue(props.name, values.value);
            }
        },
        [setFieldValue, setPhoneFormat],
    );
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={props.name}>{label}</label>
            <InputField isTouched={meta.touched} isInvalid={meta.touched && !!meta.error} thinBorder={thinBorder}>
                <NumberFormat
                    {...field}
                    {...props}
                    className="form-control"
                    id={props.name}
                    onValueChange={handleInputChange}
                    format={format ? format : phoneFormat}
                />
                <span>{meta.touched && meta.error}</span>
            </InputField>
        </Container>
    );
};

export default FormikInputNumberFormat;
