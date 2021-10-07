import styled, { css } from "styled-components";

type ContainerProps = {
    isDashboard?: boolean;
};

export const Container = styled.div<ContainerProps>`
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
        background-color: white;
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
                ${({ isDashboard }) =>
                    !isDashboard
                        ? css`
                              font-size: 13px;
                              font-weight: 500;
                              .nav-card-item-icon {
                                  max-width: 29px;
                                  margin-right: 5px;
                              }
                          `
                        : css`
                              font-size: 17px;
                              font-weight: 400;
                              .nav-card-item-icon {
                                  margin-right: 5%;
                                  max-width: 45px;
                                  filter: invert(0.7);
                              }
                              &.active .nav-card-item-icon {
                                  filter: invert(0);
                              }
                          `}
                text-transform: uppercase;

                user-select: none;

                &:hover,
                &:focus-within,
                &:focus {
                    background-color: #e5e5e5;
                }

                &.active {
                    color: gold;
                    border-top: 3px solid gold;
                    background-color: #ffffff;
                }

                .nav-card-item-icon {
                    width: 100%;
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
