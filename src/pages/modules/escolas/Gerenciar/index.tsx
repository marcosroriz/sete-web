import React, { useMemo } from "react";
import TableComponent from "components/micro/Table/TableComponent";
import { EscolaTableHelper } from "helpers/EscolaTableHelper";
import { getApiClient } from "services/apiClient";
import { Escola } from "entities/Escola";

import { COLUMNS } from "./columns";

const Gerenciar: React.FC = () => {
    const [dataTable, setTableData] = React.useState<{ [key: string]: any }[]>([]);
    const handleOpenModal = () => {
        console.log("Olá mundo");
    };
    React.useEffect(() => {
        const fetchData = async () => {
            const api = getApiClient();
            const response = await api({
                url: `/escolas/5201405`,
                method: "GET",
            });
            // const data = (await response.data) as Escola[];
            const escolaTableHelper = new EscolaTableHelper();
            const data = [
                {
                    nome: "Ufg",
                    localizacao: "Goiânia",
                    gps: "23123123",
                    nivel: "Superior",
                    horario: "Matutino",
                    quantAlunos: "50 mil",
                },
            ];
            const treatedData = escolaTableHelper.treatData(data, { handleOpenModal });
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    const columns = useMemo(() => COLUMNS, []);
    return <TableComponent columns={columns} name={"table"} data={dataTable} />;
};

export default Gerenciar;
