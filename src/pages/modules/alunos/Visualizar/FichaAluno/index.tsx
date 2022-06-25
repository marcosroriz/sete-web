import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";

import { filesHelper } from "helpers/FilesHelper";
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
} from "entities/Aluno";
import { AlunosService } from "services/Alunos";

import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { useNavCard } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";

import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import RecordTable from "components/micro/RecordTable";
import TableDocument from "components/micro/Pdf/TableDocument";
import { Column } from "components/micro/Pdf/Global";

import { Container } from "./styles";

const pdfColumns = [
    { acessor: "key", Header: " ", width: "30%" },
    { acessor: "value", Header: " ", width: "70%" },
] as Column[];

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const FichaAluno: React.FC = () => {
    const history = useHistory();
    const { id: alunoId } = useParams<{ id: string }>();
    const { errorHandler } = useError();
    const { createModalAsync, createModal, clearModal } = useAlertModal();
    const { user } = useAuth();
    const { aditionalData } = useNavCard();
    const [alunoData] = aditionalData?.alunoData as AlunoData;
    const [escolaData] = aditionalData?.escolaData as any;
    const [tableData, setTableData] = React.useState<any>(null);
    const downloadData = React.useMemo(() => Object.entries(tableData || {}).map(([key, value]) => ({ key, value })), [tableData]);

    const handleVoltarClick = () => {
        history.goBack();
    };

    const handleModificarClick = () => {
        history.push(`/alunos/gerenciar/editar/${alunoId}`);
    };

    const handleDownloadExcelClick = () => {
        const xlsxData = downloadData.map((data) => pdfColumns.map((val) => data[val.acessor]));

        const blob = filesHelper.processXslxFile(xlsxData);

        filesHelper.downloadFile(blob, `Alunos ${alunoData?.nome}.xlsx`);
    };

    const handleDownloadPdfClick = async () => {
        try {
            createModal("loading");
            await filesHelper.delay(600);
            const blob = await pdf(
                <TableDocument
                    titleCity="Aparecida de Goiânia (Goiás)"
                    titleRecords={`Aluno: ${alunoData?.nome}`}
                    data={downloadData}
                    columns={pdfColumns}
                    hasNoHeader
                />,
            ).toBlob();
            filesHelper.downloadFile(blob, `Alunos ${alunoData?.nome}.pdf`);
            clearModal();
        } catch (err) {
            console.log("err", err);
            errorHandler(err, { title: "Falha ao fazer download do pdf" });
        }
    };

    const handleDeleteContaClick = async () => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: `Deseja remover o aluno <b>${alunoData?.nome}</b>?` });
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
        if (!!alunoData) {
            const data = {
                ["Nome do Aluno"]: alunoData.nome,
                ["Data de nascimento"]: alunoData.data_nascimento,
                ["Sexo"]: SexoLabel.get(alunoData.sexo as SexoEnum),
                ["Cor/Raça"]: CorLabel.get(alunoData.cor as CorEnum),
                ["CPF"]: alunoData.cpf || "-",
                ["Possui alguma deficiência"]:
                    [
                        alunoData.def_caminhar === "S" ? "Física" : "",
                        alunoData.def_ouvir === "S" ? "Auditiva" : "",
                        alunoData.def_enxergar === "S" ? "Visual" : "",
                        alunoData.def_mental === "S" ? "Mental" : "",
                    ]
                        .filter((val) => val !== "")
                        .join(", ") || "Não",
                ["Nome do responsável"]: alunoData.nome_responsavel,
                ["Grau de parentesco"]: GrauParentescoLabel.get(alunoData.grau_responsavel as GrauParentescoEnum),
                ["Telefonde do responsável"]: alunoData.telefone_responsavel || "Telefone de contato não informado",
                ["Endereço do Aluno"]: alunoData.loc_endereco || "-",
                ["CEP da residência"]: alunoData.loc_cep,
                ["Dificuldade de Acesso"]:
                    [
                        alunoData.da_porteira === "S" ? "Porteira" : "",
                        alunoData.da_mataburro === "S" ? "Mataburro" : "",
                        alunoData.da_colchete === "S" ? "Colchete" : "",
                        alunoData.da_atoleiro === "S" ? "Atoleiro" : "",
                        alunoData.da_ponterustica === "S" ? "Ponte rústica" : "",
                    ]
                        .filter((val) => val !== "")
                        .join(", ") || "Não",
                ["Localização"]: MecTpLocalizacaoLabel.get(alunoData.mec_tp_localizacao as MecTpLocalizacaoEnum) || "Sem localização",

                ["Escola"]: "",
                ["Contato da escola"]: "",
                ["Telefone de contato"]: "",
            };

            if (!!escolaData) {
                data["Escola"] = escolaData.nome;
                data["Contato da escola"] = escolaData.contato_responsavel;
                data["Telefone de contato"] = escolaData.contato_telefone;
            }
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
