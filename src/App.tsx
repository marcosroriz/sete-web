import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

import Routes from "routes";

import { AuthProvider } from "contexts/Auth";
import { SidebarAccordionProvider } from "contexts/SidebarAccordion";
import { AlertModalStyles } from "hooks/AlertModal";

import GlobalStyles from "styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/light-bootstrap-dashboard-react.min.css";
import "@sweetalert2/theme-bootstrap-4";
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";

const Router = (process.env.REACT_APP_APP_ENV === "desktop" ? HashRouter : BrowserRouter) as unknown as React.ElementType;
const App: React.FC = () => {
    return (
        <Router>
            <GlobalStyles />
            <AlertModalStyles />
            <AuthProvider>
                <SidebarAccordionProvider>
                    <Routes />
                </SidebarAccordionProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
