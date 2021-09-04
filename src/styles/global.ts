import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --font-primary: 'Roboto', sans-serif;
        --font-secondary: 'Open Sans', sans-serif;
        --font-tertiary: 'Roboto Condensed', sans-serif;
        --size-max-width: 1320px;
        --color-dark-orange: #ffbc67;
        --color-orange: orange;
        --color-yellow: gold;
        --color-black: #414550;
        --color-white: #ffffff;
        --color-grey-700: #464a56;
        --color-grey-650: #576071;
        --color-grey-500: #6b6b6b;
        --color-grey-450: #888888;
        --color-grey-400: #9e9e9e;
        --color-grey-250: #ece6e6;
        --color-grey-200: #e7e7e7;
        --color-grey-150: #efefef;
        --color-grey-100: #f9f9f9;
        --color-grey-50: #fbfbfb;
        --color-red-500: #FB404B;
        --color-red-100: #f5c7c7;
        --color-red-50: #ffe4e4;
        --color-green: #87CB16;
    }

    /* SCROLLBAR */
    ::-webkit-scrollbar {
        width: 6px;
        background: #ffbc31ed;
    }

    ::-webkit-scrollbar-track {
        background: #6b6b6b;
    }

    ::-webkit-scrollbar-thumb {
        background: #ffaa00ed;
    }
    /* SCROLLBAR */

    /* RESET CSS */
    * {
        box-sizing: border-box;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-family: var(--font-primary);
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section, img {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    button {
        cursor: pointer;
    }
    img {
        image-rendering: -moz-crisp-edges; /* Firefox */
        image-rendering: -o-crisp-edges; /* Opera */
        image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
    }
    /* RESET CSS */

    /* UTILS */
    /* .multi-form-list-checkbox {
        & > legend {
            width: 100%;
            display: block;
            text-align: center;
        }
        & > div > div {
            display: block;
        }
    } */
    /* UTILS */

`;
