import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 100%;
    min-height: 100vh;
    height: 100%;

    position: relative;
    z-index: 5;

    background-color: rgba(10, 0, 0, 0.3);

    overflow: auto;
`;

export const Section = styled.section`
    flex: 1 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    width: 100%;
    margin-top: 25px;
`;

export const Header = styled.header`
    .header-logo {
        div {
            max-width: 250px;
            width: 100%;
            margin: 0 auto;
            img {
                width: 100%;
            }
        }
        figcaption {
            color: var(--color-white);
            text-align: center;
            font-family: var(--font-primary);
            font-weight: 600;
            font-size: 24px;
            font-variant: all-small-caps;
        }
    }
`;

export const ChildrenContainer = styled.div`
    width: 100%;
    max-width: 890px;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 0px 12px;
`;
