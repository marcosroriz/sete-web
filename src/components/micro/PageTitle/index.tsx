import React from "react";

import { Container } from "./styles";

type PageTitleProps = {
    message: string;
    icon: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ message, icon }) => {
    return (
        <Container>
            <div className="page-title-img">
                <img src={icon} alt="" aria-hidden="true" />
            </div>
            <h1 className="page-title-text">{message}</h1>
        </Container>
    );
};

export default PageTitle;
