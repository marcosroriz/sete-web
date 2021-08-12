import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import { useFormNavCard } from "hooks/FormNavCardContext";

import { Container } from "./styles";

const FormNavCard: React.FC = () => {
    const { tabs, step, gotoStep } = useFormNavCard();

    return (
        <Container>
            <Tabs id="nav-card" variant="pills" activeKey={step} onSelect={(k) => gotoStep(Number(k))}>
                {tabs.map((tab, index) => (
                    <Tab
                        eventKey={index}
                        title={
                            <>
                                <div className="nav-card-item-icon">{tab.icon}</div>
                                <span>{tab.name}</span>
                            </>
                        }
                        key={tab.id ? tab.id : tab.name.replaceAll(" ", "_")}
                    >
                        {tab.children}
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default FormNavCard;
