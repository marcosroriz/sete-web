import React from "react";
import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { FaSignInAlt } from "react-icons/fa";

import OpenLayers from "./OpenLayers";

const Usuarios: React.FC = () => {
    return (
        <NavCardProvider isDashboard={false}>
            <NavCardTab name="Login" icon={<FaSignInAlt />}>
                <OpenLayers />
            </NavCardTab>
        </NavCardProvider>
    );
};

export default Usuarios;
