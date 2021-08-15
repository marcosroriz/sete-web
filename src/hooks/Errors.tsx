import React from "react";

import { useAuth } from "contexts/Auth";

import { SwalOptions, useAlertModal } from "./AlertModal";

type ErrorHandler = {
    errorHandler: (err: any, options: SwalOptions) => void;
};

const useError = (): ErrorHandler => {
    const { createModal } = useAlertModal();
    const { signOut } = useAuth();

    const errorHandler = React.useCallback((err: any, options: SwalOptions): void => {
        let errorMessage;

        if (err.response) {
            errorMessage = Array.isArray(err.response.data.messages)
                ? err.response.data.messages[0]
                : err.response.data.messages || err.response.status + ": " + err.response.statusText;

            switch (err.response.status) {
                case 401:
                    signOut();
                    break;
                default:
                    break;
            }
        } else if (err.request) {
            errorMessage = "Não conseguimos nos conectar ao servidor.";
        } else {
            errorMessage = err.messages;
        }

        createModal("error", {
            ...options,
            text: errorMessage,
        });
    }, []);

    return { errorHandler };
};

export { useError };
