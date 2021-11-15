/**
 * Título de cada página do SETE.
 */
import React from "react";

import { Container } from "./styles";

type PageTitleProps = {
    message: string;
    icon: string;
    iconRight?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ message, icon, iconRight }) => {
    return (
        <Container>
            <div className="page-title-img">
                <img src={icon} alt="" aria-hidden="true" />
            </div>
            <h1 className="page-title-text">{message}</h1>
            {iconRight && (
                <div className="page-title-img" style={{ marginLeft: "20px" }}>
                    <img src={iconRight} alt="" aria-hidden="true" />
                </div>
            )}
        </Container>
    );
};

export default PageTitle;
