import styled from "styled-components";

export const InputField = styled.div``;

type DragDropContainerProps = {
    isDragAccept?: boolean;
    isDragReject?: boolean;
    isDragActive?: boolean;
    dimensions?: string;
};

export const DragDropContainer = styled.div<DragDropContainerProps>`
    width: ${({ dimensions }) => (dimensions ? dimensions : "300px")};
    height: ${({ dimensions }) => (dimensions ? dimensions : "300px")};

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 100%;
    border: 1px solid var(--color-grey-400);

    position: relative;

    .drag-drop-hover {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
        padding: 10px;

        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 100%;
        transition: all 0.1s linear;

        opacity: ${({ isDragActive }) => (isDragActive ? "1" : "0")};

        cursor: pointer;

        position: absolute;
        top: 0px;
        left: 0px;

        span {
            display: block;
            user-select: none;
            color: var(--color-white);
            font-weight: 500;
            font-size: 14px;
            text-align: center;
        }

        &:hover {
            opacity: 1;
        }
    }
`;
