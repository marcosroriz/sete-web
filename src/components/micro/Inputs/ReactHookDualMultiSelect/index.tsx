import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Container } from "./styles";

import ActionButtons from "./ActionButtons";
import MultiSelect from "./MultiSelect";

import optionsJson from "./options";

type MultiOptions = { label: string; value: string };

type Texts = { selected: { title: string; placeholder?: string }; notSelected: { title: string; placeholder?: string } };

type ReactHookDualMultiSelectProps = {
    name: string;
    options: MultiOptions[];
    selectedOptions?: MultiOptions[];
    texts: Texts;
};

const ReactHookDualMultiSelect: React.FC<ReactHookDualMultiSelectProps> = ({ name, options, selectedOptions, texts }) => {
    const { register, setValue } = useFormContext();
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
                <MultiSelect
                    title={texts.selected.title}
                    options={displayedNotSelected}
                    selectedValues={notSelectedValues}
                    setSelectedValues={setNotSelectedValues}
                />
            </div>
            <div className="multi-select__action-container">
                <ActionButtons
                    name={name}
                    options={options}
                    notSelectedValues={notSelectedValues}
                    selectedValues={selectedValues}
                    selectedOptions={selectedOptions}
                    resetSelectedValues={resetSelectedValues}
                />
            </div>
            <div className="multi-select__select-container">
                <MultiSelect
                    title={texts.notSelected.title}
                    options={displayedSelected}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                />
            </div>
        </Container>
    );
};

export default ReactHookDualMultiSelect;
