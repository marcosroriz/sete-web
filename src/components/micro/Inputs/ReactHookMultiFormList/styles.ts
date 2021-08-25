import styled, { css } from "styled-components";

type FieldsetProps = {
    formListSpacing?: string;
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
        flex: 1;
        .form-list {
            flex: 1;
            ${({ fieldsHorizontal, fieldsHorizontalMedia, formListSpacing }) =>
                fieldsHorizontal
                    ? css`
                          display: flex;
                          align-items: center;
                          ${formListSpacing === "evenly"
                              ? css`
                                    justify-content: space-between;
                                `
                              : css`
                                    justify-content: flex-start;
                                    & > div + div {
                                        margin-left: ${formListSpacing};
                                    }
                                `}
                          ${fieldsHorizontalMedia &&
                          `
                                @media ${fieldsHorizontalMedia} {
                                    display: block;

                                    & > div + div {
                                        margin-left: 0px;
                                    }
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
