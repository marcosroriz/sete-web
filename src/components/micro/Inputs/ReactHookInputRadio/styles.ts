import styled, { css } from "styled-components";

export const Container = styled.div`
    display: block;

    .radio-error {
        width: 100%;
        display: block;

        height: 10px;

        color: var(--color-red-500);
        font-size: 12px;
        font-family: var(--font-tertiary);
    }
`;

const positionStyle = {
    right: css`
        flex-direction: row;
        .radio-field {
            margin-right: 12px;
        }
    `,
    left: css`
        flex-direction: row-reverse;
        .radio-field {
            margin-left: 12px;
        }
    `,
};

type LabelProps = {
    position?: "right" | "left";
    thinBorder?: boolean;
};

export const Label = styled.label<LabelProps>`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: fit-content;
    padding: 5px 0px;

    position: relative;

    font-size: 14px;
    font-weight: 400;
    color: var(--color-black);
    user-select: none;
    cursor: pointer;

    ${({ position }) => positionStyle[position || "right"]}

    & + label {
        margin-top: 17px;
    }
    .radio-input {
        width: 0px;
        height: 0px;

        position: absolute;
        overflow: hidden;

        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
    }
    .radio-field {
        display: block;

        min-width: 18px;
        min-height: 18px;
        margin-right: 12px;

        position: relative;

        border-radius: 36px;
        border: 1px solid var(--color-grey-450);
        ${({ thinBorder }) => (thinBorder ? "border-width: 1px;" : "border-width: 2px;")}
        background-color: var(--color-white);
        transition: all 0.1s linear;

        &:after {
            content: "";
            display: block;
            position: absolute;
            opacity: 0;
            transition: all 0.1s ease;
        }
    }
    .radio-text {
        display: inline-block;
        font-weight: 500;
        font-family: var(--font-primary);
    }

    & > .radio-input:focus ~ .radio-field {
        outline-color: var(--color-green);
        outline-width: 2px;
        box-shadow: 0 0 0 0.15rem rgb(136 136 136 / 30%);
    }

    & > .radio-input:checked ~ .radio-field {
        &:after {
            opacity: 1;
            right: 50%;
            bottom: 50%;
            transform: translateY(50%) translateX(50%);

            width: 10px;
            height: 10px;

            border-radius: 24px;
            background-color: var(--color-grey-450);
        }
    }
`;
