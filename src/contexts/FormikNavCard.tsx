import React from "react";
import { Formik, Form, FormikConfig, FormikValues } from "formik";

import FormikNavCard from "components/micro/Cards/FormikNavCard";

type FormikCardTabProps = {
    id?: string;
    name: string;
    icon: React.ReactNode;
    validationSchema?: any;
    children: React.ReactNode;
};

type FormikNavCardData = {
    formRef: React.RefObject<HTMLFormElement>;
    tabs: FormikCardTabProps[];
    step: number;
    currentTab: FormikCardTabProps;
    isSubmitting: boolean;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    gotoStep: (newStep?: number) => void;
    nextStep: () => void;
    previousStep: () => void;
};

type FormikNavCardProviderProps = FormikConfig<FormikValues> & {};

const FormikNavCardContext = React.createContext({} as FormikNavCardData);

const FormikNavCardTab: React.FC<FormikCardTabProps> = ({ children }) => {
    return <>{children}</>;
};

const FormikNavCardProvider: React.FC<FormikNavCardProviderProps> = ({ children, onSubmit, ...props }) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikCardTabProps>[];
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
                if (isLastStep) {
                    await onSubmit(values, helpers);
                    return;
                }
                setStep((prev) => prev + 1);
            }}
            validationSchema={currentTab.validationSchema}
        >
            {({ isSubmitting }) => (
                <FormikNavCardContext.Provider value={{ formRef, isSubmitting, tabs, currentTab, step, setStep, gotoStep, nextStep, previousStep }}>
                    <Form ref={formRef}>
                        <FormikNavCard />
                    </Form>
                </FormikNavCardContext.Provider>
            )}
        </Formik>
    );
};

function useFormikNavCard(): FormikNavCardData {
    const context = React.useContext(FormikNavCardContext);
    if (!context) {
        throw new Error("O FormikNavCard deve ser usado entre um contexto");
    }
    return context;
}

export { FormikNavCardContext, FormikNavCardTab, FormikNavCardProvider, useFormikNavCard };
