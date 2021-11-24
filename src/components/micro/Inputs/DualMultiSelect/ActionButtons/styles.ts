import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    height: 100%;

    .multi-select__button + .multi-select__button {
        margin-top: 10px;
    }

    .multi-select__button {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 10px 26px;

        color: #797979;

        background-color: var(--color-white);
        border: 1px solid #888888;
        border-radius: 5px;

        transition: all 0.1s linear;

        &:hover {
            background-color: #797979;
            color: var(--color-white);
        }
    }
`;
