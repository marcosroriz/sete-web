import styled from "styled-components";

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }
    & > div:last-child {
        margin-top: 20px;
    }
    & > ul {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .selected-error-message {
        width: 100%;
        margin-top: 10px;
        display: block;

        height: 10px;
        text-align: right;

        color: var(--color-red-500);
        font-size: 14px;
        font-family: var(--font-tertiary);
    }
`;
