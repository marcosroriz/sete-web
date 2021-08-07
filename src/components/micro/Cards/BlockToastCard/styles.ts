import styled, { css } from "styled-components";

const colorTypes = {
    warning: css`
        background-color: var(--color-dark-orange);
    `,
};

type ContainerProps = {
    type: string;
};

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 5px 10px 5px 10px;

    border-radius: 4px;

    .toast-text {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .text-icon {
            width: 30px;
            height: 30px;
            svg {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        span {
            display: block;
            margin-left: 20px;

            color: var(--color-white);
            font-size: 14px;
        }
    }

    .toast-button {
        width: 25px;
        height: 25px;
        padding: 0px;

        background-color: transparent;
        border: none;
        svg {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    ${({ type }) => colorTypes[type || "warning"]}
`;
