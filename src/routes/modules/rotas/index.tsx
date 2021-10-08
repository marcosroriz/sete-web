import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/rotas/Cadastrar";
// import Edicao from "pages/modules/rotas/Edicao";

export default [
    <AuthRoute path="/rotas/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    // <AuthRoute path="/rotas/gerenciar/:id" component={Edicao} permission="reader" key="gerenciar/editar/:id" isPrivate exact />,
];
