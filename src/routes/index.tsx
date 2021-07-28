import React from "react";
import { Switch, Route } from "react-router-dom";

import Autenticacao from "pages/sign/Autenticacao";
import TesteFormNav from "pages/sign/TesteFormNav";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component={Autenticacao} path="/" exact />
            <Route component={TesteFormNav} path="/form" exact />
        </Switch>
    );
};

export default Routes;
