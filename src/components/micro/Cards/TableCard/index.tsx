/**
 * Card que fica em volta dos componentes de tabela do SETE.
 */

import React from "react";

import { Container } from "./styles";

const TableCard: React.FC = ({ children }) => {
    return <Container>{children}</Container>;
};

export default TableCard;
