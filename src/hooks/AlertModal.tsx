import React from "react";
import swal, { SweetAlertOptions } from "sweetalert2";

import Spinner from "assets/icons/spinner.svg";
import { createGlobalStyle } from "styled-components";

type SwalOptions = SweetAlertOptions;

type AlertTypesStrings = "loading" | "success" | "error" | "warning" | "info";

const alertTypes: { [key: string]: SwalOptions } = {
    loading: {
        title: "Carregando...",
        text: "Procurando e carregando dados",
        iconHtml: `<img src="${Spinner}" alt="Carregando..." />`,
        customClass: {
            popup: "swal2-custom-loading",
        },
        allowOutsideClick: false,
    },
    success: {
        icon: "success",
    },
    error: {
        icon: "error",
    },
    warning: {
        icon: "warning",
    },
    info: {
        icon: "info",
    },
};

interface IAlertModal {
    createModal: (type?: AlertTypesStrings, options?: SwalOptions) => void;
    clearModal: () => void;
    createModalAsync: (type?: AlertTypesStrings, options?: SwalOptions) => Promise<any>;
}

const useAlertModal = (): IAlertModal => {
    const createModal = React.useCallback((type?: AlertTypesStrings, options?: SwalOptions): void => {
        const swalObject: SwalOptions = {
            ...alertTypes[type || "loading"],
            ...options,
        };
        swal.fire(swalObject);
    }, []);

    const createModalAsync = React.useCallback(async (type?: AlertTypesStrings, options?: SwalOptions): Promise<any> => {
        const swalObject = {
            ...alertTypes[type || "loading"],
            ...options,
        };
        return await swal.fire(swalObject);
    }, []);

    const clearModal = React.useCallback((): void => {
        swal.close();
    }, []);

    return { createModal, clearModal, createModalAsync };
};

const AlertModalStyles = createGlobalStyle`
    .swal2-modal {
        width: 450px;
        border: 3px solid var(--color-grey-450);
        & > .swal2-icon {
            margin-top: 25px;
        }
        & > .swal2-title {
            font-family: var(--font-primary);
            font-weight: 600;
            font-size: 24px;
            color: var(--color-black);
        }
        & > .swal2-text {
            font-family: var(--font-primary);
            font-weight: 400;
            font-size: 16px;
        }
        & > .swal2-html-container {
            font-family: var(--font-primary);
            font-weight: 400;
            font-size: 16px;
        }
        & > .swal2-actions {
            button {
                padding: 14px 20px;
            }
        }
        & > .swal2-footer {
            text-align: center;
            button {
                border-radius: 2px;
                padding: 13px 35px;
                transition: all 0.2s;
                font-size: 16px;
                &:hover {
                    background-color: #5b718b;
                }
            }
        }
    }
    .swal2-custom-loading {
        width: 290px;
        padding-top: 50px;
        padding-bottom: 30px;
        & > .swal2-icon {
            user-select: none;
            margin-top: 0px;
            width: 160px;
            border: none;
            & > .swal2-icon-content {
                width: 200px;
                & > img {
                    width: 100%;
                    display: block;
                }
            }
        }
        & > .swal2-title {
            user-select: none;
        }
        & > .swal2-text {
            user-select: none;
            margin-bottom: 40px;
        }
        & > .swal2-footer {
            display: none;
        }
        & > .swal2-actions {
            display: none !important;
        }
    }
`;

export { alertTypes, useAlertModal, AlertModalStyles };
export type { SwalOptions };
