import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "routes";

import GlobalStyles from "styles/global";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/light-bootstrap-dashboard-react.min.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Routes />
        </BrowserRouter>
    );
};

export default App;
