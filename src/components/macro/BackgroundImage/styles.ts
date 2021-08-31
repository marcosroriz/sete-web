import styled from "styled-components";

import BackgroundImage from "assets/images/entry-bg.jpg";

export const ImageContainer = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    height: 100%;

    position: fixed;
    z-index: 0;

    background-image: url(${BackgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
