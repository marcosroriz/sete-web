import React from "react";
import { useFormContext } from "react-hook-form";

import { Container, Label } from "./styles";

type ReactHookInputRadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    position?: "right" | "left";
    thinBorder?: boolean;
    containerClassName?: string;
};

const ReactHookInputRadio: React.FC<ReactHookInputRadioProps> = ({ label, name, position = "right", thinBorder, containerClassName, ...props }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <Container className={containerClassName}>
            <Label thinBorder={thinBorder} position={position}>
                <input className="radio-input" type="radio" id={`${name}-${props.value}`} aria-invalid={!!errors[name]} {...register(name)} {...props} />
                <span className="radio-field"></span>
                <span className="radio-text">{label}</span>
            </Label>
            <span className="radio-error">{errors[name]?.message}</span>
        </Container>
    );
};

export default ReactHookInputRadio;
