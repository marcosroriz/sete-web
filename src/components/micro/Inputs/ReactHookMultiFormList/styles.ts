import styled, { css } from "styled-components";

type FieldsetProps = {
    isHorizontal?: boolean;
    isHorizontalMedia?: string;
    fieldsHorizontal?: boolean;
    fieldsHorizontalMedia?: string;
};

export const Fieldset = styled.fieldset<FieldsetProps>`
    border: none;

    ${({ isHorizontal, isHorizontalMedia }) =>
        isHorizontal
            ? css`
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  .form-list-legend {
                      display: inline-block;
                      margin-bottom: 10px;
                      margin-right: 15px;
                  }
                  ${isHorizontalMedia &&
                  `
                      @media ${isHorizontalMedia} {
                          display: block;
                          .form-list-legend {
                              margin-right: 0px;
                              margin-bottom: 10px;
                          }
                      }
                  `}
              `
            : css`
                  display: block;
                  .form-list-legend {
                      margin-bottom: 10px;
                  }
              `}

    .form-list-legend {
        display: inline-block;

        width: auto;

        font-weight: 500;
        font-size: 14px;
        color: var(--color-grey-500);
    }
    .form-list-container {
        .form-list {
            flex: 1;
            ${({ fieldsHorizontal, fieldsHorizontalMedia }) =>
                fieldsHorizontal
                    ? css`
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                          ${fieldsHorizontalMedia &&
                          `
                                @media ${fieldsHorizontalMedia} {
                                    display: block;
                                }
                          `}
                      `
                    : css`
                          display: block;
                      `}
        }
        .form-list-error {
            width: 100%;
            display: block;

            height: 10px;

            color: var(--color-red-500);
            font-size: 12px;
            font-family: var(--font-tertiary);
        }
    }
`;
