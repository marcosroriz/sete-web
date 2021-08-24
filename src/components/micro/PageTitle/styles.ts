import styled from "styled-components";

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin-bottom: 26px;

    .page-title-img {
        max-width: 50px;
        width: 100%;

        img {
            image-rendering: initial;
            width: 100%;
        }
    }
    .page-title-text {
        margin-left: 20px;

        font-size: 32px;
        line-height: 32px;
        font-variant: small-caps;
        font-weight: 500;
        font-family: var(--font-primary);
    }
`;
