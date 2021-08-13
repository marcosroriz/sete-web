import React from "react";
import { useForm, FormProvider, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ReactHookNavCard from "components/micro/Cards/ReactHookNavCard";

type ReactHookCardTabProps = {
    id?: string;
    name: string;
    icon: React.ReactNode;
    validationSchema?: any;
    children: React.ReactNode;
};

type ReactHookNavCardData = {
    formRef: React.RefObject<HTMLFormElement>;
    tabs: ReactHookCardTabProps[];
    step: number;
    currentTab: ReactHookCardTabProps;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    gotoStep: (newStep?: number) => void;
    nextStep: () => void;
    previousStep: () => void;
};

type ReactHookNavCardProviderProps<T> = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<T>;
};

export const ReactHookNavCardContext = React.createContext({} as ReactHookNavCardData);

export const ReactHookNavCardTab: React.FC<ReactHookCardTabProps> = ({ children }) => {
    return <>{children}</>;
};

export const ReactHookNavCardProvider = <T extends FieldValues>({ children, onSubmit }: ReactHookNavCardProviderProps<T>): JSX.Element => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const childrenArray = React.Children.toArray(children) as React.ReactElement<ReactHookCardTabProps>[];
    const tabs = childrenArray.map((child) => child.props);
    const [step, setStep] = React.useState<number>(0);
    const currentTab = tabs[step];
    const isLastStep = step === tabs.length - 1;

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(currentTab.validationSchema || yup.object().shape({})),
    });

    const nextStep = React.useCallback(() => {
        if (step < tabs.length) {
            formRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }
    }, [formRef, step, setStep]);

    const previousStep = React.useCallback(() => {
        if (step > -1) {
            setStep(step - 1);
        }
    }, [step, setStep]);

    const gotoStep = React.useCallback(
        (newStep?: number): void => {
            if (newStep !== undefined && step - newStep >= 0) {
                setStep(newStep);
                return;
            }
            formRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        },
        [formRef, step, setStep],
    );

    const handleFormSubmit: SubmitHandler<T> = React.useCallback(
        async (data) => {
            if (isLastStep) {
                await onSubmit(data);
                return;
            }
            setStep((prev) => prev + 1);
        },
        [isLastStep, setStep],
    );

    return (
        <FormProvider {...methods}>
            <ReactHookNavCardContext.Provider value={{ formRef, tabs, currentTab, step, setStep, gotoStep, nextStep, previousStep }}>
                <form ref={formRef} onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <ReactHookNavCard />
                </form>
            </ReactHookNavCardContext.Provider>
        </FormProvider>
    );
};

export function useReactHookNavCard(): ReactHookNavCardData {
    const context = React.useContext(ReactHookNavCardContext);
    if (!context) {
        throw new Error("O ReactHookNavCard deve ser usado entre um contexto");
    }
    return context;
}
