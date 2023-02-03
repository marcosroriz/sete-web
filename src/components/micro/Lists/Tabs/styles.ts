import styled from "styled-components";
import { Col, Nav, Row, Tab, Tabs } from "react-bootstrap";

export const Container = styled.ul`
    & > li + li {
        margin-top: 5px;
    }
`;

export const NavItem = styled(Nav.Link)`
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: #495057;
    font-size: 14px;

    .active {
        background-color: #1bafce;
        color: #fff;
        font-weight: 600;
    }
`;
