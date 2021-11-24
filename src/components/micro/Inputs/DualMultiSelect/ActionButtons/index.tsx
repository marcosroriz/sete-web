import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import { Container } from "./styles";

type MultiOptions = { label: string; value: string };

type ActionButtonsProps = {
    options: MultiOptions[];
    notSelectedValues: string[];
    selectedValues: string[];
    setSeleted: React.Dispatch<React.SetStateAction<string[]>>;
    resetSelectedValues: () => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ options, notSelectedValues, selectedValues, resetSelectedValues, setSeleted }) => {
    const handleSelect = () => {
        setSeleted((prev) => [
            ...options.filter((option) => notSelectedValues.find((select) => select === option.value)).map((option) => option.value),
            ...prev,
        ]);
        resetSelectedValues();
    };
    const handleUnSelect = () => {
        setSeleted((prev) => [...prev.filter((option) => !selectedValues.find((select) => select === option))]);
        resetSelectedValues();
    };
    return (
        <Container>
            <button className="multi-select__button" onClick={handleSelect}>
                <FaArrowRight size={18} />
            </button>
            <button className="multi-select__button" onClick={handleUnSelect}>
                <FaArrowLeft size={18} />
            </button>
        </Container>
    );
};

export default React.memo(ActionButtons);
