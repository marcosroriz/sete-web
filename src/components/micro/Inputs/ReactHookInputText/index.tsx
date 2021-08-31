import React from "react";
import { useFormContext } from "react-hook-form";
import { Container, InputField } from "./styles";

export type ReactHookInputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const ReactHookInputText: React.FC<ReactHookInputTextProps> = ({ label, name, containerClassName, isHorizontal, thinBorder, ...props }) => {
    const {
        register,
        formState: { errors, touchedFields },
    } = useFormContext();
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder}>
                <input id={name} className="form-control" aria-invalid={!!errors[name]} {...register(name)} {...props} />
                <span className="form-error">{errors[name]?.message}</span>
            </InputField>
        </Container>
    );
};

export default ReactHookInputText;
