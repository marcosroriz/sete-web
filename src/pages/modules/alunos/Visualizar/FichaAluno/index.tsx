import React from "react";

import { Aluno } from "entities/Aluno";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const FichaAluno: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [alunoData] = aditionalData?.alunoData as AlunoData;
    const [tableData, setTableData] = React.useState<any>(null);

    React.useEffect(() => {
        if (alunoData) {
            const data = {
                "Nome do Aluno": alunoData.nome,
                "Data de nascimento": alunoData.data_nascimento,
                Sexo: alunoData.sexo,
                "Cor/Raça": alunoData.cor,
                CPF: alunoData.cpf,
                "Possui alguma deficiência": alunoData.def_caminhar,
                "Nome do responsável": alunoData.nome_responsavel,
                "Grau de parentesco": alunoData.grau_responsavel,
                "Endereço do Aluno": alunoData.loc_endereco,
                "CEP da residência": alunoData.loc_cep,
                "Dificuldade de Acesso": alunoData.mec_tp_localizacao,
                Localização: alunoData.loc_longitude ? `${alunoData.loc_latitude || ""}, ${alunoData.loc_longitude || ""}` : "",
                // Escola: alunoData,
                // "Contato da Escola": alunoData,
                // "Telefone de Contato": alunoData.ensino_fundamental,
                // ROTA: alunoData.ensino_fundamental,
            };
            setTableData(data);
        }
    }, [alunoData]);
    return <RecordTable title={alunoData?.nome || ""} data={tableData} />;
};

export default FichaAluno;
