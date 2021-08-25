import React from "react";
import { useFormContext } from "react-hook-form";

import { Fieldset } from "./styles";

type ReactHookMultiFormListProps = {
    label: string;
    name?: string;
    formListSpacing?: string;
    isHorizontal?: boolean | string;
    fieldsHorizontal?: boolean | string;
    containerClassName?: string;
};

const ReactHookMultiFormList: React.FC<ReactHookMultiFormListProps> = ({
    label,
    name,
    formListSpacing = "evenly",
    isHorizontal,
    fieldsHorizontal,
    containerClassName,
    children,
}) => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <Fieldset
            className={containerClassName ? containerClassName : ""}
            formListSpacing={formListSpacing}
            isHorizontal={!!isHorizontal}
            isHorizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
            fieldsHorizontal={!!fieldsHorizontal}
            fieldsHorizontalMedia={(fieldsHorizontal as any) instanceof String || typeof fieldsHorizontal === "string" ? (fieldsHorizontal as string) : ""}
        >
            <legend className="form-list-legend">{label}</legend>
            <div className="form-list-container">
                <div className="form-list">{children}</div>
                <span className="form-list-error">{errors[name || ""]?.message}</span>
            </div>
        </Fieldset>
    );
};

export default ReactHookMultiFormList;
