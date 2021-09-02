import React from "react";
import { Switch } from "react-router-dom";

import DashboardRoutes from "./dashboard";
import SignRoutes from "./sign";
import MotoristasRoutes from "./modules/motoristas";
import FrotasRoutes from "./modules/frotas";

const Routes: React.FC = () => {
    return (
        <Switch>
            {SignRoutes}
            {DashboardRoutes}
            {MotoristasRoutes}
            {FrotasRoutes}
        </Switch>
    );
};

export default Routes;
