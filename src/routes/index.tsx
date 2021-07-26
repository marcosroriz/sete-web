import React from "react";
import { Switch, Route } from "react-router-dom";

import Autenticacao from "pages/sign/Autenticacao";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component={Autenticacao} path="/" />
        </Switch>
    );
};

export default Routes;
