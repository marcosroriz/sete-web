import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import {
    Aluno,
    GrauParentescoEnum,
    GrauParentescoLabel,
    SexoEnum,
    SexoLabel,
    CorEnum,
    CorLabel,
    MecTpLocalizacaoEnum,
    MecTpLocalizacaoLabel,
    MecTpLocalizacaoEnumValues,
} from "entities/Aluno";
import { filesHelper } from "helpers/FilesHelper";
import { AlunosService } from "services/Alunos";

import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";

import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import RecordTable from "components/micro/RecordTable";

import { Container } from "./styles";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const FichaAluno: React.FC = () => {
    const history = useHistory();
    const { id: alunoId } = useParams<{ id: string }>();
    const { errorHandler } = useError();
    const { createModalAsync, createModal } = useAlertModal();
    const { user } = useAuth();
    const { aditionalData } = useReactHookNavCard();
    const [alunoData] = aditionalData?.alunoData as AlunoData;
    const [escolaData] = aditionalData?.escolaData as any;
    const [tableData, setTableData] = React.useState<any>(null);

    const handleVoltarClick = () => {
        history.goBack();
    };

    const handleModificarClick = () => {
        history.push(`/alunos/gerenciar/editar/${alunoId}`);
    };

    const handleDownloadExcelClick = () => {
        console.log("Excel");
    };

    const handleDownloadPdfClick = () => {
        console.log("Pdf");
    };

    const handleDeleteContaClick = async () => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: "Deseja remover os alunos selecionados?" });
            if (!isConfirmed) {
                return;
            }
            createModal();
            const codigo_cidade = user?.codigo_cidade || 0;
            const alunosService = new AlunosService();
            await alunosService.deleteAluno(Number(alunoId), codigo_cidade);
            createModal("success", { title: "Sucesso!", html: "Aluno removido com sucesso" });
            history.goBack();
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Aluno" });
        }
    };

    React.useEffect(() => {
        if (!!alunoData && !!escolaData) {
            const data = {
                ["Nome do Aluno"]: alunoData.nome,
                ["Data de nascimento"]: alunoData.data_nascimento,
                ["Sexo"]: SexoLabel.get((alunoData.sexo?.toString() || "3") as SexoEnum),
                ["Cor/Raça"]: CorLabel.get((alunoData.cor?.toString() || "0") as CorEnum),
                ["CPF"]: alunoData.cpf,
                ["Possui alguma deficiência"]: [
                    alunoData.def_caminhar === "S" ? "Física" : "",
                    alunoData.def_ouvir === "S" ? "Auditiva" : "",
                    alunoData.def_enxergar === "S" ? "Visual" : "",
                    alunoData.def_mental === "S" ? "Mental" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                ["Nome do responsável"]: alunoData.nome_responsavel,
                ["Grau de parentesco"]: GrauParentescoLabel.get((alunoData.grau_responsavel?.toString() || "-1") as GrauParentescoEnum),
                ["Telefonde do responsável"]: alunoData.telefone_responsavel || "Telefone de contato não informado",
                ["Endereço do Aluno"]: alunoData.loc_endereco,
                ["CEP da residência"]: alunoData.loc_cep,
                ["Dificuldade de Acesso"]: [
                    alunoData.da_porteira === "S" ? "Porteira" : "",
                    alunoData.da_mataburro === "S" ? "Mataburro" : "",
                    alunoData.da_colchete === "S" ? "Colchete" : "",
                    alunoData.da_atoleiro === "S" ? "Atoleiro" : "",
                    alunoData.da_ponterustica === "S" ? "Ponte rústica" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                ["Localização"]: MecTpLocalizacaoLabel.get(alunoData.mec_tp_localizacao as MecTpLocalizacaoEnumValues) || "Sem localização",

                ["Escola"]: escolaData.nome,
                ["Contato da escola"]: escolaData.contato_responsavel,
                ["Telefone de contato"]: escolaData.contato_telefone,
            };
            setTableData(data);
        }
    }, [alunoData, escolaData]);
    return (
        <Container>
            <RecordTable title={alunoData?.nome || ""} data={tableData} />
            <ButtonsContainer containerClassName="dt-buttons btn-group">
                <Button variant="info" type="button" className="btn-fill" onClick={handleVoltarClick}>
                    Voltar
                </Button>
                <Button variant="" className="btn-fill btn-excel" onClick={handleDownloadExcelClick}>
                    Exportar para Excel/LibreOffice
                </Button>
                <Button variant="secondary" className="btn-fill" onClick={handleDownloadPdfClick}>
                    Exportar para PDF
                </Button>
                <Button variant="warning" className="btn-fill" onClick={handleModificarClick}>
                    Modificar
                </Button>
                <Button variant="danger" className="btn-fill" onClick={handleDeleteContaClick}>
                    Apagar
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default FichaAluno;
