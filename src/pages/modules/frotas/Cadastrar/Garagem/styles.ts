import styled from "styled-components";

export const mediaQuery = {
    desktop: "(max-width: 1000px)",

    mobile: "(max-width: 525px)",
};

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }
`;

export const ButtonsContainer = styled.div`
    width: 100%;

    button {
        display: block;

        width: 120px;

        margin-left: auto;
    }
`;
