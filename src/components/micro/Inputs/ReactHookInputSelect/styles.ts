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
        color: var(--color-grey-500);
    }
`;

type InputFieldProps = {
    isInvalid?: boolean;
    isTouched?: boolean;
    thinBorder?: boolean;
    isPlaceholder?: boolean;
};

export const InputField = styled.div<InputFieldProps>`
    flex: 1;
    .select .form-control__control {
        width: 100%;
        min-height: auto;
        height: 35px;

        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;

        ${({ isInvalid }) => !isInvalid && "border-color: #e3e3e3;"}
        ${({ isPlaceholder }) => isPlaceholder && ".form-control__single-value { color: rgba(65, 69, 80, 0.4); font-weight: 500; }"}
        ${({ thinBorder }) => (thinBorder ? "&, &:focus { border-width: 1px; }" : "&, &:focus { border-width: 2px; }")}
        box-shadow: none;
        transition: all 0.1s linear;

        .form-control__value-container {
            padding: 0px 8px;
        }

        &.form-control__control--is-focused {
            ${({ isInvalid, isTouched }) =>
                isInvalid
                    ? css`
                          box-shadow: 0 0 0 0.15rem rgb(251 64 75 / 25%);
                          border-color: var(--color-red-500);
                          color: var(--color-red-500);
                      `
                    : !isTouched
                    ? css`
                          border-color: #ced4da;
                          border-bottom-color: var(--color-green);
                          box-shadow: none;
                          .form-control__single-value {
                              color: var(--color-green);
                          }
                      `
                    : css`
                          border-color: #ced4da;
                          border-bottom-color: #aaaaaa;
                          box-shadow: none;
                      `}
            background-color: var(--color-white);
            outline: 0;
        }

        .form-control__indicator {
            padding: 0px 8px;
        }
    }
    .form-error {
        width: 100%;
        display: block;

        margin-top: 5px;
        height: 10px;

        color: var(--color-red-500);
        font-size: 12px;
        font-family: var(--font-tertiary);
    }
`;
