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
                <div className="input-group">
                    {inputChild}
                    <div className="input-group-text">{unitOfMeasure}</div>
                </div>
            ) : (
                inputChild
            )}
            {rest}
        </InputField>
    );
};

export default InputFieldWrapper;
