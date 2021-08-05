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

const FormikInputText: React.FC<FormikInputTextProps> = ({ label, containerClassName, isHorizontal, thinBorder, ...props }) => {
    const [field, meta] = useField(props.name);
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={props.name}>{label}</label>
            <InputField isTouched={meta.touched} isInvalid={meta.touched && !!meta.error} thinBorder={thinBorder}>
                <input id={props.name} className="form-control" aria-invalid={meta.touched && !!meta.error} {...field} {...props} />
                <span>{meta.touched && meta.error}</span>
            </InputField>
        </Container>
    );
};

export default FormikInputText;
