import React from "react";
import { Switch, Route } from "react-router-dom";

import Autenticacao from "pages/sign/Autenticacao";
import TesteFormNav from "pages/sign/TesteFormNav";
import TesteReactHookFormNav from "pages/sign/TesteReactHookFormNav";
import Cadastro from "pages/modules/motoristas/Cadastro";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component={Autenticacao} path="/" exact />
            <Route component={TesteFormNav} path="/form" exact />
            <Route component={TesteReactHookFormNav} path="/hook" exact />
            <Route component={Cadastro} path="/motoristas/cadastro" exact />
        </Switch>
    );
};

export default Routes;
