import React from "react";
import { useField } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Container, InputField } from "./styles";

export type FormikInputPasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const FormikInputPassword: React.FC<FormikInputPasswordProps> = ({ label, name, containerClassName, isHorizontal, thinBorder, ...props }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [togglePassword, setTogglePassword] = React.useState(false);
    const [field, meta] = useField(name);

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
            <InputField isTouched={meta.touched} isInvalid={meta.touched && !!meta.error} thinBorder={thinBorder}>
                <input
                    id={name}
                    className="form-control"
                    type={togglePassword ? "text" : "password"}
                    ref={inputRef}
                    aria-invalid={meta.touched && !!meta.error}
                    {...field}
                    {...props}
                />
                <span className="form-error">{meta.touched && meta.error}</span>
                <div className="form-toggle" aria-hidden="true" onClick={handleTogglePassword}>
                    {togglePassword ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
                </div>
            </InputField>
        </Container>
    );
};

export default FormikInputPassword;
