import React from "react";
import { useField } from "formik";
import { Container, InputField } from "./styles";

export type FormikInputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    labelOnLeft?: boolean;
    containerClassName?: string;
};

const FormikInputText: React.FC<FormikInputTextProps> = ({ label, containerClassName, labelOnLeft, ...props }) => {
    const [field, meta] = useField(props.name);
    return (
        <Container className={containerClassName} labelOnLeft={labelOnLeft}>
            <label htmlFor={props.name}>{label}</label>
            <InputField isTouched={meta.touched} isInvalid={meta.touched && !!meta.error}>
                <input id={props.name} className="form-control" aria-invalid={meta.touched && !!meta.error} {...field} {...props} />
                <span>{meta.touched && meta.error}</span>
            </InputField>
        </Container>
    );
};

export default FormikInputText;
