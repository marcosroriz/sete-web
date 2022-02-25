/**
 * Como muitos dos campos de input possuem a mesma estilização, esse componente serve para economizar o código dessa funcionalidade.
 */
import React from "react";

import { InputField } from "./styles";

type InputFieldWrapperProps = {
    prefix?: string;
    suffix?: string;
    isInvalid?: boolean;
    isTouched?: boolean;
    thinBorder?: boolean;
};

const InputFieldWrapper: React.FC<InputFieldWrapperProps> = ({ prefix, suffix, isInvalid, isTouched, thinBorder, children }) => {
    const [inputChild, ...rest] = React.Children.toArray(children) as React.ReactElement[];
    return (
        <InputField isInvalid={isInvalid} isTouched={isTouched} thinBorder={thinBorder}>
            {prefix || suffix ? (
                <div className="input-group">
                    {prefix && <div className="input-group-text">{prefix}</div>}
                    {inputChild}
                    {suffix && <div className="input-group-text">{suffix}</div>}
                </div>
            ) : (
                inputChild
            )}
            {rest}
        </InputField>
    );
};

export default InputFieldWrapper;
