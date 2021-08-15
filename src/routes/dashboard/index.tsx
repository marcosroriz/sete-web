import React from "react";

import Home from "pages/dashboard/Home";

import AuthRoute from "routes/AuthRoute";

export default [<AuthRoute path="/" component={Home} permission="reader" isPrivate exact key="dashboard" />];
