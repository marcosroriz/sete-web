import React from "react";

import AuthRoute from "routes/AuthRoute";

import Gerenciar from "pages/modules/escolas/Gerenciar";

export default [<AuthRoute path="/escolas/gerenciar/" component={Gerenciar} permission="reader" key="gerenciar" isPrivate exact />];
