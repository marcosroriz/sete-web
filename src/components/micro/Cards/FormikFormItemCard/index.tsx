import React from "react";
import { useField } from "formik";

import { Container } from "./styles";

type FormikFormItemCardProps = {
    name: string;
    required?: boolean;
    containerClassName?: string;
};

const FormikFormItemCard: React.FC<FormikFormItemCardProps> = ({ required, name, containerClassName, children }) => {
    const [, meta] = useField(name);
    return (
        <Container isRequired={required} isInvalid={meta.touched && !!meta.error} className={containerClassName ? containerClassName : ""}>
            <div className="form-item-label">
                <span>{required ? "OBRIGATÓRIO" : "OPTATIVO"}</span>
            </div>
            <div className="form-item-content">{children}</div>
        </Container>
    );
};

export default FormikFormItemCard;
