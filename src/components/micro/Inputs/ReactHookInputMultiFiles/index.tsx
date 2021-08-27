import React from "react";
import { useFormContext } from "react-hook-form";
import { FiX } from "react-icons/fi";

import { Container, InputField } from "./styles";

export type ReactHookInputMultiFilesProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isHorizontal?: boolean | string;
    thinBorder?: boolean;
    containerClassName?: string;
};

const ReactHookInputMultiFiles: React.FC<ReactHookInputMultiFilesProps> = ({ label, name, containerClassName, isHorizontal, thinBorder, ...props }) => {
    const {
        register,
        getValues,
        setValue,
        formState: { errors, touchedFields },
    } = useFormContext();
    const [filesList, setFilesList] = React.useState<string[]>([]);

    const { onChange, ...registeredItems } = register(name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesEncodedList = Array.from(files);
            const filesUrlList = Array.from(files).map((file) => URL.createObjectURL(file));
            setFilesList([...filesUrlList]);
            console.log(filesEncodedList);
        }
        onChange(event);
    };

    const handleDeleteImgCLick = (fileName: string) => {
        (document.querySelector(`#${name}`) as any).value = "";
        const { [name]: value } = getValues();
        let newValue = [...value];
        newValue.filter((value) => value);
        console.log("value", value);
        // const itens = Array.from(value as FileList).map(() => );
    };

    return (
        <Container
            className={containerClassName}
            isHorizontal={!!isHorizontal}
            horizontalMedia={(isHorizontal as any) instanceof String || typeof isHorizontal === "string" ? (isHorizontal as string) : ""}
        >
            <label htmlFor={name}>{label}</label>
            <InputField isTouched={touchedFields[name]} isInvalid={!!errors[name]} thinBorder={thinBorder}>
                <input
                    accept="image/*"
                    id={name}
                    className="form-control"
                    onChange={handleChange}
                    aria-invalid={!!errors[name]}
                    type="file"
                    multiple
                    {...registeredItems}
                    {...props}
                />
                <span className="form-error">{errors[name]?.message}</span>
                <section>
                    {filesList.map((fileStr) => (
                        <div className="icon" key={fileStr}>
                            <img src={fileStr} alt="file: filesList" />
                            <FiX size={20} onClick={() => handleDeleteImgCLick(fileStr)} />
                        </div>
                    ))}
                </section>
            </InputField>
        </Container>
    );
};

export default ReactHookInputMultiFiles;
