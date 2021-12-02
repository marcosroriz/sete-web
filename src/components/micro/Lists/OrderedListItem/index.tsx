import React from "react";

import { Container } from "./styles";

type InfoListItemProps = {
    children?: React.ReactNode;
    listPosition?: string;
    title?: string;
    description?: string;
};

const InfoListItem: React.FC<InfoListItemProps> = ({ children, listPosition, title, description }) => {
    return (
        <Container>
            <div className="info-list-item__separator" aria-hidden="true">
                <span className="info-list-item__separator__text">{listPosition || 1}</span>
            </div>
            <div className="info-list-item__content">
                <h3 className="info-list-item__title">{title}</h3>
                <span className="info-list-item__description">{description}</span>
                <div className="info-list-item__info">{children}</div>
            </div>
        </Container>
    );
};

export default InfoListItem;
