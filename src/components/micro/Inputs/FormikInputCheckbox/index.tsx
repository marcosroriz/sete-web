import React from "react";
import { Field, useField } from "formik";

import { Container, Label } from "./styles";

type FormikInputCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    position?: "right" | "left";
    thinBorder?: boolean;
    containerClassName?: string;
};

const FormikInputCheckbox: React.FC<FormikInputCheckboxProps> = ({ label, name, position = "right", thinBorder, containerClassName, ...props }) => {
    const [, meta] = useField(name);
    return (
        <Container className={containerClassName}>
            <Label thinBorder={thinBorder} position={position}>
                <Field className="checkbox-input" type="checkbox" id={name} name={name} {...props} />
                <span className="checkbox-field"></span>
                <span className="checkbox-text">{label}</span>
            </Label>
            <span className="checkbox-error">{meta.touched && meta.error}</span>
        </Container>
    );
};

export default FormikInputCheckbox;
