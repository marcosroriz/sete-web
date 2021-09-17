import React from "react";
import { useFormContext } from "react-hook-form";
import md5 from "md5";
import { useDropzone, DropzoneOptions } from "react-dropzone";

import { FileData } from "entities/FileData";

import UserCircle from "assets/icons/fa-user-circle.svg";

import { InputField, DragDropContainer } from "./styles";

export type ReactHookInputMultiFilesProps = React.InputHTMLAttributes<HTMLInputElement> &
    DropzoneOptions & {
        name: string;
        dimensions: string;
        containerClassName?: string;
        beforeImageDelete?(file: FileData): void;
    };

const ReactHookInputProfilePic: React.FC<ReactHookInputMultiFilesProps> = ({
    // NormalProps
    name,
    dimensions,
    placeholder,
    containerClassName,
    beforeImageDelete,
    // DropzoneProps
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
        accept: "image/*",
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
    const {
        register,
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const { onChange, ref, ...registeredItems } = register(name);
    const fileRef = React.useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files?.[0]) {
            const fileEncoded = files[0];
            const fileUrl = URL.createObjectURL(fileEncoded);
            const fileData = { id: md5(fileUrl), url: fileUrl, file: fileEncoded };
            setValue(name, fileData, { shouldValidate: true });
        }
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };

    const handleDeleteImgClick = () => {
        const { [name]: fileValue } = getValues();
        if (beforeImageDelete) {
            beforeImageDelete(fileValue);
        }
        if (fileValue) {
            URL.revokeObjectURL(fileValue.url);
            setValue(name, undefined, { shouldValidate: true });
        }
    };

    return (
        <InputField>
            <DragDropContainer
                dimensions={dimensions}
                {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
                style={{ backgroundImage: `url('${(watch(name) as FileData)?.url || UserCircle}')` }}
            >
                <input
                    id={name}
                    className="form-control"
                    aria-invalid={!!errors[name]}
                    type="file"
                    ref={fileRef}
                    onChange={handleChange}
                    {...getInputProps()}
                    {...registeredItems}
                    {...props}
                />
                <div className="drag-drop-hover">
                    <span>{placeholder ? placeholder : "Solte os arquivos de imagem aqui!"}</span>
                </div>
            </DragDropContainer>
        </InputField>
    );
};

export default ReactHookInputProfilePic;
