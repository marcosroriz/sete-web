import React from "react";
import { useForm, FormProvider, SubmitHandler, FieldValues, UseFormProps } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ReactHookNavCard from "components/micro/Cards/ReactHookNavCard";

type AdditionalData = {
    [key: string]: [any, React.Dispatch<React.SetStateAction<any>>];
};

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
    aditionalData?: AdditionalData;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    gotoStep: (newStep?: number) => void;
    nextStep: () => void;
    previousStep: () => void;
};

type ReactHookNavCardProviderProps<FormValues> = UseFormProps & {
    children: React.ReactNode;
    isDashboard?: boolean;
    aditionalData?: AdditionalData;
    onSubmit: SubmitHandler<FormValues>;
};

const ReactHookNavCardContext = React.createContext({} as ReactHookNavCardData);

const ReactHookNavCardTab: React.FC<ReactHookCardTabProps> = ({ children }) => {
    return <>{children}</>;
};

const ReactHookNavCardProvider = <FormValues extends FieldValues>({
    children,
    onSubmit,
    isDashboard,
    aditionalData,
    ...props
}: ReactHookNavCardProviderProps<FormValues>): JSX.Element => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const childrenArray = React.Children.toArray(children) as React.ReactElement<ReactHookCardTabProps>[];
    const tabs = childrenArray.map((child) => child.props);
    const [step, setStep] = React.useState<number>(0);
    const currentTab = tabs[step];
    const isLastStep = step === tabs.length - 1;

    const methods = useForm({
        ...props,
        resolver: yupResolver(currentTab.validationSchema || yup.object().shape({})),
    });

    const nextStep = React.useCallback(() => {
        if (step < tabs.length) {
            formRef.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }
    }, [formRef, step, setStep]);

    const previousStep = React.useCallback(() => {
        if (step > 0) {
            setStep((prev) => prev - 1);
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

    const handleFormSubmit: SubmitHandler<FormValues> = React.useCallback(
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
            <ReactHookNavCardContext.Provider value={{ formRef, tabs, currentTab, aditionalData, step, setStep, gotoStep, nextStep, previousStep }}>
                <form ref={formRef} onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <ReactHookNavCard isDashboard={isDashboard} />
                </form>
            </ReactHookNavCardContext.Provider>
        </FormProvider>
    );
};

function useReactHookNavCard(): ReactHookNavCardData {
    const context = React.useContext(ReactHookNavCardContext);
    if (!context) {
        throw new Error("O ReactHookNavCard deve ser usado entre um contexto");
    }
    return context;
}

export { ReactHookNavCardContext, ReactHookNavCardTab, ReactHookNavCardProvider, useReactHookNavCard };
