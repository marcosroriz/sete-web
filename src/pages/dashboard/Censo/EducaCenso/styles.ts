import styled from "styled-components";

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }
    & > div:last-child {
        margin-top: 20px;
    }
    .info-title {
        width: 65%;
        margin: 0 auto;
    }
`;
