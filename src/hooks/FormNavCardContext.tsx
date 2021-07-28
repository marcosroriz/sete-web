import React from "react";
import { Formik, Form, FormikConfig, FormikValues } from "formik";

import FormNavCard from "components/micro/Cards/FormNavCard";

type FormCardTabProps = {
    id?: string;
    name: string;
    icon: React.ReactNode;
    children: React.ReactNode;
};

type FormNavCardData = {
    formRef: React.RefObject<HTMLFormElement>;
    tabs: FormCardTabProps[];
    step: number;
    currentTab: FormCardTabProps;
    setStep: React.Dispatch<React.SetStateAction<number>>;
};

type FormNavCardProviderProps = FormikConfig<FormikValues> & {};

export const FormNavCardContext = React.createContext({} as FormNavCardData);

export const FormNavCardTab: React.FC<FormCardTabProps> = ({ children }) => {
    return <>{children}</>;
};

export const FormNavCardProvider: React.FC<FormNavCardProviderProps> = ({ children, ...props }) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormCardTabProps>[];
    const tabs = childrenArray.map((child) => child.props);
    const [step, setStep] = React.useState<number>(0);
    const currentTab = tabs[step];
    return (
        <FormNavCardContext.Provider value={{ formRef, tabs, currentTab, step, setStep }}>
            <Formik {...props}>
                {() => (
                    <Form ref={formRef}>
                        <FormNavCard />
                    </Form>
                )}
            </Formik>
        </FormNavCardContext.Provider>
    );
};

export function useFormNavCard<T = string>(): FormNavCardData {
    const context = React.useContext(FormNavCardContext);
    if (!context) {
        throw new Error("O FormNavCard deve ser usado entre um contexto");
    }
    return context;
}
