import React from "react";
import { useLocation } from "react-router-dom";

import { SidebarItemKeys } from "entities/SidebarItemKeys";

type SidebarAccordionData = {
    activeAccordionKey: string;
    changeAccordionKey(key: string): void;
};

type SidebarAccordionProviderProps = {
    children: React.ReactNode;
};

const SidebarAccordionContext = React.createContext({} as SidebarAccordionData);

const SidebarAccordionProvider = ({ children }: SidebarAccordionProviderProps): JSX.Element => {
    const [activeAccordionKey, setAtiveAccordionKey] = React.useState("");
    const { pathname } = useLocation();

    React.useEffect(() => {
        toggleAccordionWithPathname();
    }, []);

    const toggleAccordionWithPathname = (): void => {
        if (pathname === "/") {
            return;
        }
        const pathKey = SidebarItemKeys[pathname.split("/")[1]];

        if (Number(pathKey)) {
            changeAccordionKey(pathKey);
        }
    };

    const changeAccordionKey = React.useCallback(
        (key: string) => {
            setAtiveAccordionKey((prev) => (prev !== key ? key : ""));
        },
        [setAtiveAccordionKey],
    );

    return <SidebarAccordionContext.Provider value={{ activeAccordionKey, changeAccordionKey }}>{children}</SidebarAccordionContext.Provider>;
};

const useSidebarAccordion = (): SidebarAccordionData => {
    const context = React.useContext(SidebarAccordionContext);
    if (!context) {
        throw new Error("O SidebarAccordion deve ser usado entre um contexto");
    }
    return context;
};

export { SidebarAccordionContext, SidebarAccordionProvider, useSidebarAccordion };
