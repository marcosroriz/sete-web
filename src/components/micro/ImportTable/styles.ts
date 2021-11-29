import styled from "styled-components";

export const Container = styled.div`
    table {
        border-spacing: 0;
        width: 100%;

        thead {
            color: var(--color-grey-400);
            font-size: 14px;

            tr {
                text-align: center;

                :last-child {
                    th {
                        padding: 2% 0 1%;
                        border-bottom: 3px solid #7e7c97;
                    }
                }
            }
        }

        tbody {
            text-align: center;
            color: #414550;
            font-size: 14px;

            tr {
                :hover {
                    cursor: pointer;
                }
            }

            .selected {
                background-color: #196ce9;
                color: white;

                :first-child {
                    border: none;
                }

                border-top: 1px solid #e0e0e1;

                td {
                    padding: 0.9% 0;
                }
            }

            .notSelected {
                border-top: 1px solid #e0e0e1;

                :nth-child(ODD) {
                    background-color: #f1f1f2;
                }

                :hover {
                    background-color: #dedee3;
                }

                td {
                    padding: 0.9% 0;
                }
            }
        }
    }

    .import-table__top-filters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .import-table__ipp {
            display: flex;
            align-items: center;

            select {
                margin-left: 5px;
                height: 32px;
                padding: 0px 10px;
                background-color: white;
                border: 2px solid #c8c8c8;
                border-radius: 5px;
                color: gray;
                margin-right: 5px;
            }
        }
    }

    .import-table__pagination {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        margin-top: 10px;
        color: var(--color-grey-400);

        input {
            width: 70px;
            height: 32px;
            border: 2px solid lightgray;
            border-radius: 20px;
            padding: 0px 10px;
            font-size: 16px;
            margin-right: 20px;
            margin-left: 3px;
        }
        & > span {
            display: block;
        }
        & > div {
            display: flex;
            align-items: center;

            strong {
                padding: 4px 8px;
                background-color: #1dc7ea;
                font-size: 100%;
                border-radius: 20px;
                color: white;
                margin-right: 2px;
                margin-left: 2px;
            }

            button {
                padding: 0px 10px;
                height: 32px;
                background-color: white;
                font-size: 16px;
                border: 1px solid lightgray;
                border-radius: 20px;
                color: gray;
                cursor: pointer;
                transition: all 0.1s linear;
                &:first-child {
                    margin-right: 5px;
                }
                &:last-child {
                    margin-left: 5px;
                }
                &:hover {
                    background-color: var(--color-grey-250);
                }
            }
        }
    }
`;
