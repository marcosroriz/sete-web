import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/monitores/Cadastrar";
import Gerenciar from "pages/modules/monitores/Gerenciar";
import Visualizar from "pages/modules/monitores/Visualizar";

export default [
    <AuthRoute path="/monitores/cadastrar" key="cadastrar" component={Cadastrar} permission="reader" isPrivate exact />,
    <AuthRoute path="/monitores/gerenciar/" key="gerenciar/gerenciar" component={Gerenciar} permission="reader" isPrivate exact />,
    <AuthRoute path="/monitores/gerenciar/editar/:id" key="visualizar" component={Cadastrar} permission="reader" isPrivate exact />,
    <AuthRoute path="/monitores/gerenciar/visualizar/:id" key="gerenciar/visualizar/:id" component={Visualizar} permission="reader" isPrivate exact />,
];
