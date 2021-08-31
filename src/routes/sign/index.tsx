import React from "react";

import AuthRoute from "routes/AuthRoute";

import Autenticacao from "pages/sign/Autenticacao";

export default [<AuthRoute path="/login" component={Autenticacao} exact key="login" />];
