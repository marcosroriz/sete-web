import React from "react";
import { RiArrowDownSFill } from "react-icons/ri";

import { ButtonContainer } from "./styles";

type AccordionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isProfile?: boolean;
    isActive?: boolean;
    icon: string;
    name: string;
    ref?: React.RefObject<HTMLButtonElement>;
};

const AccordionButton: React.FC<AccordionButtonProps> = ({ icon, name, ref, isActive = false, isProfile = false, children, ...props }) => {
    return (
        <ButtonContainer {...props} ref={ref} isActive={isActive} isProfile={isProfile}>
            <div className="accordion-content">
                <div className="accordion-img-container">
                    <img src={icon} alt="" />
                </div>
                {name}
            </div>
            <RiArrowDownSFill color="var(--color-white)" size={15} />
        </ButtonContainer>
    );
};

export default AccordionButton;
