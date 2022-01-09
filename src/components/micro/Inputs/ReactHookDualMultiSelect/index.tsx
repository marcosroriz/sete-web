import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Container } from "./styles";

import ActionButtons from "./ActionButtons";
import MultiSelect from "./MultiSelect";

import optionsJson from "./options";

type MultiOptions = { label: string; value: string };

type ReactHookDualMultiSelectProps = {
    name: string;
    options: MultiOptions[];
    title: string[];
};

const ReactHookDualMultiSelect: React.FC<ReactHookDualMultiSelectProps> = ({ name, options, title }) => {
    const { register } = useFormContext();
    const selected = (useWatch({ name }) as string[]) || [];
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

    React.useEffect(() => {
        register(name);
    }, []);

    return (
        <Container>
            <div className="multi-select__select-container">
                <MultiSelect title={title[0]} options={displayedNotSelected} selectedValues={notSelectedValues} setSelectedValues={setNotSelectedValues} />
            </div>
            <div className="multi-select__action-container">
                <ActionButtons
                    name={name}
                    options={options}
                    notSelectedValues={notSelectedValues}
                    selectedValues={selectedValues}
                    resetSelectedValues={resetSelectedValues}
                />
            </div>
            <div className="multi-select__select-container">
                <MultiSelect title={title[1]} options={displayedSelected} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
            </div>
        </Container>
    );
};

export default ReactHookDualMultiSelect;
