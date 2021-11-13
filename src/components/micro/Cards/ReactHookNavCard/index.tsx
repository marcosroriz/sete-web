/**
 * UI do componente de Tabs com wizzard do SETE.
 */

import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { Container } from "./styles";

type ReactHookNavCardProps = {
    isDashboard?: boolean;
};

const ReactHookNavCard: React.FC<ReactHookNavCardProps> = ({ isDashboard = true }) => {
    const { tabs, step, gotoStep } = useReactHookNavCard();

    return (
        <Container isDashboard={isDashboard}>
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

export default ReactHookNavCard;
