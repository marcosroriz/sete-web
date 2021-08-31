import React from "react";
import { Switch } from "react-router-dom";

import DashboardRoutes from "./dashboard";
import SignRoutes from "./sign";
import MotoristasRoutes from "./modules/motoristas";

const Routes: React.FC = () => {
    return (
        <Switch>
            {SignRoutes}
            {DashboardRoutes}
            {MotoristasRoutes}
        </Switch>
    );
};

export default Routes;
