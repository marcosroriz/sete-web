/**
 * Componente contendo Label, MultiFiles e ErrorMessage integrado com React-Hook-Forms.
 * Esse componente é utilizado para quando se precisa fazer upload de arquivos para o servidor.
 */

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDropzone, DropzoneOptions } from "react-dropzone";

import { FileData } from "entities/FileData";

import { Container, InputField, DragDropContainer } from "./styles";

export type ReactHookInputFileProps = React.InputHTMLAttributes<HTMLInputElement> &
    DropzoneOptions & {
        label: string;
        name: string;
        isHorizontal?: boolean | string;
        thinBorder?: boolean;
        containerClassName?: string;
    };

const ReactHookInputFile: React.FC<ReactHookInputFileProps> = ({
    // NormalProps
    label,
    name,
    placeholder,
    containerClassName,
    isHorizontal,
    thinBorder,
    // DropzoneProps
    accept,
    minSize,
    maxSize,
    maxFiles,
    preventDropOnDocument,
    noClick,
    noKeyboard,
    noDrag,
    noDragEventsBubbling,
    disabled,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    validator,
    // InputProps
    ...props
}) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop: (acceptedFiles) => handleChange({ target: { files: acceptedFiles } } as any),
        accept,
        minSize,
        maxSize,
        maxFiles,
        preventDropOnDocument,
        noClick,
        noKeyboard,
        noDrag,
        noDragEventsBubbling,
        disabled,
        onDropAccepted,
        onDropRejected,
        onFileDialogCancel,
        validator,
    });
    const file = useWatch({ name });
    const {
        register,
        setValue,
        formState: { errors, touchedFields },
    } = useFormContext();
    const fileRef = React.useRef<HTMLInputElement | null>(null);

    const { onChange, ref, ...registeredItems } = register(name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const file = files[0];
            setValue(name, file, { shouldValidate: true });
        }
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };

    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder}>
                <DragDropContainer {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
                    <input
                        id={name}
                        className="form-control"
                        aria-invalid={!!errors[name]}
                        type="file"
                        ref={fileRef}
                        {...getInputProps()}
                        {...registeredItems}
                        {...props}
                    />
                    <p>{placeholder ? placeholder : "Solte os arquivos de imagem aqui!"}</p>
                </DragDropContainer>
                <span className="form-error">{errors[name]?.message}</span>
                <section className="form-preview">
                    <span>{file?.name}</span>
                </section>
            </InputField>
        </Container>
    );
};

export default ReactHookInputFile;
