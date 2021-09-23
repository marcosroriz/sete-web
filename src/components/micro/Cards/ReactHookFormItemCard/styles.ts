import styled, { css } from "styled-components";

export const mediaQuery = {
    desktop: "(max-width: 1000px)",
    mobile: "(max-width: 525px)",
};

const placeItemsCss = {
    center: css`
        & > div,
        & > fieldset {
            width: 100%;
            & > label,
            & > legend {
                flex: 0 1 32.333%;
                text-align: right;
            }
            & > div,
            & > fieldset {
                flex: 0 1 55%;
            }
        }

        @media ${mediaQuery.desktop} {
            & > div,
            & > fieldset {
                & > label,
                & > legend {
                    text-align: left;
                }
            }
        }

        @media ${mediaQuery.mobile} {
            & > div,
            & > fieldset {
                & > label,
                & > legend {
                    flex: 1;
                    text-align: left;
                }
                & > div,
                & > fieldset {
                    flex: 1;
                }
            }
        }
    `,
    left: css``,
};

type ContainerProps = {
    placeItems?: string;
    isRequired?: boolean;
    isInvalid?: boolean;
    hasOnlyChild?: boolean;
};

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    min-height: 87px;

    padding: 25px 32px 25px 32px;

    border-radius: 5px;
    border: 3px solid;
    ${({ isRequired, isInvalid }) =>
        !isRequired
            ? css`
                  border-color: var(--color-grey-100);
                  background: var(--color-grey-50);
              `
            : isInvalid
            ? css`
                  border-color: var(--color-red-100);
                  background: var(--color-red-50);
                  border-width: 4px;
              `
            : css`
                  background-color: var(--color-grey-150);
                  border-color: var(--color-grey-250);
              `}

    position: relative;

    .form-item-label {
        position: absolute;
        left: 7px;
        bottom: 50%;

        width: 30px;

        user-select: none;
        transform: rotate(-90deg);

        span {
            position: absolute;
            right: 50%;
            transform: translateX(50%);

            text-align: center;
            color: var(--color-grey-400);
            font-family: var(--font-primary);
            font-weight: 600;
            font-size: 14px;
            font-variant: all-petite-caps;
        }
    }

    .form-item-content {
        flex: 1;
        ${({ hasOnlyChild }) => (hasOnlyChild ? "margin-bottom: -15px;" : "margin-bottom: 0px;")}
        margin-left: 30px;
        ${({ placeItems }) => placeItems && placeItemsCss[placeItems || "center"]}
    }

    @media ${mediaQuery.mobile} {
        padding: 25px 20px 25px 0px;
        .form-item-label {
            left: -10px;
        }
    }
`;
