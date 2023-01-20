import React from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";

import { Escola, MecTpLocalizacaoLabel, MecTpDependenciaLabel } from "entities/Escola";

import { filesHelper } from "helpers/FilesHelper";
import { formatHelper } from "helpers/FormatHelper";

import { EscolasService } from "services/Escolas";

import { useNavCard } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";

import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import { Column } from "components/micro/Pdf/Global";
import TableDocument from "components/micro/Pdf/TableDocument";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import RecordTable from "components/micro/RecordTable";

import { Container } from "./styles";

type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const pdfColumns = [
    { acessor: "key", Header: " ", width: "30%" },
    { acessor: "value", Header: " ", width: "70%" },
] as Column[];

const FichaEscola: React.FC = () => {
    const history = useHistory();
    const { id: escolaId } = useParams<{ id: string }>();
    const { errorHandler } = useError();
    const { createModalAsync, createModal, clearModal } = useAlertModal();
    const { user } = useAuth();
    const { aditionalData } = useNavCard();
    const [escolaData] = aditionalData?.escolaData as EscolaData;
    const [tableData, setTableData] = React.useState<any>(null);

    const downloadData = React.useMemo(() => Object.entries(tableData || {}).map(([key, value]) => ({ key, value })), [tableData]);

    const handleVoltarClick = () => {
        history.goBack();
    };

    const handleModificarClick = () => {
        history.push(`/escolas/gerenciar/editar/${escolaId}`);
    };

    const handleDownloadExcelClick = () => {
        const xlsxData = downloadData.map((data) => pdfColumns.map((val) => data[val.acessor]));

        const blob = filesHelper.processXslxFile(xlsxData);

        filesHelper.downloadFile(blob, `Escola ${escolaData?.nome}.xlsx`);
    };

    const handleDownloadPdfClick = async () => {
        try {
            console.log("down", downloadData);
            createModal("loading");
            await filesHelper.delay(600);
            const blob = await pdf(
                <TableDocument
                    titleCity="Aparecida de Goiânia (Goiás)"
                    titleRecords={`Escola: ${escolaData?.nome}`}
                    data={downloadData}
                    columns={pdfColumns}
                    hasNoHeader
                />,
            ).toBlob();
            filesHelper.downloadFile(blob, `Escola ${escolaData?.nome}.pdf`);
            clearModal();
        } catch (err) {
            console.log("err", err);
            errorHandler(err, { title: "Falha ao fazer download do pdf" });
        }
    };

    const handleDeleteContaClick = async () => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: `Deseja remover a escola <b>${escolaData?.nome}</b>?` });
            if (!isConfirmed) {
                return;
            }
            createModal();
            const codigo_cidade = user?.codigo_cidade || 0;
            const escolasService = new EscolasService();
            await escolasService.deleteEscola(Number(escolaId), codigo_cidade);
            createModal("success", { title: "Sucesso!", html: "Escola removida com sucesso" });
            history.goBack();
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Escola" });
        }
    };

    React.useEffect(() => {
        console.log("ESCOLA DATA", escolaData);
        if (!!escolaData) {
            const data = {
                ["Nome da escola"]: escolaData.nome,
                ["Estado"]: escolaData.mec_co_uf,
                ["Município"]: escolaData.mec_co_municipio,
                ["CEP"]: escolaData.loc_cep,
                ["Endereço"]: escolaData.loc_endereco,
                ["Tipo de Localização"]: MecTpLocalizacaoLabel.get(escolaData.mec_tp_localizacao!) || "-",
                ["Dependência"]: MecTpDependenciaLabel.get(escolaData.mec_tp_dependencia!) || "-",
                ["Contato"]: escolaData.contato_responsavel,
                ["Telefone de contato"]: escolaData.contato_telefone,
                ["E-mail de contato"]: escolaData.contato_email,
                ["Tipo de ensino oferecido"]: [
                    formatHelper.parseSNToString(escolaData.ensino_pre_escola, "Infantil"),
                    formatHelper.parseSNToString(escolaData.ensino_fundamental, "Fundamental"),
                    formatHelper.parseSNToString(escolaData.ensino_medio, "Médio"),
                    formatHelper.parseSNToString(escolaData.ensino_superior, "Superior"),
                ].joinValid(", "),
                ["Modo de ensino oferecido"]: [
                    formatHelper.parseSNToString(escolaData.mec_in_regular, "Regular"),
                    formatHelper.parseSNToString(escolaData.mec_in_eja, "EJA"),
                    formatHelper.parseSNToString(escolaData.mec_in_profissionalizante, "Profissionalizante"),
                    formatHelper.parseSNToString(escolaData.mec_in_especial_exclusiva, "Exclusiva"),
                ].joinValid(", "),
                ["Horário de funcionamento"]: [
                    formatHelper.parseSNToString(escolaData.horario_matutino, "Manhã"),
                    formatHelper.parseSNToString(escolaData.horario_vespertino, "Tarde"),
                    formatHelper.parseSNToString(escolaData.horario_noturno, "Noite"),
                ].joinValid(", "),
            };
            setTableData(data);
        }
    }, [escolaData]);
    return (
        <Container>
            <RecordTable title={escolaData?.nome || ""} data={tableData} />
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

export default FichaEscola;
