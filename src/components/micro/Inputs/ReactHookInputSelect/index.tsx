import React from "react";
import { useFormContext } from "react-hook-form";
import ReactSelect from "react-select";

import { Container, InputField } from "./styles";

type SelectOptions = {
    value: string;
    label: string;
};

export type ReactHookInputSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    name: string;
    options: SelectOptions[];
    placeholder: string;
    menuPlacement?: "auto" | "bottom" | "top";
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const ReactHookInputSelect: React.FC<ReactHookInputSelectProps> = ({
    label,
    name,
    containerClassName,
    options,
    menuPlacement = "auto",
    placeholder,
    isHorizontal,
    thinBorder,
    ...props
}) => {
    const [selectValue, setSelectValue] = React.useState<SelectOptions>({ value: "", label: placeholder });
    const {
        register,
        setValue,
        setFocus,
        formState: { errors, touchedFields },
    } = useFormContext();
    const { onChange: removed1, ...registerField } = register(name);
    const handleSelectChange = React.useCallback(
        (value: SelectOptions) => {
            setValue(name, value.value, { shouldValidate: true });
            setSelectValue(value);
        },
        [setSelectValue, setValue],
    );
    const handleSelectFocus = React.useCallback(() => {
        setFocus(name);
    }, [setFocus]);
    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder} isPlaceholder={selectValue.value === ""}>
                <ReactSelect
                    id={name}
                    value={selectValue}
                    onChange={handleSelectChange}
                    onFocus={handleSelectFocus}
                    className="select"
                    options={options}
                    menuPlacement={menuPlacement}
                    classNamePrefix="form-control"
                    aria-invalid={!!errors[name]}
                    noOptionsMessage={() => "Valor não Encontrado"}
                    {...registerField}
                    {...(props as any)}
                />
                <span className="form-error">{errors[name]?.message}</span>
            </InputField>
        </Container>
    );
};

export default ReactHookInputSelect;
