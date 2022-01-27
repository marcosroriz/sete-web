import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/motoristas/Cadastrar";
import Editar from "pages/modules/motoristas/Editar";
import Gerenciar from "pages/modules/motoristas/Gerenciar";
import Visualizar from "pages/modules/motoristas/Visualizar";

export default [
    <AuthRoute path="/motoristas/cadastrar" key="cadastrar" component={Cadastrar} permission="reader" isPrivate exact />,
    <AuthRoute path="/motoristas/gerenciar" key="gerenciar" component={Gerenciar} permission="reader" isPrivate exact />,
    <AuthRoute path="/motoristas/gerenciar/editar/:id" component={Editar} permission="reader" key="gerenciar/editar/:id" isPrivate exact />,
    <AuthRoute path="/motoristas/gerenciar/visualizar/:id" key="visualizar" component={Visualizar} permission="reader" isPrivate exact />,
];
