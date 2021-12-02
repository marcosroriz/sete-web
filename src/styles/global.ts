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
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
    /* RESET CSS */

    /* UTILS */
    .modal-header {
        padding-bottom: 0px;
        padding-top: 0px;
        .h4 {
            margin-top: 20px;
            font-weight: 400;
            color: var(--color-black);
        }
    }
    .modal-body {
        padding-left: 40px;
        padding-right: 40px;
    }
    .modal-footer {
    }
    .modal-md {
        width: 600px;
        max-width: 100%;
        margin-top: 120px;
    }
    .modal-content {
        border: 2px solid;
        border-radius: 0px 0px 20px 20px;
        border-color: #adadad;
        border-top-color: var(--color-yellow);
    }

    .table-header__container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .table-header__input {
        width: max-content;
        background-color: white;
        border: 2px solid #C8C8C8;
        border-radius: 6px;
        color: var(---color-black);
        font-size: 12px;
        padding: 0px 12px;
        height: 30px;

        &::placeholder {
            color: rgba(65, 69, 80, 0.5);
            font-weight: 500;
        }
        &:focus {
            border-width: 2px;
            border-color: #C8C8C8;
        }
    }
    .table-header__input.min {
        width: inherit;
    }
    .table-header__select {
        width: max-content;
        background-color: white;
        border: 2px solid #C8C8C8;
        border-radius: 6px;
        color: var(---color-black);
        font-size: 12px;
        padding: 0px 12px;
        height: 30px;

        &::placeholder {
            color: rgba(65, 69, 80, 0.5);
            font-weight: 500;
        }
        &:focus {
            border-width: 2px;
            outline: none;
        }
    }
    /* UTILS */
`;
