import styled, { css } from "styled-components";

export const mediaQuery = {
    mobile: "(max-width: 525px)",
};

type ContainerProps = {
    isRequired?: boolean;
    isInvalid?: boolean;
    hasOnlyChild?: boolean;
};

export const Container = styled.div<ContainerProps>`
    display: block;

    padding: 25px 32px 25px 32px;

    border-radius: 5px;
    border: 3px solid;
    ${({ isRequired, isInvalid }) =>
        !isRequired
            ? css`
                  border-color: var(--color-white-150);
                  background: var(--color-white-100);
              `
            : isInvalid
            ? css`
                  border-color: var(--color-red-100);
                  background: var(--color-red-50);
                  border-width: 4px;
              `
            : css`
                  background-color: var(--color-grey-50);
                  border-color: var(--color-grey-150);
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
            color: var(--color-grey-300);
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
    }

    @media ${mediaQuery.mobile} {
        padding: 25px 20px 25px 0px;
        .form-item-label {
            left: -10px;
        }
    }
`;
