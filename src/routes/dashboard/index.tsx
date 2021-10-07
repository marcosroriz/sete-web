import React from "react";

import Home from "pages/dashboard/Home";
import Perfil from "pages/dashboard/Perfil";
import Usuarios from "pages/dashboard/Usuarios";

import AuthRoute from "routes/AuthRoute";

export default [
    <AuthRoute path="/" component={Home} permission="reader" isPrivate exact key="home" />,
    <AuthRoute path="/perfil" component={Perfil} permission="reader" isPrivate exact key="perfil" />,
    <AuthRoute path="/usuarios" component={Usuarios} permission="reader" isPrivate exact key="usuarios" />,
];
