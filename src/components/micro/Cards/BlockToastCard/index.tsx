import React from "react";
import { animated, useTransition } from "react-spring";
import { FaExclamationCircle, FaRegTimesCircle } from "react-icons/fa";

import { Container } from "./styles";

type BlockToastCardProps = {
    type: "warning";
    text: string;
};

const BlockToastCard: React.FC<BlockToastCardProps> = ({ type, text }) => {
    const [isOpened, setIsOpened] = React.useState(true);
    const styledProps = useTransition(isOpened, {
        config: { duration: 200 },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
    });
    return (
        <>
            {styledProps(
                (options, item) =>
                    item && (
                        <animated.div style={options}>
                            <Container type={type}>
                                <div className="toast-text">
                                    <div className="text-icon">
                                        <FaExclamationCircle size={40} color="var(--color-white-50)" />
                                    </div>
                                    <span>{text}</span>
                                </div>
                                <button className="toast-button" type="button" onClick={() => setIsOpened(false)}>
                                    <FaRegTimesCircle size={40} color="var(--color-white-50)" />
                                </button>
                            </Container>
                        </animated.div>
                    ),
            )}
        </>
    );
};

export default BlockToastCard;
