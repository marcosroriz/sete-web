import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/monitores/Cadastrar";
//import Gerenciar from "pages/modules/motoristas/Gerenciar";
//import Visualizar from "pages/modules/motoristas/Visualizar";

export default [
    <AuthRoute path="/monitores/cadastrar" key="cadastrar" component={Cadastrar} permission="reader" isPrivate exact />,
    //<AuthRoute path="/motoristas/gerenciar" key="gerenciar" component={Gerenciar} permission="reader" isPrivate exact />,
    //<AuthRoute path="/motoristas/gerenciar/visualizar/:id" key="visualizar" component={Visualizar} permission="reader" isPrivate exact />,
];
