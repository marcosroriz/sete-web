import styled from "styled-components";
import { Form as FormikForm } from "formik";

export const mediaQuery = {
    mobile: "(max-width: 525px)",
};

export const Container = styled.div`
    max-width: 500px;
    width: 100%;
    margin: 16px auto 0px auto;

    & > div + div {
        margin-top: 7px;
    }
`;

export const Form = styled(FormikForm)`
    width: 100%;
    padding: 0px 20px;
    p {
        line-height: 25px;
        color: #868e96;
    }
    label {
        width: 123px;
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
