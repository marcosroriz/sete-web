import React from "react";

import NavCard from "components/micro/Cards/NavCard";

export type Tab = {
    id?: string;
    name: string;
    icon: React.ReactNode;
    component: React.ReactNode;
};

type NavCardData = {
    tabs: Tab[];
    currentTab: string;
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

type NavCardProviderProps = {
    tabs: Tab[];
};

export const NavCardContext = React.createContext({} as NavCardData);

export const NavCardProvider: React.FC<NavCardProviderProps> = ({ tabs }) => {
    const [currentTab, setCurrentTab] = React.useState<string>(tabs[0].id || tabs[0].name || "");
    return (
        <NavCardContext.Provider value={{ tabs, currentTab, setCurrentTab }}>
            <NavCard />
        </NavCardContext.Provider>
    );
};

type UseNavCardType<T> = {
    tabs: Tab[];
    currentTab: T;
    setCurrentTab: React.Dispatch<React.SetStateAction<T>>;
};

export function useNavCard<T = string>(): UseNavCardType<T> {
    const context = React.useContext(NavCardContext);
    if (!context) {
        throw new Error("O NavCard deve ser usado entre um contexto");
    }
    const { currentTab, setCurrentTab, tabs } = context;
    return {
        tabs: tabs,
        currentTab: currentTab as unknown as T,
        setCurrentTab: setCurrentTab as unknown as React.Dispatch<React.SetStateAction<T>>,
    };
}
