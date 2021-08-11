import styled, { css } from "styled-components";

type ContainerProps = {
    isHorizontal?: boolean;
    horizontalMedia?: string;
};

export const Container = styled.div<ContainerProps>`
    width: 100%;
    ${({ isHorizontal, horizontalMedia }) =>
        isHorizontal
            ? css`
                  display: flex;
                  align-items: center;
                  label {
                      display: inline-block;
                      margin-bottom: 15px;
                      margin-right: 15px;
                  }
                  ${horizontalMedia &&
                  `
                      @media ${horizontalMedia} {
                          display: block;
                          label {
                              margin-bottom: 7px;
                          }
                      }
                  `}
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
    thinBorder?: boolean;
};

export const InputField = styled.div<InputFieldProps>`
    flex: 1;
    position: relative;
    .form-control {
        display: block;

        width: 100%;
        height: auto;
        padding: 0.375rem 2.25rem 0.375rem 0.75rem;

        font-size: 14px;
        ${({ isInvalid }) => (isInvalid ? "border-color: var(--color-red); color: var(--color-red);" : "color: var(--color-black);")}
        ${({ thinBorder }) => (thinBorder ? "border-width: 1px;" : "border-width: 2px;")}
        transition: all 0.1s linear;

        &:focus {
            ${({ isInvalid, isTouched }) =>
                !isTouched
                    ? css`
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

        &:focus ~ .form-toggle > svg {
            ${({ isInvalid, isTouched }) => (!isTouched ? "color: #ced4da;" : isInvalid ? "color: var(--color-red);" : "color: var(--color-green);")}
        }
        &::placeholder {
            color: rgba(65, 69, 80, 0.4);
            font-weight: 500;
        }
    }
    .form-error {
        width: 100%;
        display: block;

        margin-top: 5px;
        height: 10px;

        color: var(--color-red);
        font-size: 12px;
        font-family: var(--font-tertiary);
    }
    .form-toggle {
        position: absolute;
        right: 10px;
        top: 9px;
        width: 18px;

        cursor: pointer;
        user-select: none;
        svg {
            ${({ isInvalid }) => (isInvalid ? "color: var(--color-red);" : "color: var(--color-black);")}
            width: 100%;
            height: 100%;
        }
    }
`;
