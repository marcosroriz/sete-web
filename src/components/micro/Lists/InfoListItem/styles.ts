import styled from "styled-components";

export const Container = styled.li`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #538ca9;
    font-size: 12px;

    & > svg {
        margin-right: 5px;
        margin-left: 5px;
    }

    & > span {
        padding: 1px 4px;
        margin-right: 3px;
        margin-left: 3px;
        color: var(--color-white);
        background-color: #538ca9;
        border-radius: 3px;
    }
`;
