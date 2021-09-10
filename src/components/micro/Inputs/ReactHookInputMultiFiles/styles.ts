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
};

export const InputField = styled.div<InputFieldProps>`
    flex: 1;
    .form-control {
        display: block;

        width: 100%;
        height: auto;
        padding: 0.375rem 0.75rem;

        font-size: 14px;
        ${({ thinBorder }) => (thinBorder ? "&, &:focus { border-width: 1px; }" : "&, &:focus { border-width: 2px; }")}
        transition: all 0.1s linear;

        background-color: var(--color-white);
        outline: 0;

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

    .form-preview {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin: 10px -6px -6px -6px;

        .preview-bg {
            width: 100px;
            height: 100px;
            margin: 6px;

            position: relative;

            border-radius: 5px;
            border: 2px solid #e3e3e3;
            background-color: var(--color-white);

            .preview-img {
                width: 100%;
                height: 100%;

                border-radius: 5px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }
            button {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 20px;
                height: 20px;
                padding: 0px;

                position: absolute;
                top: -5px;
                right: -5px;

                border: none;
                border-radius: 50px;
                background-color: var(--color-grey-700);
            }
        }
    }
`;

const getColor = (props) => {
    if (props.isDragAccept) {
        return "#00e676";
    }
    if (props.isDragReject) {
        return "#ff1744";
    }
    if (props.isDragActive) {
        return "#2196f3";
    }
    return "#e3e3e3";
};

export const DragDropContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    border-width: 2px;
    border-radius: 5px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: var(--color-white);
    color: var(--color-grey-400);
    outline: none;
    transition: border 0.24s ease-in-out;
    p {
        user-select: none;
    }
`;
