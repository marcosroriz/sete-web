import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "routes";

import { AuthProvider } from "contexts/Auth";

import { AlertModalStyles } from "hooks/AlertModal";
import GlobalStyles from "styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/light-bootstrap-dashboard-react.min.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <AlertModalStyles />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
