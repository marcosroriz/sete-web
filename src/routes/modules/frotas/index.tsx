import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastro from "pages/modules/frotas/Cadastro";

export default [<AuthRoute path="/frotas/cadastrar" component={Cadastro} permission="reader" key="cadastrar" isPrivate exact />];
