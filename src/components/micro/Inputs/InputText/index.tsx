/**
 * Componente contendo Label, InputText e ErrorMessage
 */

import React from "react";

import InputFieldWrapper from "../InputFieldWrapper";

import { Container } from "./styles";

export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    name?: string;
    error?: string;
    touched?: boolean;
    unitOfMeasure?: string;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
    dontShowError?: boolean;
};

const InputText: React.FC<InputTextProps> = ({
    label,
    name,
    error,
    touched,
    containerClassName,
    isHorizontal,
    thinBorder,
    unitOfMeasure,
    dontShowError,
    ...props
}) => {
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            dontShowError={dontShowError}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            {label && <label htmlFor={name}>{label}</label>}
            <InputFieldWrapper isTouched={touched} isInvalid={!!error} thinBorder={thinBorder} unitOfMeasure={unitOfMeasure}>
                <input id={name} className="form-control" aria-invalid={!!error} {...props} />
                {!dontShowError && <span className="form-error">{error}</span>}
            </InputFieldWrapper>
        </Container>
    );
};

export default InputText;
