import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import DashboardRoutes from "./dashboard";
import SignRoutes from "./sign";
import MotoristasRoutes from "./modules/motoristas";
import FrotasRoutes from "./modules/frotas";
import AlunosRoutes from "./modules/alunos";
import EscolasRoutes from "./modules/escolas";
import FornecedoresRoutes from "./modules/fornecedores";
import RotasRoutes from "./modules/rotas";
import MonitoresRoutes from "./modules/monitores";

const Routes: React.FC = () => {
    return (
        <Switch>
            {SignRoutes}
            {DashboardRoutes}
            {MotoristasRoutes}
            {FrotasRoutes}
            {AlunosRoutes}
            {EscolasRoutes}
            {FornecedoresRoutes}
            {RotasRoutes}
            {MonitoresRoutes}
            <Route render={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default Routes;
