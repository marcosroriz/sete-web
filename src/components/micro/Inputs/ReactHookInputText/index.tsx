/**
 * Componente contendo Label, InputText e ErrorMessage integrado com React-Hook-Forms
 */

import React from "react";
import { useFormContext } from "react-hook-form";

import InputFieldWrapper from "../InputFieldWrapper";

import { Container } from "./styles";

export type ReactHookInputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    prefix?: string;
    suffix?: string;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
    dontShowError?: boolean;
};

const ReactHookInputText: React.FC<ReactHookInputTextProps> = ({
    label,
    name,
    containerClassName,
    isHorizontal,
    thinBorder,
    prefix,
    suffix,
    dontShowError,
    ...props
}) => {
    const {
        register,
        formState: { errors, touchedFields },
    } = useFormContext();
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            dontShowError={dontShowError}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputFieldWrapper isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder} prefix={prefix} suffix={suffix}>
                <input id={name} className="form-control" aria-invalid={!!errors[name]} {...register(name)} {...props} />
                {!dontShowError && <span className="form-error">{errors[name]?.message}</span>}
            </InputFieldWrapper>
        </Container>
    );
};

export default ReactHookInputText;
