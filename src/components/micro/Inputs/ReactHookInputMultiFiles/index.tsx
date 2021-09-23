import React from "react";
import { useFormContext } from "react-hook-form";
import { FiX } from "react-icons/fi";
import md5 from "md5";
import { useDropzone, DropzoneOptions } from "react-dropzone";

import { FileData } from "entities/FileData";

import { Container, InputField, DragDropContainer } from "./styles";

export type ReactHookInputMultiFilesProps = React.InputHTMLAttributes<HTMLInputElement> &
    DropzoneOptions & {
        label: string;
        name: string;
        isHorizontal?: boolean | string;
        thinBorder?: boolean;
        containerClassName?: string;
    };

const ReactHookInputMultiFiles: React.FC<ReactHookInputMultiFilesProps> = ({
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
    const {
        register,
        getValues,
        setValue,
        watch,
        formState: { errors, touchedFields },
    } = useFormContext();
    const fileRef = React.useRef<HTMLInputElement | null>(null);

    const { onChange, ref, ...registeredItems } = register(name);

    React.useEffect(() => {
        setValue(name, []);
        return () => {
            (watch(name) as FileData[]).forEach((fileData) => URL.revokeObjectURL(fileData.url));
        };
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const { [name]: fileValues } = getValues();
        if (files) {
            const filesEncodedList = Array.from(files);
            const filesList = filesEncodedList.map((file) => {
                const fileUrl = URL.createObjectURL(file);
                return { id: md5(fileUrl), url: fileUrl, file: file };
            });
            setValue(name, [...filesList.concat(fileValues || [])], { shouldValidate: true });
        }
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };

    const handleDeleteImgClick = (fileData: FileData) => {
        const { [name]: fileValues } = getValues();
        URL.revokeObjectURL(fileData.url);
        setValue(
            name,
            (fileValues as FileData[]).filter((file) => file.id !== fileData.id),
            { shouldValidate: true },
        );
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
                        onChange={handleChange}
                        {...getInputProps()}
                        {...registeredItems}
                        {...props}
                    />
                    <p>{placeholder ? placeholder : "Solte os arquivos de imagem aqui!"}</p>
                </DragDropContainer>
                <span className="form-error">{errors[name]?.message}</span>
                <section className="form-preview">
                    {((watch(name) as FileData[]) || []).map((fileData) => (
                        <div className="preview-bg" key={fileData.id}>
                            <div className="preview-img" style={{ backgroundImage: `url(${fileData.url})` }}></div>
                            <button onClick={() => handleDeleteImgClick(fileData)}>
                                <FiX size={16} color="var(--color-white)" />
                            </button>
                        </div>
                    ))}
                </section>
            </InputField>
        </Container>
    );
};

export default ReactHookInputMultiFiles;
