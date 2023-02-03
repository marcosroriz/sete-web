import styled from "styled-components";

export const Container = styled.ul`
    & > li + li {
        margin-top: 5px;
    }
`;
