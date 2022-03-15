import styled from "styled-components";

export const mediaQuery = {
    desktop: "(max-width: 1000px)",
    mobile: "(max-width: 525px)",
};

export const Container = styled.div`
    .btn-group {
        width: 40%;
        margin-top: 25px;
        button.btn-fill {
            padding-top: 6px;
            padding-bottom: 6px;
            padding-left: 0;
            padding-right: 0;
        }
    }
`;
