/**
 * Componente contendo Label, Checkbox e ErrorMessage integrado com React-Hook-Forms
 */

import React from "react";

import { Container, Label } from "./styles";

type ReactHookInputCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    hasErrorMessage?: boolean;
    position?: "right" | "left";
    thinBorder?: boolean;
    containerClassName?: string;
};

const InputCheckbox: React.FC<ReactHookInputCheckboxProps> = ({
    label,
    name,
    hasErrorMessage = false,
    position = "right",
    thinBorder,
    containerClassName,
    ...props
}) => {
    return (
        <Container className={containerClassName}>
            <Label thinBorder={thinBorder} position={position}>
                <input className="checkbox-input" type="checkbox" id={name} {...props} />
                <span className="checkbox-field"></span>
                <span className="checkbox-text">{label}</span>
            </Label>
        </Container>
    );
};

export default InputCheckbox;
