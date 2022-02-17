import React from "react";

import { Fornecedor } from "entities/Fornecedor";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type FornecedorData = [Fornecedor | null, React.Dispatch<React.SetStateAction<Fornecedor | null>>];

const FichaFornecedor: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [fornecedorData] = aditionalData?.fornecedorData;
    const [tableData, setTableData] = React.useState<any>(null);

    React.useEffect(() => {
        if (fornecedorData) {
            const data = {
                "Nome do Fornecedor": fornecedorData.nome,
                CNPJ: fornecedorData.cnpj,
                "Serviços oferecidos": [
                    fornecedorData.ramo_mecanica === "S" ? "Mecânica (reparo e revisão)" : "",
                    fornecedorData.ramo_combustivel === "S" ? "Combustível e óleo" : "",
                    fornecedorData.ramo_seguro === "S" ? "Seguro" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),

                "Endereço do fornecedor": fornecedorData.loc_endereco,
                CEP: fornecedorData.loc_cep,
                "Telefone de contato": fornecedorData.telefone,
                Localização: fornecedorData.loc_longitude ? `${fornecedorData.loc_latitude || ""}, ${fornecedorData.loc_longitude || ""}` : "",
            };
            setTableData(data);
        }
    }, [fornecedorData]);
    return <RecordTable title={fornecedorData?.nome || ""} data={tableData} />;
};

export default FichaFornecedor;
