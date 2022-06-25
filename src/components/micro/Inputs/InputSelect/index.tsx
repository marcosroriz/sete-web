/**
 * Componente contendo Label, Select e ErrorMessage integrado com React-Hook-Forms
 */

import React from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import ReactSelect, { NamedProps } from "react-select";

import { Container, InputField } from "./styles";

type SelectOptions = {
    value: string;
    label: string;
};

export type ReactHookInputSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
    NamedProps & {
        label: string;
        name: string;
        options: SelectOptions[];
        noOptionsMessage?: string;
        placeholder?: string;
        menuPlacement?: "auto" | "bottom" | "top";
        isHorizontal?: boolean | string;
        thinBorder?: boolean;
        containerClassName?: string;
        hasPlaceholderOption?: boolean;
        getOptionLabel?: any;
    };

const InputSelect: React.FC<ReactHookInputSelectProps> = ({
    label,
    name,
    containerClassName,
    options,
    noOptionsMessage,
    menuPlacement = "auto",
    placeholder = "Selecione uma Opção",
    isHorizontal,
    thinBorder,
    hasPlaceholderOption,
    getOptionLabel,
    ...props
}) => {
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name} id={`label-${name}`}>
                {label}
            </label>
            <InputField thinBorder={thinBorder}>
                <ReactSelect
                    aria-labelledby={`label-${name}`}
                    id={name}
                    placeholder={placeholder}
                    className="select"
                    options={hasPlaceholderOption ? [{ label: placeholder, value: "" }, ...options] : options}
                    menuPlacement={menuPlacement}
                    classNamePrefix="form-control"
                    noOptionsMessage={() => noOptionsMessage || "Nenhuma Opção Encontrada"}
                    getOptionLabel={getOptionLabel}
                    {...(props as any)}
                />
            </InputField>
        </Container>
    );
};

export default InputSelect;
