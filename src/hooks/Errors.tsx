import React from "react";

import { useAuth } from "contexts/Auth";
import { formatHelper } from "helpers/FormatHelper";

import { SwalOptions, useAlertModal } from "./AlertModal";

type ErrorHandler = {
    errorHandler: (err: any, options: SwalOptions) => void;
};

const useError = (): ErrorHandler => {
    const { createModal } = useAlertModal();
    const { signOut } = useAuth();

    const errorHandler = React.useCallback((err: any, options: SwalOptions): void => {
        let errorMessage = "";

        if (err.response) {
            const messages = err.response.data.messages;
            if (Array.isArray(messages)) {
                errorMessage = formatHelper.mergeArrayItemsWithBr(messages);
            } else if (typeof messages === "object" && messages !== null) {
                errorMessage = formatHelper.mergeObjectItemWithBr(messages);
            } else {
                errorMessage = messages || err.response.status + ": " + err.response.statusText;
            }
            switch (err.response.status) {
                case 401:
                    signOut();
                    break;
                case 403:
                    signOut();
                    break;
                default:
                    break;
            }
        } else if (err.request) {
            errorMessage = "Não conseguimos nos conectar ao servidor.";
        } else {
            const messages = err.messages;
            if (Array.isArray(messages)) {
                errorMessage = formatHelper.mergeArrayItemsWithBr(messages);
            } else if (typeof messages === "object" && messages !== null) {
                errorMessage = formatHelper.mergeObjectItemWithBr(messages);
            } else {
                errorMessage = messages;
            }
        }

        createModal("error", {
            ...options,
            html: errorMessage,
        });
    }, []);

    return { errorHandler };
};

export { useError };
