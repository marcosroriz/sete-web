import React from "react";
import { Formik, Form, FormikConfig, FormikValues } from "formik";

import FormNavCard from "components/micro/Cards/FormNavCard";

type FormCardTabProps = {
    id?: string;
    name: string;
    icon: React.ReactNode;
    validationSchema?: any;
    children: React.ReactNode;
};

type FormNavCardData = {
    formRef: React.RefObject<HTMLFormElement>;
    tabs: FormCardTabProps[];
    step: number;
    currentTab: FormCardTabProps;
    isSubmitting: boolean;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    gotoStep: (newStep?: number) => void;
    nextStep: () => void;
    previousStep: () => void;
};

type FormNavCardProviderProps = FormikConfig<FormikValues> & {};

export const FormNavCardContext = React.createContext({} as FormNavCardData);

export const FormNavCardTab: React.FC<FormCardTabProps> = ({ children }) => {
    return <>{children}</>;
};

export const FormNavCardProvider: React.FC<FormNavCardProviderProps> = ({ children, onSubmit, ...props }) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormCardTabProps>[];
    const tabs = childrenArray.map((child) => child.props);
    const [step, setStep] = React.useState<number>(0);
    const currentTab = tabs[step];
    const isLastStep = step === tabs.length - 1;

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

    return (
        <Formik
            {...props}
            onSubmit={async (values, helpers) => {
                console.log("olá");
                if (isLastStep) {
                    await onSubmit(values, helpers);
                    return;
                }
                setStep((prev) => prev + 1);
            }}
            validationSchema={currentTab.validationSchema}
        >
            {({ isSubmitting }) => (
                <FormNavCardContext.Provider value={{ formRef, isSubmitting, tabs, currentTab, step, setStep, gotoStep, nextStep, previousStep }}>
                    <Form ref={formRef}>
                        <FormNavCard />
                    </Form>
                </FormNavCardContext.Provider>
            )}
        </Formik>
    );
};

export function useFormNavCard(): FormNavCardData {
    const context = React.useContext(FormNavCardContext);
    if (!context) {
        throw new Error("O FormNavCard deve ser usado entre um contexto");
    }
    return context;
}
