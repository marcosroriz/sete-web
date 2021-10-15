import styled from "styled-components";

export const mediaQuery = {
    mobile: "(max-width: 525px)",
};

export const Form = styled.form`
    width: 100%;
    padding: 0px 20px 20px 20px;
    p {
        line-height: 25px;
        color: #868e96;
        margin: 0px 0px 15px 0px;
        &.city-divider {
            margin-top: 6px;
        }
    }
    label {
        width: 143px;
        text-align: right;
    }
    @media ${mediaQuery.mobile} {
        padding: 0px 0px;
        label {
            width: auto;
            text-align: left;
        }
    }
`;

export const InputsContainer = styled.div`
    max-width: 500px;
    width: 100%;
    margin: 16px auto 0px auto;

    .submit-container {
        width: 100%;
        margin-top: 35px;
        button {
            display: block;

            width: 270px;
            margin: 0 auto;
            padding: 4px 16px;
        }
    }

    & > div + div {
        margin-top: 10px;
    }
`;
