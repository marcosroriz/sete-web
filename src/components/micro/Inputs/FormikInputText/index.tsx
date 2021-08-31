import React from "react";
import { useField } from "formik";
import { Container, InputField } from "./styles";

export type FormikInputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const FormikInputText: React.FC<FormikInputTextProps> = ({ label, name, containerClassName, isHorizontal, thinBorder, ...props }) => {
    const [field, meta] = useField(name);
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={meta.touched} isInvalid={meta.touched && !!meta.error} thinBorder={thinBorder}>
                <input id={name} className="form-control" aria-invalid={meta.touched && !!meta.error} {...field} {...props} />
                <span className="form-error">{meta.touched && meta.error}</span>
            </InputField>
        </Container>
    );
};

export default FormikInputText;
