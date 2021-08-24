import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastro from "pages/modules/motoristas/Cadastro";

export default [<AuthRoute path="/motoristas/cadastrar" key="cadastrar" component={Cadastro} permission="reader" isPrivate exact />];
