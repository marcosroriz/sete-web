import React from "react";
import { useFormContext } from "react-hook-form";

import { Container } from "./styles";

type ReactHookFormItemCardProps = {
    name?: string;
    required?: boolean;
    placeItems?: "left" | "center";
    containerClassName?: string;
};

const ReactHookFormItemCard: React.FC<ReactHookFormItemCardProps> = ({ required, name, placeItems = "center", containerClassName, children }) => {
    const firstChild = React.Children.only(children) as React.ReactElement<{ name: string }>;
    const {
        formState: { errors },
    } = useFormContext();
    return (
        <Container
            isRequired={required}
            isInvalid={!!errors[name || firstChild.props.name]}
            placeItems={placeItems}
            className={containerClassName ? containerClassName : ""}
            hasOnlyChild={true}
        >
            <div className="form-item-label">
                <span>{required ? "OBRIGATÓRIO" : "OPTATIVO"}</span>
            </div>
            <div className="form-item-content">{children}</div>
        </Container>
    );
};

export default ReactHookFormItemCard;
