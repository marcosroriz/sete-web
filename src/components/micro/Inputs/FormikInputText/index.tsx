import React, { useCallback } from "react";
import { useField, useFormikContext } from "formik";
import { Container } from "./styles";

type FormikInputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
};

const FormikInputText: React.FC<FormikInputTextProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props.name);
    const { touched: touchedState, setTouched: setTouchedState } = useFormikContext();

    const handleFocus = useCallback(() => {
        setTouchedState({ ...touchedState, [props.name]: false });
    }, [touchedState, setTouchedState]);
    return (
        <Container className="input-component">
            <label htmlFor={props.name}>{label}</label>
            <div>
                <input id={props.name} onFocus={handleFocus} {...field} {...props} />
                <span>{meta.touched && meta.error}</span>
            </div>
        </Container>
    );
};

export default FormikInputText;
