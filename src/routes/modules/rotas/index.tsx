import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/rotas/Cadastrar";
import Importar from "pages/modules/rotas/Importar";
import Gerenciar from "pages/modules/rotas/Gerenciar";
import Visualizar from "pages/modules/rotas/Visualizar";
import MalhaViaria from "pages/modules/rotas/MalhaViaria";
import Sugerir from "pages/modules/rotas/Sugerir";

export default [
    <AuthRoute path="/rotas/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/rotas/importar" component={Importar} permission="reader" key="importar" isPrivate exact />,
    <AuthRoute path="/rotas/gerenciar" component={Gerenciar} permission="reader" key="gerenciar/gerenciar" isPrivate exact />,
    <AuthRoute path="/rotas/gerenciar/visualizar/:id" component={Visualizar} permission="reader" key="gerenciar/visualizar/:id" isPrivate exact />,
    <AuthRoute path="/rotas/malha_viaria" component={MalhaViaria} permission="reader" key="gerenciar/visualizar/:id" isPrivate exact />,
    <AuthRoute path="/rotas/sugerir" component={Sugerir} permission="reader" key="gerenciar/visualizar/:id" isPrivate exact />,
];
