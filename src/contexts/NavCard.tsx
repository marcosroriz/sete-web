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
    gotoStep: (newStep?: number) => void;
    nextStep: () => void;
    previousStep: () => void;
};

const NavCardContext = React.createContext({} as NavCardData);

const NavCardTab: React.FC<NavCardTabProps> = ({ children }) => {
    return <>{children}</>;
};

const NavCardProvider: React.FC = ({ children }) => {
    const [step, setStep] = React.useState<number>(0);
    const childrenArray = React.Children.toArray(children) as React.ReactElement<NavCardTabProps>[];
    const tabs = childrenArray.map((child) => child.props);
    const currentTab = React.useMemo(() => tabs[step], [step]);

    const nextStep = React.useCallback(() => {
        if (step < tabs.length) {
            setStep(step + 1);
        }
    }, [step, setStep]);

    const previousStep = React.useCallback(() => {
        if (step > -1) {
            setStep(step - 1);
        }
    }, [step, setStep]);

    const gotoStep = React.useCallback(
        (newStep?: number): void => {
            if (newStep !== undefined) {
                newStep > -1 && newStep < tabs.length && setStep(newStep);
                return;
            }
            nextStep();
        },
        [setStep, nextStep, previousStep],
    );
    return (
        <NavCardContext.Provider value={{ tabs, currentTab, step, setStep, gotoStep, nextStep, previousStep }}>
            <NavCard />
        </NavCardContext.Provider>
    );
};

function useNavCard<T = string>(): NavCardData {
    const context = React.useContext(NavCardContext);
    if (!context) {
        throw new Error("O NavCard deve ser usado entre um contexto");
    }
    return context;
}

export { NavCardContext, NavCardTab, NavCardProvider, useNavCard };
