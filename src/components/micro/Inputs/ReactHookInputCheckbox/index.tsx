import React from "react";
import { useFormContext } from "react-hook-form";

import { Container, Label } from "./styles";

type ReactHookInputCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    hasErrorMessage?: boolean;
    position?: "right" | "left";
    thinBorder?: boolean;
    containerClassName?: string;
};

const ReactHookInputCheckbox: React.FC<ReactHookInputCheckboxProps> = ({
    label,
    name,
    hasErrorMessage = false,
    position = "right",
    thinBorder,
    containerClassName,
    ...props
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Container className={containerClassName}>
            <Label thinBorder={thinBorder} position={position}>
                <input className="checkbox-input" type="checkbox" id={name} aria-invalid={!!errors[name]} {...register(name)} {...props} />
                <span className="checkbox-field"></span>
                <span className="checkbox-text">{label}</span>
            </Label>
            {hasErrorMessage && <span className="checkbox-error">{errors[name]?.message}</span>}
        </Container>
    );
};

export default ReactHookInputCheckbox;
