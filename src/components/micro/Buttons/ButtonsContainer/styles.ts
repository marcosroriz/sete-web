import styled, { css } from "styled-components";

type ContainerProps = {
    position: "center" | "left" | "right" | "evenly";
    spacing: string;
};

const buttonPositionCss = {
    center: css`
        justify-content: center;
    `,
    left: css`
        justify-content: flex-start;
    `,
    right: css`
        justify-content: flex-end;
    `,
    evenly: css`
        justify-content: space-between;
        button + button {
            margin-left: 0px;
        }
    `,
};

export const Container = styled.div<ContainerProps>`
    width: 100%;
    display: flex;
    align-items: center;
    button + button {
        margin-left: ${({ spacing }) => spacing};
    }
    ${({ position }) => buttonPositionCss[position || "center"]}
`;
