import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/normas/Cadastrar";

export default [<AuthRoute path="/normas/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />];
