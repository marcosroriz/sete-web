import styled from "styled-components";

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }
    & > div:last-child {
        margin-top: 20px;
    }
`;
