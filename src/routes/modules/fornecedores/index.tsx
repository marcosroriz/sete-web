import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/fornecedores/Cadastrar";
import Gerenciar from "pages/modules/fornecedores/Gerenciar";
import Visualizar from "pages/modules/fornecedores/Visualizar";

export default [
    <AuthRoute path="/fornecedores/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/fornecedores/gerenciar" component={Gerenciar} permission="reader" key="gerenciar" isPrivate exact />,
    <AuthRoute path="/fornecedores/gerenciar/editar/:id" component={Cadastrar} permission="reader" key="gerenciar/editar/:id" isPrivate exact />,
    <AuthRoute path="/fornecedores/gerenciar/visualizar/:id" component={Visualizar} permission="reader" key="gerenciar/visualizar/:id" isPrivate exact />,
];
