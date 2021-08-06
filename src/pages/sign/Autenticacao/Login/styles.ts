import styled from "styled-components";
import { Form as FormikForm } from "formik";

export const mediaQuery = {
    mobile: "(max-width: 525px)",
};

export const Container = styled.div`
    max-width: 500px;
    width: 100%;
    margin: 30px auto 20px auto;
`;

export const Form = styled(FormikForm)`
    width: 100%;
    padding: 0px 20px;
    p {
        line-height: 25px;
        color: #868e96;
        a {
            color: #ffa534;
            text-decoration: none;
            :hover {
                color: #d39e00;
            }
        }
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
    .inputContainer {
        margin: 8px 0px;
    }

    .submitContainer {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        label {
            align-self: center;
            font-weight: 500;
            font-size: 14px;
            color: #868e96;

            .checkbox {
                margin-right: 5px;
            }
        }

        button {
            color: white;
            padding: 13px 45px;
            font-size: 14px;
            margin-left: 48px;
            border-radius: 6px;
            background-color: #ffa534;
            border: none;
            :hover {
                background-color: #ff8c00;
            }
        }
    }
`;
