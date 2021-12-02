import React from "react";
import { FaRegSquare } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useWatch, useFormContext } from "react-hook-form";

import { CensoHelper } from "helpers/CensoHelper";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useCensoImportTable, TableData } from "contexts/Tables/CensoImportTable";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import InfoList from "components/micro/Lists/InfoList";
import InfoListItem from "components/micro/Lists/InfoListItem";
import ImportTable from "components/micro/ImportTable";

import { Container } from "./styles";

const Importar: React.FC = () => {
    const { tableData, columns, parseCensoFile } = useCensoImportTable();
    const {
        setValue,
        formState: { errors },
    } = useFormContext();
    const { previousStep } = useReactHookNavCard();
    const file = useWatch({ name: "arquivo" });

    const onSelectedDataChange = (val: TableData[]) => {
        setValue("selecionado", val, { shouldValidate: true });
    };

    React.useEffect(() => {
        if (file) {
            parseCensoFile(file);
        }
    }, [file]);

    return (
        <Container>
            <BlockTitle message="ESSA FERRAMENTA POSSIBILITA IMPORTAR OS E CADASTRADAS NA BASE DO CENSO ESCOLAR." />
            <InfoList>
                <InfoListItem>
                    PARA SELECIONAR UMA OU MIAS ESCOLAS, BASTA CLICAR NO ÍCONE <FaRegSquare size={12} />.
                </InfoListItem>
                <InfoListItem>
                    PARA SELECIONAR TODAS AS ESCOLAS, CLIQUE NO ÍCONE <FaRegSquare size={12} /> NO CABEÇALHO DA TABELA.
                </InfoListItem>
                <InfoListItem>
                    POR FIM, CLIQUE NO BOTÃO <span>importar</span> PARA CONCLUIR O PROCESSO
                </InfoListItem>
            </InfoList>
            <ImportTable data={tableData} columns={columns} onSelectedDataChange={onSelectedDataChange} />
            {errors.selecionado && <span className="selected-error-message">{errors.selecionado?.message}</span>}
            <ButtonsContainer position="evenly">
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Importar
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Importar;
