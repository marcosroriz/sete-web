import styled from "styled-components";

export const Container = styled.li`
    display: flex;
    .info-list-item__separator {
        position: relative;
        flex: 1 0 0 35px;
        display: block;
        width: 35px;
        height: 35px;

        border-radius: 1000px;
        background-color: var(--color-dark-orange);

        .info-list-item__separator__text {
            position: absolute;
            bottom: 50%;
            right: 50%;
            transform: translateX(50%) translateY(50%);

            font-weight: 600;
            color: var(--color-black);
            user-select: none;
        }
    }

    .info-list-item__content {
        flex: 1;
        margin-left: 10px;
        .info-list-item__title {
            display: block;
            font-weight: 600;
            font-size: 16px;
        }
        .info-list-item__description {
            display: block;
            margin-top: 6px;

            font-size: 14px;
        }
        .info-list-item__info {
            margin-top: 6px;
            a {
                text-decoration: none;
                color: #23ccef;
                font-size: 12px;
                &:hover {
                    color: #11bfe3;
                }
            }
        }
    }
`;
