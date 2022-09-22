import styled from "styled-components";

export const TableContainer = styled.div`
    .titulo {
        font-weight: 500;
        font-size: 150%;
        text-align: center;
        color: black;
        margin-top: 2%;
        margin-bottom: 2%;

        .totalEscolas {
            background-color: #29a329;
            color: white;
            margin-left: 0.3%;
            padding: 0.1% 0.3%;
            border-radius: 5px;
        }
    }

    .table-wrapper {
        @media (max-width: 2000px) {
            overflow-x: auto;
            width: 100%;
        }
    }

    table {
        border-spacing: 0;
        width: 100%;

        thead {
            color: #6b6b6b;

            tr {
                text-align: center;
                th {
                    padding: 10px 5px;
                }
                :first-child {
                    th {
                        border-top: 3px solid #7e7c97;
                        border-bottom: 2px solid darkorange;
                    }
                }

                :last-child {
                    th {
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
                td {
                    padding: 10px 5px;
                    vertical-align: middle;
                }
            }

            .selected {
                background-color: #196ce9;
                color: white;

                :first-child {
                    border: none;
                }

                border-top: 1px solid #e0e0e1;
            }

            .notSelected {
                border-top: 1px solid #e0e0e1;

                :nth-child(ODD) {
                    background-color: #f1f1f2;
                }

                :hover {
                    background-color: #dedee3;
                }
            }
        }
    }
`;

export const Pagination = styled.div`
    margin-top: 10px;
    color: gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 93%;

    & > div {
        display: flex;
        align-items: center;
        margin-left: 30px;

        select {
            margin-left: 5px;
            padding: 0.5% 1%;
            background-color: white;
            border: 2px solid #c8c8c8;
            border-radius: 10px;
            color: gray;
            margin-right: 5px;
        }
    }

    & > div + div {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        input {
            width: 70px;
            border: 2px solid lightgray;
            border-radius: 20px;
            padding: 1% 10px;
            margin-right: 20px;
            margin-left: 3px;
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
                margin-left: 3%;
                padding: 3% 5%;
                background-color: white;
                font-size: large;
                border: 2px solid lightgray;
                border-radius: 20px;
                color: gray;
                margin-right: 3%;
                cursor: pointer;
            }
        }
    }
`;
