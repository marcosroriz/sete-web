import styled from "styled-components";

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }
    .dados-radio-field {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        & > div + div {
            margin-left: 50px;
        }
    }
`;
