import React from "react";

import { Container } from "./styles";

type InfoListItemProps = {
    children?: React.ReactNode;
};

const InfoListItem: React.FC<InfoListItemProps> = ({ children }) => {
    return (
        <Container>
            <div className="info-list-item__separator">
                <span className="info-list-item__separator__text">1</span>
            </div>
            <div className="info-list-item__content">
                <p className="info-list-item__title">Entre no sistema Educacenso</p>
                <span className="info-list-item__description">Entre no sistema através do seguinte site:</span>
                <div className="info-list-item__info">{children}</div>
            </div>
        </Container>
    );
};

export default InfoListItem;
