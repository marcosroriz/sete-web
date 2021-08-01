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
                  background-color: ${isActive ? "var(--color-lightest-black)" : "var(--color-light-black)"};
                  &:hover {
                      background-color: var(--color-lightest-black);
                  }
              `}

    .accordion-content {
        flex: 1;
        display: flex;
        align-items: center;
        .accordion-img-container {
            width: 30px;
            height: 28px;
            margin-right: 15px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    & > svg {
        transition: all 0.2s linear;
        ${({ isActive }) => isActive && "transform: rotate(180deg);"}
    }
`;
