import React from "react";

import { Aluno } from "entities/Aluno";

import { useNavCard } from "contexts/NavCard";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import RecordTable from "components/micro/RecordTable";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const corMap = {
    0: "Não informada",
    1: "Amarelo",
    2: "Branco",
    3: "Indígena",
    4: "Pardo",
    5: "Preto",
};

const FichaAluno: React.FC = () => {
    const { aditionalData } = useReactHookNavCard();
    const [alunoData] = aditionalData?.alunoData;
    const [tableData, setTableData] = React.useState<any>(null);

    React.useEffect(() => {
        if (alunoData) {
            const data = {
                "Nome do Aluno": alunoData.nome,
                "Data de nascimento": alunoData.data_nascimento,
                Sexo: alunoData.sexo === 1 ? "Masculino" : alunoData.sexo === 2 ? "Feminino" : alunoData.sexo === 3 ? "Não informado" : null,
                "Cor/Raça": corMap[alunoData.cor],
                CPF: alunoData.cpf,
                "Possui alguma deficiência": [
                    alunoData.def_caminhar === "S" ? "Física" : "",
                    alunoData.def_ouvir === "S" ? "Auditiva" : "",
                    alunoData.def_enxergar === "S" ? "Visual" : "",
                    alunoData.def_mental === "S" ? "Mental" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                "Nome do responsável": alunoData.nome_responsavel,
                "Grau de parentesco":
                    alunoData.grau_responsavel == -1
                        ? "Não informado"
                        : alunoData.grau_responsavel == 0
                        ? "Pai, Mãe, Padrasto ou Madrasta"
                        : alunoData.grau_responsavel == 1
                        ? "Avô ou Avó"
                        : alunoData.grau_responsavel == 2
                        ? "Irmão ou Irmã"
                        : alunoData.grau_responsavel == 3
                        ? "Outro parente"
                        : null,
                "Telefonde do responsável": alunoData.telefone_responsavel,
                "Endereço do Aluno": alunoData.loc_endereco,
                "CEP da residência": alunoData.loc_cep,
                "Dificuldade de Acesso": [
                    alunoData.da_porteira === "S" ? "Porteira" : "",
                    alunoData.da_mataburro === "S" ? "Mataburro" : "",
                    alunoData.da_colchete === "S" ? "Colchete" : "",
                    alunoData.da_atoleiro === "S" ? "Atoleiro" : "",
                    alunoData.da_ponterustica === "S" ? "Ponte rústica" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                Localização: alunoData.loc_longitude ? `${alunoData.loc_latitude || ""}, ${alunoData.loc_longitude || ""}` : "",
                "Tipo de localização": alunoData.mec_tp_localizacao == 1 ? "Urbana" : alunoData.mec_tp_localizacao == 2 ? "Rural" : null,
                //Escola: alunoData.escola,
                // "Telefone de Contato": alunoData.ensino_fundamental,
                // ROTA: alunoData.ensino_fundamental,
            };
            setTableData(data);
        }
    }, [alunoData]);
    return <RecordTable title={alunoData?.nome || ""} data={tableData} />;
};

export default FichaAluno;
