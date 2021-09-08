import React from "react";

import { Container } from "./styles";

type ButtonsContainerProps = {
    position?: "center" | "left" | "right" | "evenly";
    spacing?: string;
    containerClassName?: string;
};

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children, containerClassName, spacing = "20px", position = "right" }) => {
    return (
        <Container className={containerClassName || ""} position={position} spacing={spacing}>
            {children}
        </Container>
    );
};

export default ButtonsContainer;
