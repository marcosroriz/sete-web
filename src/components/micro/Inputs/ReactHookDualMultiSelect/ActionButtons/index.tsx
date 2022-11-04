import React from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import { Container } from "./styles";

type MultiOptions = { label: string; value: string };

type ActionButtonsProps = {
    name: string;
    options: MultiOptions[];
    notSelectedValues: string[];
    selectedValues: string[];
    resetSelectedValues: () => void;
    selectedOptions?: MultiOptions[];
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ name, options, notSelectedValues, selectedValues, selectedOptions, resetSelectedValues }) => {
    const { setValue, getValues } = useFormContext();

    React.useEffect(() => {
        if (!!selectedOptions) {
            const prev = (getValues(name) as string[]) || [];
            setValue(name, [
                ...options.filter((option) => selectedOptions.find((select) => select.value === option.value)).map((option) => option.value),
                ...prev,
            ]);
            resetSelectedValues();
        }
    }, [selectedOptions]);

    const handleSelect = () => {
        const prev = (getValues(name) as string[]) || [];
        console.log("options", notSelectedValues);
        setValue(name, [...options.filter((option) => notSelectedValues.find((select) => select === option.value)).map((option) => option.value), ...prev]);
        resetSelectedValues();
    };

    const handleUnSelect = () => {
        const prev = (getValues(name) as string[]) || [];
        setValue(name, [...prev.filter((option) => !selectedValues.find((select) => select === option))]);
        resetSelectedValues();
    };

    return (
        <Container>
            <button className="multi-select__button" type="button" onClick={handleSelect}>
                <FaArrowRight size={18} />
            </button>
            <button className="multi-select__button" type="button" onClick={handleUnSelect}>
                <FaArrowLeft size={18} />
            </button>
        </Container>
    );
};

export default React.memo(ActionButtons);
