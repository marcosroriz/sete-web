import styled from "styled-components";

export const Container = styled.div`
    & > div + div {
        margin-top: 20px;
    }
    .planilha-exemplo {
        figcaption {
            text-align: center;
            font-size: 12px;
            font-weight: 600;
            font-family: var(--font-primary);
            text-transform: uppercase;
        }
        img {
            display: block;
            margin: 0 auto;
        }
        margin-top: 20px;
    }
    .btn-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            color: var(--color-grey-400);
            font-weight: bold;
        }
        .btn {
            display: flex;
            align-items: center;
            margin-left: 10px;
            .btn-icon {
                margin-right: 5px;
            }
        }
    }
`;
