import styled from "styled-components";

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin-bottom: 26px;

    .page-title-img {
        img {
            max-height: 50px;
            user-select: none;
            image-rendering: initial;
            -webkit-user-drag: none;
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
