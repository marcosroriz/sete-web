import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { VeiculosService } from "services/Veiculos";
import { VeiculoTableField, VeiculoListObj } from "entities/Veiculo";
import { frotasTableHelper } from "helpers/Tables/FrotasTableHelper";

import { COLUMNS } from "./columns";

type FrotasTableContextProps = {
    tableData: VeiculoTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type FrotasTableProviderProps = {
    children: React.ReactNode;
};

const FrotasTableContext = React.createContext({} as FrotasTableContextProps);

const FrotasTableProvider = ({ children }: FrotasTableProviderProps) => {
    const { createModalAsync } = useAlertModal();
    const { errorHandler } = useError();

    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<VeiculoTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleDeleteVeiculo = async (veiculo: VeiculoListObj) => {
        try {
            const alertResponse = await createModalAsync("warning", {
                title: "Atenção!",
                html: `Deseja remover o Veículo:<br /> <b>${veiculo.placa}</b>?`,
                confirmButtonText: "Remover",
                confirmButtonColor: "var(--color-red-500)",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: "var(--color-grey-650)",
                reverseButtons: true,
            });
            if (!alertResponse.isConfirmed) {
                return;
            }

            const veiculosService = new VeiculosService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await veiculosService.deleteVeiculo(veiculo.id_veiculo, codigo_cidade);
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Escola" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const veiculoService = new VeiculosService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const data = await veiculoService.listVeiculos(codigo_cidade);
            const treatedData = frotasTableHelper.treatData(data.data, { delete: handleDeleteVeiculo });
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    return <FrotasTableContext.Provider value={{ tableData, columns }}>{children}</FrotasTableContext.Provider>;
};

const useFrotasTable = () => {
    const context = React.useContext(FrotasTableContext);
    if (!context) {
        throw new Error("useFrotasTable deve ser usado entre um provider");
    }
    return context;
};

export { FrotasTableContext, FrotasTableProvider, useFrotasTable };
