import styled from "styled-components";

export const Container = styled.ul`
    & > li + li {
        margin-top: 5px;
    }

    .info-list__decorator {
        margin-right: 10px;
        margin-left: 0px;
    }
`;
