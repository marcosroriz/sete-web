import styled from "styled-components";
import { Tooltip } from "react-bootstrap";

export const Container = styled.div`
    .map-title {
        font-weight: 600;
        font-size: 14px;
        color: #7b7b7b;
        user-select: none;
    }
    .map-container {
        width: 100%;
        height: 390px;
        margin: 8px auto 0px auto;
        border: 5px solid var(--color-grey-200);
    }
`;

export const OverlayContainer = styled.div`
    position: absolute;
    width: 360px;
    font-size: 15px;
    background: white;
    padding: 0px 12px;
    color: black;
    border-radius: 4px;
`;
