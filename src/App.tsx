import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "routes";

import { AuthProvider } from "contexts/Auth";

import GlobalStyles from "styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/light-bootstrap-dashboard-react.min.css";
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
