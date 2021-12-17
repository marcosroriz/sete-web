/**
 * Componente contendo Label, Multi-Select e ErrorMessage integrado com React-Hook-Forms
 */

import React, { useState } from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import Select, { NamedProps } from "react-select";
import makeAnimated from "react-select/animated";

import { Container, InputField } from "./styles";

type SelectOptions = {
    value: string;
    label: string;
};

export type ReactHookInputMultiSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
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
    };

const ReactHookInputMultiSelect: React.FC<ReactHookInputMultiSelectProps> = ({
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
    ...props
}) => {
    const {
        formState: { errors, touchedFields },
    } = useFormContext();
    const selectValue = useWatch({
        name,
    });
    const [selectedOptions, setSelectedOptions] = useState<SelectOptions[]>([]);

    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name} id={`label-${name}`}>
                {label}
            </label>
            <InputField
                isTouched={touchedFields[name]}
                isInvalid={!!errors[name]}
                thinBorder={thinBorder}
                isPlaceholder={!hasPlaceholderOption && selectValue === ""}
            >
                <Controller
                    name={name}
                    render={({ field: { onChange, value, ...field } }) => {
                        // const handleSelectChange = (option: SelectOptions) => {
                        //     onChange(option.value);
                        // };
                        return (
                            <Select
                                camponents={makeAnimated()}
                                aria-labelledby={`label-${name}`}
                                id={name}
                                value={selectedOptions}
                                placeholder={placeholder}
                                onChange={setSelectedOptions}
                                className="select"
                                options={hasPlaceholderOption ? [{ label: placeholder, value: "" }, ...options] : options}
                                menuPlacement={menuPlacement}
                                classNamePrefix="form-control"
                                aria-invalid={!!errors[name]}
                                noOptionsMessage={() => noOptionsMessage || "Nenhuma Opção Encontrada"}
                                isMulti
                                isSearchable
                                {...field}
                                {...(props as any)}
                            />
                        );
                    }}
                />

                <span className="form-error">{errors[name]?.message}</span>
            </InputField>
        </Container>
    );
};

export default ReactHookInputMultiSelect;
