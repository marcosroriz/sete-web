import React from "react";

import { Container } from "./styles";

type BlockTitleProps = {
    message: string;
    containerClassName?: string;
};

const BlockTitle: React.FC<BlockTitleProps> = ({ message, containerClassName }) => {
    return <Container className={containerClassName || ""}>{message}</Container>;
};

export default BlockTitle;
