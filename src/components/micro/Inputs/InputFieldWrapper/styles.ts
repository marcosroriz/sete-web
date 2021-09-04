import styled, { css } from "styled-components";

type InputFieldProps = {
    isInvalid?: boolean;
    isTouched?: boolean;
    thinBorder?: boolean;
};

const inputFieldCss = {
    inputFocusError: css`
        box-shadow: 0 0 0 0.15rem rgb(251 64 75 / 25%);
        border-color: var(--color-red-500);
        color: var(--color-red-500);
    `,
    inputFocusTouched: css`
        color: var(--color-green);
        border-color: #ced4da;
        border-bottom-color: var(--color-green);
        box-shadow: none;
    `,
    inputFocus: css`
        border-color: #ced4da;
        border-bottom-color: #aaaaaa;
        box-shadow: none;
    `,
};

export const InputField = styled.div<InputFieldProps>`
    flex: 1;
    position: relative;

    .input-group {
        flex-wrap: nowrap;
        & > .input-group-text {
            position: relative;
            z-index: 20;

            color: var(--color-grey-300);
            font-size: 14px;

            border-left: none;
            border-color: #e3e3e3;
            ${({ thinBorder }) => (thinBorder ? "&, &:focus { border-width: 1px; }" : "&, &:focus { border-width: 2px; }")}

            transition: all 0.1s linear;
        }
    }

    .form-control {
        display: block;
        z-index: 20;

        width: 100%;
        height: auto;
        padding: 0.375rem 0.75rem;

        font-size: 14px;
        ${({ thinBorder }) => (thinBorder ? "&, &:focus { border-width: 1px; }" : "&, &:focus { border-width: 2px; }")}
        transition: all 0.1s linear;

        background-color: var(--color-white-50);

        &:focus,
        &:focus ~ .input-group-text {
            ${({ isInvalid, isTouched }) =>
                isInvalid ? inputFieldCss.inputFocusError : isTouched ? inputFieldCss.inputFocusTouched : inputFieldCss.inputFocus}
            outline: 0;
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

        color: var(--color-red-500);
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
            ${({ isInvalid }) => (isInvalid ? "color: var(--color-red-500);" : "color: var(--color-grey-300);")}
            width: 100%;
            height: 100%;
        }
    }
`;
