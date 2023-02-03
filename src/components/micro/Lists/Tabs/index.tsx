import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Col, Nav, Row, Tab, Tabs } from "react-bootstrap";

import { InfoListItemProps } from "../InfoListItem";

import { Container, NavItem } from "./styles";

const RelatorioTabs: React.FC = ({ children }) => {
    const childrenArr = React.Children.toArray(children) as React.ReactElement<InfoListItemProps>[];
    return (
        <>
            {/* {childrenArr.map((child) =>
                React.cloneElement(child, {}, <FaInfoCircle className="info-list__decorator" color="#ecac2e" key="info-circle" />, child.props.children),
            )} */}
            <Tab.Container defaultActiveKey="first">
                <Row>
                    <Col sm={4}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <NavItem eventKey="first">Tab 1</NavItem>
                            </Nav.Item>
                            <Nav.Item>
                                <NavItem eventKey="second">Tab 2</NavItem>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">First</Tab.Pane>
                            <Tab.Pane eventKey="second">Second</Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
};

export default RelatorioTabs;
