/**
 * Como muitos dos campos de input possuem a mesma estilização, esse componente serve para economizar o código dessa funcionalidade.
 */
import React from "react";

import { InputField } from "./styles";

type InputFieldWrapperProps = {
    unitOfMeasure?: string;
    isInvalid?: boolean;
    isTouched?: boolean;
    thinBorder?: boolean;
};

const InputFieldWrapper: React.FC<InputFieldWrapperProps> = ({ unitOfMeasure, isInvalid, isTouched, thinBorder, children }) => {
    const [inputChild, ...rest] = React.Children.toArray(children) as React.ReactElement[];
    return (
        <InputField isInvalid={isInvalid} isTouched={isTouched} thinBorder={thinBorder}>
            {unitOfMeasure ? (
                unitOfMeasure === "R$" ? (
                    <div className="input-group">
                        <div className="input-group-text">{unitOfMeasure}</div>
                        {inputChild}
                    </div>
                ) : (
                    <div className="input-group">
                        {inputChild}
                        <div className="input-group-text">{unitOfMeasure}</div>
                    </div>
                )
            ) : (
                inputChild
            )}
            {rest}
        </InputField>
    );
};

export default InputFieldWrapper;
