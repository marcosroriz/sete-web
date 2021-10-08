import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/fornecedores/Cadastrar";
import Editar from "pages/modules/fornecedores/Editar";

export default [
    <AuthRoute path="/fornecedores/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/fornecedores/gerenciar/editar/:id" component={Editar} permission="reader" key="gerenciar/editar/:id" isPrivate exact />,
];
