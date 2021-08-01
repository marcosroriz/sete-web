import styled, { css } from "styled-components";

export const Container = styled.div`
    padding-left: 270px;
`;
export const Nav = styled.nav`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;

    max-width: 270px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding: 25px 3px;

    background-color: var(--color-white);
    background-color: var(--color-black);

    .nav-logo {
        max-width: 150px;
        width: 100%;
        margin: 0 auto;
        img {
            width: 100%;
            image-rendering: unset;
        }
    }

    .nav-items {
        margin-top: 20px;
    }
`;

type NavItemProps = {
    isProfile?: boolean;
};

export const NavItem = styled.div<NavItemProps>`
    ${({ isProfile }) =>
        isProfile &&
        css`
            padding: 4px 0px;
            margin-bottom: 15px;

            background-color: #6c7280;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-right: none;
            border-left: none;
        }`}
    & + div {
        margin-top: 5px;
    }
`;

type NavItemBodyProps = {
    isProfile?: boolean;
};

export const NavItemBody = styled.ul<NavItemBodyProps>`
    padding: 4px 1px 0px 1px;
    li {
        a {
            display: block;
            width: 100%;
            padding: 13px 25px;

            color: var(--color-white);
            font-weight: 400;
            font-size: 14px;
            font-family: var(--font-tertiary);
            text-decoration: none;
            text-transform: capitalize;

            border-radius: 2px;
            transition: all 0.1s linear;

            &.isActive {
                background-color: rgba(236, 178, 74, 0.9);
                &:hover {
                    background-color: rgba(236, 178, 74, 1);
                }
            }
            ${({ isProfile }) =>
                isProfile
                    ? css`
                        background-color: transparent;
                    }`
                    : css`
                          background-color: rgba(127, 133, 146, 0.9);
                          &:hover {
                              background-color: rgba(127, 133, 146, 1);
                              border-right: 5px solid var(--color-white);
                          }
                      `}
        }
        & + li {
            margin-top: 4px;
        }
    }
`;

export const Section = styled.section`
    position: relative;

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    min-height: 100vh;
`;

export const ChildrenContainer = styled.div`
    flex: 1 1;
    padding: 35px 10% 0px 10%;
`;
