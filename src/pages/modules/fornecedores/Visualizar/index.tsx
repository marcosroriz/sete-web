import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { Fornecedor } from "entities/Fornecedor";
import { FornecedoresService } from "services/Fornecedores";

import PageTitle from "components/micro/PageTitle";

import FichaFornecedor from "./FichaFornecedor";

import AlunosListar from "assets/icons/alunos/alunos-listar.png";
import FichaAlunoIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";

const Visualizar: React.FC = () => {
    const { id: fornecedorId } = useParams<{ id: string }>();
    const [fornecedorData, setFornecedorData] = React.useState<Fornecedor | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const fornecedorService = new FornecedoresService();
                const response = await fornecedorService.getFornecedor(Number(fornecedorId), codigo_cidade);
                setFornecedorData(response);
                if (!response.result) {
                    throw { ...response };
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados do fornecedor" });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <PageTitle message="alunos Cadastradas" icon={AlunosListar} />
            <NavCardProvider aditionalData={{ fornecedorData: [fornecedorData, setFornecedorData] }}>
                <NavCardTab name="FICHA DO FORNECEDOR" icon={<img src={FichaAlunoIcon} alt="" aria-hidden="true" />}>
                    <FichaFornecedor />
                </NavCardTab>
                <NavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" aria-hidden="true" />}>
                    <div />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
