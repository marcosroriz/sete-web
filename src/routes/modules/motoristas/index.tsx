import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/motoristas/Cadastrar";

export default [<AuthRoute path="/motoristas/cadastrar" key="cadastrar" component={Cadastrar} permission="reader" isPrivate exact />];
