import React from "react";

import NavCard from "components/micro/Cards/NavCard";

type NavCardTabProps = {
    id?: string;
    name: string;
    icon: React.ReactNode;
    children: React.ReactNode;
};

type NavCardData = {
    step: number;
    tabs: NavCardTabProps[];
    currentTab: NavCardTabProps;
    setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const NavCardContext = React.createContext({} as NavCardData);

export const NavCardTab: React.FC<NavCardTabProps> = ({ children }) => {
    return <>{children}</>;
};

export const NavCardProvider: React.FC = ({ children }) => {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<NavCardTabProps>[];
    const tabs = childrenArray.map((child) => child.props);
    const [step, setStep] = React.useState<number>(0);
    const currentTab = tabs[step];
    return (
        <NavCardContext.Provider value={{ tabs, currentTab, step, setStep }}>
            <NavCard />
        </NavCardContext.Provider>
    );
};

export function useNavCard<T = string>(): NavCardData {
    const context = React.useContext(NavCardContext);
    if (!context) {
        throw new Error("O NavCard deve ser usado entre um contexto");
    }
    return context;
}
