import React from "react";
import { Field, useField } from "formik";

import { Container, Label } from "./styles";

type FormikInputRadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    position?: "right" | "left";
    thinBorder?: boolean;
    containerClassName?: string;
};

const FormikInputRadio: React.FC<FormikInputRadioProps> = ({ label, name, position = "right", thinBorder, containerClassName, ...props }) => {
    const [, meta] = useField(name);
    return (
        <Container className={containerClassName}>
            <Label thinBorder={thinBorder} position={position}>
                <Field className="radio-input" type="radio" id={`${name}-${props.value}`} name={name} {...props} />
                <span className="radio-field"></span>
                <span className="radio-text">{label}</span>
            </Label>
            <span className="radio-error">{meta.touched && meta.error}</span>
        </Container>
    );
};

export default FormikInputRadio;
