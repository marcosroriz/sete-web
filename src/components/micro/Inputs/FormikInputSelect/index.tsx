import React from "react";
import { useField, useFormikContext } from "formik";
import ReactSelect from "react-select";

import { Container, InputField } from "./styles";

type SelectOptions = {
    value: string;
    label: string;
};

export type FormikInputSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    name: string;
    options: SelectOptions[];
    placeholder: string;
    menuPlacement?: "auto" | "bottom" | "top";
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const FormikInputSelect: React.FC<FormikInputSelectProps> = ({
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
    const [, meta] = useField(name);
    const { setFieldValue, setFieldTouched } = useFormikContext();
    const handleSelectChange = React.useCallback(
        (value: SelectOptions) => {
            setFieldValue(name, value.value);
            setSelectValue(value);
        },
        [setSelectValue, setFieldValue],
    );
    const handleBlur = React.useCallback(() => {
        setFieldTouched(name, true);
    }, [setFieldTouched]);

    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={meta.touched} isInvalid={meta.touched && !!meta.error} thinBorder={thinBorder} isPlaceholder={selectValue.value === ""}>
                <ReactSelect
                    id={name}
                    value={selectValue}
                    onChange={handleSelectChange}
                    onBlur={handleBlur}
                    className="select"
                    options={options}
                    menuPlacement={menuPlacement}
                    classNamePrefix="form-control"
                    aria-invalid={meta.touched && !!meta.error}
                    noOptionsMessage={() => "Valor não Encontrado"}
                    {...(props as any)}
                />
                <span className="form-error">{meta.touched && meta.error}</span>
            </InputField>
        </Container>
    );
};

export default FormikInputSelect;
