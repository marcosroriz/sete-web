import styled, { css } from "styled-components";

type ButtonContainerProps = {
    isActive?: boolean;
    isProfile?: boolean;
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 10px 30px;

    color: var(--color-white);
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 600;

    border: none;
    border-radius: 2px;
    transition: background 0.1s linear;

    ${({ isProfile, isActive }) =>
        isProfile
            ? css`
                  font-size: 14px;
                  background-color: #6c7280;
                  &:hover {
                      background-color: #6c7280;
                  }
              `
            : css`
                  text-transform: uppercase;
                  background-color: ${isActive ? "var(--color-grey-650)" : "var(--color-grey-700)"};
                  &:hover {
                      background-color: var(--color-grey-650);
                  }
              `}

    .accordion-content {
        flex: 1;
        display: flex;
        align-items: center;
        user-select: none;
        .accordion-img-container {
            width: 30px;
            height: 28px;
            margin-right: 15px;
            &.accordion-img-profile {
                height: 30px;
                overflow: hidden;
                border-radius: 100000px;
                border: 1px solid var(--color-grey-650);
            }
            img {
                width: 100%;
                height: 100%;
                -webkit-user-drag: none;
            }
        }
    }

    & > svg {
        transition: all 0.2s linear;
        ${({ isActive }) => isActive && "transform: rotate(180deg);"}
    }
`;
