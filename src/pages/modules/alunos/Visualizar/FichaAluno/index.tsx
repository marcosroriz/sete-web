import React from "react";

import { Aluno, GrauParentescoEnum, GrauParentescoLabel, SexoEnum, SexoLabel, CorEnum, CorLabel } from "entities/Aluno";

import { useNavCard } from "contexts/NavCard";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { Button } from "react-bootstrap";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import RecordTable from "components/micro/RecordTable";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const FichaAluno: React.FC = () => {
    const { aditionalData } = useReactHookNavCard();
    const [alunoData] = aditionalData?.alunoData as AlunoData;
    const [escolaData] = aditionalData?.escolaData as any;
    const [tableData, setTableData] = React.useState<any>(null);

    React.useEffect(() => {
        if (!!alunoData && !!escolaData) {
            const data = {
                "Nome do Aluno": alunoData.nome,
                "Data de nascimento": alunoData.data_nascimento,
                Sexo: SexoLabel.get((alunoData.sexo?.toString() || "3") as SexoEnum),
                "Cor/Raça": CorLabel.get((alunoData.cor?.toString() || "0") as CorEnum),
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
                "Grau de parentesco": GrauParentescoLabel.get((alunoData.grau_responsavel?.toString() || "-1") as GrauParentescoEnum),
                "Telefonde do responsável": alunoData.telefone_responsavel || "Telefone de contato não informado",
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

                Escola: escolaData.nome,
                "Contato da escola": escolaData.contato_responsavel,
                "Telefone de contato": escolaData.contato_telefone,
                //ROTA: alunoData.ensino_fundamental,
            };
            setTableData(data);
        }
    }, [alunoData, escolaData]);
    return <RecordTable title={alunoData?.nome || ""} data={tableData} />;
};

export default FichaAluno;
