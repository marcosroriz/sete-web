import React from "react";
import { FaInfoCircle } from "react-icons/fa";

import { InfoListItemProps } from "../InfoListItem";

import { Container } from "./styles";

const InfoList: React.FC = ({ children }) => {
    const childrenArr = React.Children.toArray(children) as React.ReactElement<InfoListItemProps>[];
    return (
        <Container>
            {childrenArr.map((child) =>
                React.cloneElement(child, {}, <FaInfoCircle className="info-list__decorator" color="#ecac2e" key="info-circle" />, child.props.children),
            )}
        </Container>
    );
};

export default InfoList;
