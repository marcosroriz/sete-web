import styled from "styled-components";

export const mediaQuery = {
    desktop: "(max-width: 1000px)",
    mobile: "(max-width: 525px)",
    corHorizontal: "(max-width: 1200px)",
};

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
