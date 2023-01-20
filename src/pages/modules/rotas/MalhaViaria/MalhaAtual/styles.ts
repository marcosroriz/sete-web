import styled from "styled-components";

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }

    .btn-container {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            color: var(--color-grey-400);
            font-weight: bold;
        }
        .btn-fill {
            display: flex;
            align-items: center;
            margin-left: 10px;
            padding-left: 10%;
            padding-right: 10%;
            .btn-icon {
                margin-right: 5px;
            }
        }
    }
`;
