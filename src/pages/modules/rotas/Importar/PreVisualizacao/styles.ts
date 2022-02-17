import styled from "styled-components";

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }

    .map-container {
        width: 100%;
        height: 390px;
        margin: 8px auto 0px auto;
        border: 5px solid var(--color-grey-200);
    }
`;
