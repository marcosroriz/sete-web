import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "routes";
import GlobalStyles from "styles/global";
import SignLayout from "components/macro/SignLayout";

import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <SignLayout>
                <Routes />
            </SignLayout>
        </BrowserRouter>
    );
};

export default App;
