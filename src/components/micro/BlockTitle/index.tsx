/**
 * Subtítulos de cada Tab do NavCard.
 */

import React from "react";

import { Container } from "./styles";

type BlockTitleProps = {
    message: React.ReactNode;
    containerClassName?: string;
};

const BlockTitle: React.FC<BlockTitleProps> = ({ message, containerClassName }) => {
    return <Container className={containerClassName || ""}>{message}</Container>;
};

export default BlockTitle;
