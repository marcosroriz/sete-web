import styled, { css } from "styled-components";

type ContainerProps = {
    isRequired?: boolean;
    isInvalid?: boolean;
};

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 25px 30px 25px 10px;

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

    .form-item-label {
        position: relative;
        left: 0px;

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
        margin-bottom: -15px;
        margin-left: 30px;
    }
`;
