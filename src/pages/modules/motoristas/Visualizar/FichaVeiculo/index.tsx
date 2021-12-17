import React from "react";

import { Motorista } from "entities/Motorista";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type MotoristaData = [Motorista | null, React.Dispatch<React.SetStateAction<Motorista | null>>];

const FichaVeiculo: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [motoristaData] = aditionalData?.motoristaData as MotoristaData;
    const [tableData, setTableData] = React.useState<any>(null);
    React.useEffect(() => {
        if (motoristaData) {
            const data = {
                Nome: motoristaData.nome,
                CPF: motoristaData.cpf,
                "Data de nascismento": motoristaData.data_nascimento,
                Sexo: motoristaData.sexo == 1 ? "Masculino" : motoristaData.sexo == 2 ? "Feminino" : "Não informado",
                Vínculo:
                    motoristaData.vinculo == 1
                        ? "Servidor efetivo"
                        : motoristaData.vinculo == 2
                        ? "Servidor comissionado"
                        : motoristaData.vinculo == 3
                        ? "Servidor tercerizado"
                        : "Outro",
                Salário: motoristaData.salario,
                CNH: motoristaData.cnh,
                "Tipos de CNH": [
                    motoristaData.tem_cnh_a === "S" ? "A" : "",
                    motoristaData.tem_cnh_b === "S" ? "B" : "",
                    motoristaData.tem_cnh_c === "S" ? "C" : "",
                    motoristaData.tem_cnh_d === "S" ? "D" : "",
                    motoristaData.tem_cnh_e === "S" ? "E" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                "Data de validade da CNH": motoristaData.data_validade_cnh,
                Turno: [
                    motoristaData.turno_manha === "S" ? "Manhã" : "",
                    motoristaData.turno_tarde === "S" ? "Tarde" : "",
                    motoristaData.turno_noite === "S" ? "Noite" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
                "Número do documento de antecedentes criminias": motoristaData.ant_criminais,
            };
            setTableData(data);
        }
    }, [motoristaData]);
    return <RecordTable title="MOTORISTA" data={tableData} />;
};

export default FichaVeiculo;
