import styled from "styled-components";

const media = {
    lgDesktop: "(max-width: 1170px)",
    tablet: "(max-width: 760px)",
    mobile: "(max-width: 650px)",
};

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;

    position: relative;

    border: 1px solid var(--color-grey-650);
    border-radius: 15px;

    h2 {
        display: inline-block;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;

        position: absolute;
        right: 50%;
        transform: translateX(50%);
        top: -10px;

        font-weight: 500;
        font-size: 16px;
        user-select: none;
        text-align: center;

        background-color: var(--color-white);
    }
    .user-data {
        width: 100%;
        max-width: 300px;
        margin-left: 40px;
        .user-data-info {
            display: flex;
            align-items: center;

            .user-data-label {
                display: block;
                font-weight: 500;
                color: var(--color-grey-500);
            }
            label,
            .user-data-label {
                width: 100%;
                max-width: 60px;
                font-size: 16px;
            }
            .user-data-value {
                display: block;
                margin-left: 14px;
                color: var(--color-black);
            }
            input {
                font-size: 14px;
            }

            &.no-field {
                margin-bottom: 15px;
            }
        }
        .user-data-password {
            margin-left: -6px;

            font-size: 16px;
            text-decoration: underline;
            color: var(--color-black);

            background-color: transparent;
            border: none;
        }
    }
    .btn-fill {
        display: block;
        margin: 15px 0px 0px auto;
    }

    @media ${media.tablet} {
        padding: 60px 20px;
    }
    @media ${media.mobile} {
        flex-direction: column;
        .user-data {
            margin-left: 0px;
            margin-top: 20px;
        }
    }
`;

export const Form = styled.form`
    padding: 30px 30px;
    @media ${media.lgDesktop} {
        padding: 0px;
    }
`;
