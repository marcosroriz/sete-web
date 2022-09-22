import React from "react";
import InputText from "../../InputText";

import { useDebounce } from "hooks/Debounce";
import { FormatHelper } from "helpers/FormatHelper";

import { Container } from "./styles";

type MultiOptions = { label: string; value: string };

type MultiSelectProps = {
    title: string;
    selectedValues: string[];
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
    options: MultiOptions[];
    selected?: string[];
};

const MultiSelect: React.FC<MultiSelectProps> = ({ title, options, selectedValues, setSelectedValues }) => {
    const [inputText, setInputText] = React.useState("");

    const handleInputChange = useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    }, 300);

    const handleMultiSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = event.target.selectedOptions;
        setSelectedValues(Array.from(selectedOptions).map((option) => option.value));
    };

    const filterText = (opt: MultiOptions[]) => {
        const formatHelper = new FormatHelper();
        return opt.filter((option) => formatHelper.normalize(option.label).includes(formatHelper.normalize(inputText)));
    };

    return (
        <Container thinBorder={false}>
            <InputText label={title} onChange={handleInputChange} />
            <select value={selectedValues} className="multi-select__box form-control" onChange={handleMultiSelectChange} multiple aria-invalid="false">
                {filterText(options).map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </Container>
    );
};

export default React.memo(MultiSelect);
