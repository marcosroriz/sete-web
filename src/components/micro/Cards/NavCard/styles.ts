import styled from "styled-components";

export const Container = styled.div`
    border: 1.5px solid #6f6f6f;
    border-radius: 0px 0px 20px 20px;
    border-color: #adadad;
    border-top: none;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    .nav {
        width: 100%;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        li {
            flex: 1;
            .nav-link {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 100%;
                padding: 25px 5px;

                border-radius: 0px;
                background-color: #e5e5e5;
                border: none;
                border-top: 3px solid #7a7a7a;

                color: #808590;
                font-size: 13px;
                text-transform: uppercase;

                &:hover {
                    background-color: #e5e5e5;
                }

                &.active {
                    color: gold;
                    border-top: 3px solid gold;
                    background-color: #ffffff;
                }

                .nav-card-item-icon {
                    max-width: 29px;
                    width: 100%;
                    margin-right: 5px;
                    & > svg {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                    & > img {
                        width: 100%;
                        display: block;
                    }
                }

                @media (max-width: 525px) {
                    padding: 15px 5px;
                    span {
                        display: none;
                    }
                }
            }
        }
    }
    .tab-content {
        border-radius: 0px 0px 20px 20px;
        background-color: #ffffff;
        .tab-pane {
            padding: 20px;
        }
    }
`;
