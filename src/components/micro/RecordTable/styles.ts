import styled from "styled-components";

export const Container = styled.div`
    .record-table-title {
        padding-bottom: 10px;

        color: var(--color-grey-450);
        font-weight: bold;
        font-size: 18px;

        border: #8a99a7;
        border-bottom-style: solid;
        border-width: 4px;
    }
    .record-table {
        border-spacing: 0;
        width: 100%;

        tbody {
            text-align: center;
            color: var(--color-black);
            font-size: 14px;

            tr {
                border-top: 1px solid #e0e0e1;

                td {
                    padding: 10px 8px;
                    &:first-child {
                        width: 30%;
                        text-align: right;
                    }
                    &:last-child {
                        width: 70%;
                        text-align: left;
                        font-weight: 600;
                        color: var(--color-black);
                    }
                }

                &:hover {
                    cursor: pointer;
                    background-color: #dedee3;
                }

                &:nth-child(ODD) {
                    background-color: #f1f1f2;
                    &:hover {
                        background-color: #dedee3;
                    }
                }
            }
        }
    }
    .record-table-action-buttons {
        width: 60%;
        margin: 0 auto;
        margin-top: 25px;
    }
`;
