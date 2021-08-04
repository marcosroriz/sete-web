import styled, { css } from "styled-components";

type ContainerProps = {
    labelOnLeft?: boolean;
};

export const Container = styled.div<ContainerProps>`
    width: 100%;
    ${({ labelOnLeft }) =>
        labelOnLeft
            ? css`
                  display: flex;
                  align-items: center;
                  label {
                      margin-bottom: 15px;
                      margin-right: 15px;
                  }
              `
            : css`
                  label {
                      margin-bottom: 7px;
                  }
              `}
    label {
        font-weight: 500;
        font-size: 14px;
        color: var(--color-grey);
    }
`;

type InputFieldProps = {
    isInvalid?: boolean;
    isTouched?: boolean;
};

export const InputField = styled.div<InputFieldProps>`
    width: 100%;
    input {
        width: 100%;
        display: block;
        font-size: 14px;
        color: var(--color-black);
        ${({ isInvalid }) =>
            isInvalid &&
            css`
                border-color: var(--color-red);
                color: var(--color-red);
            `}

        &:hover {
        }

        transition: all 0.1s linear;

        &:focus {
            ${({ isInvalid, isTouched }) =>
                !isTouched
                    ? css`
                          /* border-color: #86b7fe;
                          box-shadow: 0 0 0 0.15rem rgb(13 110 253 / 25%); */
                          border-color: #ced4da;
                          border-bottom-color: #aaaaaa;
                          box-shadow: none;
                      `
                    : isInvalid
                    ? css`
                          box-shadow: 0 0 0 0.15rem rgb(251 64 75 / 25%);
                          border-color: var(--color-red);
                          color: var(--color-red);
                      `
                    : css`
                          color: var(--color-green);
                          border-color: #ced4da;
                          border-bottom-color: #87cb16;
                          box-shadow: none;
                      `}
            background-color: var(--color-white);
            outline: 0;
        }
    }
    span {
        width: 100%;
        display: block;

        margin-top: 5px;
        height: 10px;

        color: var(--color-red);
        font-size: 12px;
        font-family: var(--font-tertiary);
    }
`;
