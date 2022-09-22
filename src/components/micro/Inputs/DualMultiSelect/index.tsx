import React from "react";

import { Container } from "./styles";

import ActionButtons from "./ActionButtons";
import MultiSelect from "./MultiSelect";

import optionsJson from "./options";

type MultiOptions = { label: string; value: string };

type DualMultiSelectProps = {};

const DualMultiSelect: React.FC<DualMultiSelectProps> = () => {
    const options = optionsJson as MultiOptions[];
    const [selected, setSeleted] = React.useState<string[]>([]);
    const [notSelectedValues, setNotSelectedValues] = React.useState<string[]>([]);
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

    const displayedNotSelected = React.useMemo(() => options.filter((option) => !selected.find((select) => select === option.value)), [selected, options]);
    const displayedSelected = React.useMemo(
        () =>
            selected
                .map((select) => options.find((option) => select === option.value))
                .filter((option) => option && selected.find((select) => select === option?.value)) as MultiOptions[],
        [selected, options],
    );

    const resetSelectedValues = () => {
        setNotSelectedValues([]);
        setSelectedValues([]);
    };

    return (
        <Container>
            <div className="multi-select__select-container">
                <MultiSelect options={displayedNotSelected} selectedValues={notSelectedValues} setSelectedValues={setNotSelectedValues} />
            </div>
            <div className="multi-select__action-container">
                <ActionButtons
                    options={options}
                    notSelectedValues={notSelectedValues}
                    selectedValues={selectedValues}
                    resetSelectedValues={resetSelectedValues}
                    setSeleted={setSeleted}
                />
            </div>
            <div className="multi-select__select-container">
                <MultiSelect options={displayedSelected} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
            </div>
        </Container>
    );
};

export default DualMultiSelect;
