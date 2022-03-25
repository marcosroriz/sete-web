import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div + div {
        margin-left: 15px;
    }

    .multi-select__select-container {
        flex: 0 0 40%;
        width: 100%;
        max-width: 40%;
    }

    .multi-select__action-container {
        flex: 0 0 10%;
        width: 100%;
        max-width: 10%;
    }
`;
