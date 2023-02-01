import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAuth } from "contexts/Auth";
import { authRouteHelper } from "helpers/AuthRouteHelper";
import { Permission } from "entities/Permission";

import SidebarLayout from "components/macro/SidebarLayout";
import SignLayout from "components/macro/SignLayout";

interface AuthRouteProps extends RouteProps {
    isPrivate?: boolean;
    permission?: Permission;
    component: React.ComponentType<{}>;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ permission = "reader", isPrivate = false, component: Component, ...rest }) => {
    const { isAuthenticated, user } = useAuth();
    const LayoutComponent = isPrivate ? SidebarLayout : SignLayout;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                true ? ( // isPrivate === isAuthenticated && authRouteHelper.checkPermission(permission, user?.tipo_permissao as Permission)
                    <LayoutComponent>
                        <Component />
                    </LayoutComponent>
                ) : (
                    <Redirect to={{ pathname: authRouteHelper.renderPathname(isPrivate, location), state: { from: location } }} />
                )
            }
        />
    );
};

export default AuthRoute;
