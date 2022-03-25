import styled from "styled-components";

type ContainerProps = {
    thinBorder?: boolean;
};

export const Container = styled.div<ContainerProps>`
    .multi-select__box {
        width: 100%;
        min-height: 300px;
        height: 100%;

        display: block;
        z-index: 20;

        width: 100%;
        height: auto;
        padding: 0.375rem 0.75rem;

        font-size: 14px;
        ${({ thinBorder }) => (thinBorder ? "&, &:focus { border-width: 1px; }" : "&, &:focus { border-width: 2px; }")}
        transition: all 0.1s linear;

        background-color: var(--color-white);

        &:focus {
            border-color: #ced4da;
            border-bottom-color: #aaaaaa;
            box-shadow: none;
        }
    }
`;
