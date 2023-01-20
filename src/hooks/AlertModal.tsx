/**
 * Hook que lida com os alertas da aplicação bem como o loading.
 */

import React from "react";
import sweetalert, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createGlobalStyle } from "styled-components";

import Spinner from "assets/icons/spinner.svg";

type SwalOptions = SweetAlertOptions;

const swal = withReactContent(sweetalert);

const alertTypes = {
    loading: {
        title: "Carregando...",
        text: "Procurando e carregando dados",
        iconHtml: `<img src="${Spinner}" alt="Carregando..." />`,
        customClass: {
            popup: "swal2-custom-loading",
        },
        allowOutsideClick: false,
    },
    progress: {
        title: "Carregando...",
        html: `
            <p>Enviando dados para o servidor</p>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" id="progressbar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
        `,
        iconHtml: `<img src="${Spinner}" alt="Carregando..." />`,
        customClass: {
            popup: "swal2-custom-loading swal2-custom-progress",
        },
        allowOutsideClick: false,
    },
    confirm_remove: {
        icon: "warning",
        title: "Atenção!",
        confirmButtonText: "Remover",
        confirmButtonColor: "var(--color-red-500)",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "var(--color-grey-650)",
        reverseButtons: true,
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
} as const;

type AlertTypesStrings = keyof typeof alertTypes;

interface IAlertModal {
    createModal: (type?: AlertTypesStrings, options?: SwalOptions) => void;
    clearModal: () => void;
    createModalAsync: (type?: AlertTypesStrings, options?: SwalOptions) => Promise<SweetAlertResult<any>>;
    incrementProgress: (increment: number) => void;
    queueModal: (alerts: any[]) => void;
}

const useAlertModal = (): IAlertModal => {
    const progress = React.useRef<number>(0);

    const incrementProgress = React.useCallback(
        (increment: number) => {
            const progressBar = document.querySelector("#progressbar") as any;
            if (progressBar && progress.current < 100) {
                const incrementSum = progress.current + Number(increment.toPrecision(2));
                progress.current = incrementSum <= 100 ? incrementSum : 100;
                progressBar.style.width = `${progress.current}%`;
                progressBar.innerHTML = `${progress.current}%`;
            }
        },
        [progress],
    );

    const createModal = React.useCallback((type?: AlertTypesStrings, options?: SwalOptions): void => {
        const swalObject: SwalOptions = {
            ...alertTypes[type || "loading"],
            ...options,
        };
        swal.fire(swalObject);
    }, []);

    const queueModal = React.useCallback((alerts: any[]): void => {
        const steps = ["1", "2", "3"];
        const Queue = swal.mixin({
            progressSteps: steps,
            confirmButtonText: "Próximo >",
            // optional classes to avoid backdrop blinking between steps
            showClass: { backdrop: "swal2-noanimation" },
            hideClass: { backdrop: "swal2-noanimation" },
        });

        if (!!alerts && alerts.length > 0)
            alerts.forEach(async (alert, index) => {
                console.log(alert);
                await Queue.fire({
                    title: alert.title,
                    currentProgressStep: index,
                    confirmButtonText: "OK",
                });
            });
    }, []);

    const createModalAsync = React.useCallback(async (type?: AlertTypesStrings, options?: SwalOptions): Promise<SweetAlertResult<any>> => {
        const swalObject = {
            ...alertTypes[type || "loading"],
            ...options,
        };
        return await swal.fire(swalObject);
    }, []);

    const clearModal = React.useCallback((): void => {
        swal.close();
        progress.current = 0;
    }, []);

    return { createModal, clearModal, createModalAsync, incrementProgress, queueModal };
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
    .swal2-custom-progress {
        width: 400px;
        padding-top: 40px;
        .progress {
            margin-top: 10px;
        }
    }
`;

export { alertTypes, useAlertModal, AlertModalStyles };
export type { SwalOptions };
