import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "routes";

import { AuthProvider } from "contexts/Auth";
import { SidebarAccordionProvider } from "contexts/SidebarAccordion";
import { AlertModalStyles } from "hooks/AlertModal";

import GlobalStyles from "styles/global";
import "styles/light-bootstrap-dashboard-react.min.css";
import "styles/ol-popup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@sweetalert2/theme-bootstrap-4";
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";

import $ from "jquery";
(window as any).$ = $;
(window as any).jQuery = $;

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <AlertModalStyles />
            <AuthProvider>
                <SidebarAccordionProvider>
                    <Routes />
                </SidebarAccordionProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
