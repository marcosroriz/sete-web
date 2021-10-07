import React, { useMemo } from "react";
import TableComponent from "components/micro/Table/TableComponent";
import { getApiClient } from "services/apiClient";

import { COLUMNS } from "./columns";

type EscolasData = {
    nome: string;
    localizacao: string;
    gps: string;
    nivel: string;
    horario: string[];
    quantAlunos: number;
};

const Gerenciar: React.FC = () => {
    const [dataTable, setTableData] = React.useState<EscolasData[]>([]);
    const handleOpenModal = () => {
        console.log("Olá mundo");
    };
    React.useEffect(() => {
        const fetchData = async () => {
            const api = getApiClient();
            const response = await api({
                url: `/frotas/5201405`,
                method: "GET",
            });
            const data = (await response.data) as EscolasData[];

            const treatedData = data.map((escola) => {
                const actionData = {
                    handleOpenModal,
                };
                return {
                    ...escola,
                    actionData,
                };
            });
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    const columns = useMemo(() => COLUMNS, []);
    return <TableComponent columns={columns} name={"table"} data={dataTable} />;
};

export default Gerenciar;
