import styled from "styled-components";

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }
`;
export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    button {
        display: block;
    }
`;
