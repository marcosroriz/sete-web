import React from "react";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Container, InputField } from "./styles";

export type ReactHookInputPasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const ReactHookInputPassword: React.FC<ReactHookInputPasswordProps> = ({ label, name, containerClassName, isHorizontal, thinBorder, ...props }) => {
    const [togglePassword, setTogglePassword] = React.useState(false);
    const {
        register,
        formState: { errors, touchedFields },
    } = useFormContext();

    const handleTogglePassword = React.useCallback(
        (_: React.MouseEvent<HTMLDivElement>) => {
            setTogglePassword((prev) => !prev);
        },
        [setTogglePassword],
    );

    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder}>
                <input
                    id={name}
                    className="form-control"
                    type={togglePassword ? "text" : "password"}
                    aria-invalid={!!errors[name]}
                    {...register(name)}
                    {...props}
                />
                <span className="form-error">{errors[name]?.message}</span>
                <div className="form-toggle" aria-hidden="true" onClick={handleTogglePassword}>
                    {togglePassword ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
                </div>
            </InputField>
        </Container>
    );
};

export default ReactHookInputPassword;
