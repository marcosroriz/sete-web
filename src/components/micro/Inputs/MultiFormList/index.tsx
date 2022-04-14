/**
 * Componente contendo componente que engloba as listas de radio e checkbox integrado com React-Hook-Forms.
 */

import React from "react";

import { Fieldset } from "./styles";

type ReactHookMultiFormListProps = React.HTMLAttributes<HTMLDivElement> & {
    label?: string;
    name?: string;
    formListSpacing?: "evenly" | string;
    isHorizontal?: boolean | string;
    fieldsHorizontal?: boolean | string;
    containerClassName?: string;
};

const MultiFormList: React.FC<ReactHookMultiFormListProps> = ({
    label,
    name,
    formListSpacing = "evenly",
    isHorizontal,
    fieldsHorizontal,
    containerClassName,
    children,
    ...props
}) => {
    return (
        <Fieldset
            className={containerClassName ? containerClassName : ""}
            formListSpacing={formListSpacing}
            isHorizontal={!!isHorizontal}
            isHorizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
            fieldsHorizontal={!!fieldsHorizontal}
            fieldsHorizontalMedia={(fieldsHorizontal as any) instanceof String || typeof fieldsHorizontal === "string" ? (fieldsHorizontal as string) : ""}
        >
            {label && <legend className="form-list-legend">{label}</legend>}
            <div className="form-list-container">
                <div className="form-list" onChange={props.onChange} {...props}>
                    {children}
                </div>
            </div>
        </Fieldset>
    );
};

export default MultiFormList;
