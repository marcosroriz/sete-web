import React from "react";

import { Container } from "./styles";

export type InfoListItemProps = {
    children?: React.ReactNode;
};

const InfoListItem: React.FC<InfoListItemProps> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default InfoListItem;
