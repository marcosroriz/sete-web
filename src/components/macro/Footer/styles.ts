import styled from "styled-components";

type ContainerProps = {
    thinBorder: boolean;
};

export const Container = styled.footer<ContainerProps>`
    width: 100%;
    padding: 10px 0px;

    ${({ thinBorder }) => (thinBorder ? "border-top: 1px solid var(--color-light-grey);" : "border-top: 5px solid var(--color-orange);")}
    background-color: var(--color-white);

    .footer-logo {
        img {
            margin: 0 auto;
            height: 55px;
        }
    }

    @media (max-width: 860px) {
        .container {
            .row {
                & > div {
                    width: 100%;
                }
            }
        }
        .footer-logo {
            img {
                height: 40px;
            }
        }
    }
    @media (max-width: 400px) {
        padding: 5px 0px;
        .footer-logo {
            img {
                height: 30px;
            }
        }
    }
`;
