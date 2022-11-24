import React from "react";

import Home from "pages/dashboard/Home";
import Perfil from "pages/dashboard/Perfil";
import Usuarios from "pages/dashboard/Usuarios";
import Censo from "pages/dashboard/Censo";
import PdfTest from "pages/dashboard/PdfTest";
import Cadastrar from "pages/dashboard/Usuarios/Cadastrar";

import AuthRoute from "routes/AuthRoute";

export default [
    <AuthRoute path="/" component={Home} permission="reader" isPrivate exact key="home" />,
    <AuthRoute path="/perfil" component={Perfil} permission="reader" isPrivate exact key="perfil" />,
    <AuthRoute path="/usuarios" component={Usuarios} permission="reader" isPrivate exact key="usuarios" />,
    <AuthRoute path="/usuarios/editar/:id" component={Cadastrar} permission="reader" key="editar/:id" isPrivate exact />,
    <AuthRoute path="/censo" component={Censo} permission="reader" isPrivate exact key="censo" />,
    <AuthRoute path="/pdf" component={PdfTest} permission="reader" isPrivate exact key="pdf" />,
];
