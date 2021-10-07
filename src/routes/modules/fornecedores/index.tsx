import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastro from "pages/modules/fornecedores/Cadastro";
import Edicao from "pages/modules/fornecedores/Edicao";

export default [
    <AuthRoute path="/fornecedores/cadastrar" component={Cadastro} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/fornecedores/gerenciar/:id" component={Edicao} permission="reader" key="gerenciar/:id" isPrivate exact />,
];
