import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/fornecedores/Cadastrar";
import Gerenciar from "pages/modules/fornecedores/Gerenciar";

export default [
    <AuthRoute path="/fornecedores/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/fornecedores/gerenciar" component={Gerenciar} permission="reader" key="gerenciar" isPrivate exact />,
];
