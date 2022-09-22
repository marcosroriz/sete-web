import styled from "styled-components";

export const Container = styled.ul`
    width: 75%;
    margin: 0 auto;
    & > li + li {
        margin-top: 20px;
    }
`;
