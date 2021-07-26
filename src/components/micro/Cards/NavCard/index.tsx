import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import { useNavCard } from "hooks/NavCardContext";

import { Container } from "./styles";

const NavCard: React.FC = () => {
    const { tabs, currentTab, setCurrentTab } = useNavCard();
    return (
        <Container>
            <Tabs id="nav-card" variant="pills" activeKey={currentTab} onSelect={(k) => setCurrentTab(k || "")}>
                {tabs.map((tab) => (
                    <Tab
                        eventKey={tab.id ? tab.id : tab.name.replaceAll(" ", "_")}
                        title={
                            <>
                                <div className="nav-card-item-icon">{tab.icon}</div>
                                <span>{tab.name}</span>
                            </>
                        }
                        key={tab.id ? tab.id : tab.name.replaceAll(" ", "_")}
                    >
                        {tab.component}
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default NavCard;
