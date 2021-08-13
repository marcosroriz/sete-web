import React from "react";
import { useFormContext } from "react-hook-form";

import { Container } from "./styles";

type ReactHookFormItemCardProps = {
    name: string;
    required?: boolean;
    containerClassName?: string;
};

const ReactHookFormItemCard: React.FC<ReactHookFormItemCardProps> = ({ required, name, containerClassName, children }) => {
    const {
        formState: { errors, touchedFields },
    } = useFormContext();
    return (
        <Container isRequired={required} isInvalid={touchedFields[name] && !!errors[name]} className={containerClassName ? containerClassName : ""}>
            <div className="form-item-label">
                <span>{required ? "OBRIGATÓRIO" : "OPTATIVO"}</span>
            </div>
            <div className="form-item-content">{children}</div>
        </Container>
    );
};

export default ReactHookFormItemCard;
