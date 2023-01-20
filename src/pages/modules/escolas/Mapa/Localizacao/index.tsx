import React from "react";
import { Button } from "react-bootstrap";
import { toPng } from "html-to-image";

import { EscolaListObj } from "entities/Escola";

import { useNavCard } from "contexts/NavCard";
import { useAlertModal } from "hooks/AlertModal";

import { formatHelper } from "helpers/FormatHelper";

import InputSelect from "components/micro/Inputs/InputSelect";
import { MapView, Marker } from "components/micro/MapView";

import EscolasMarker from "assets/icons/escolas/escolas-marker.png";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Container, ContainerItem, ContainerIcons } from "./styles";
import { BsCircleFill } from "react-icons/bs";

type EscolaLocation = {
    lat: number | null;
    lng: number | null;
    icon: string;
    id_escola: number;
    nome: string;
    ensino: string;
    horarioFuncionamento: string;
};

type SelectOptions = {
    value: string;
    label: any;
    lat: number | null;
    lng: number | null;
};

const Localizacao: React.FC = () => {
    const { createModal, clearModal } = useAlertModal();

    const [center, setCenter] = React.useState<{ lat: number; lng: number } | undefined>();
    const [centerEscola, setCenterEscola] = React.useState<{ lat: number; lng: number } | undefined>();
    const [locations, setLocations] = React.useState<EscolaLocation[]>([]);
    const [escolasOptions, setEscolasOptions] = React.useState<SelectOptions[]>([]);
    const [selectedOption, setSelectedOption] = React.useState<SelectOptions>();
    const [helperCircle, setHelperCircle] = React.useState<Boolean | undefined>(false);

    const { aditionalData } = useNavCard();
    const [escolasData] = aditionalData?.escolasData as [EscolaListObj[]];

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (escolasData) {
            setLocations(
                escolasData.map((escola) => ({
                    icon: EscolasMarker,
                    lat: escola.loc_latitude ? Number(escola.loc_latitude) : null,
                    lng: escola.loc_longitude ? Number(escola.loc_longitude) : null,
                    id_escola: escola.id_escola,
                    nome: escola.nome,
                    ensino: [
                        formatHelper.parseSNToString(escola.ensino_pre_escola, "Infantil"),
                        formatHelper.parseSNToString(escola.ensino_fundamental, "Fundamental"),
                        formatHelper.parseSNToString(escola.ensino_medio, "Médio"),
                        formatHelper.parseSNToString(escola.ensino_superior, "Superior"),
                    ].joinValid(", "),
                    horarioFuncionamento: [
                        formatHelper.parseSNToString(escola.horario_matutino, "Manhã"),
                        formatHelper.parseSNToString(escola.horario_vespertino, "Tarde"),
                        formatHelper.parseSNToString(escola.horario_noturno, "Noite"),
                    ].joinValid(", "),
                })),
            );
            setEscolasOptions(
                escolasData.map((escola) => ({
                    value: escola.nome,
                    label: (
                        <>
                            {escola.nome}

                            {escola.loc_latitude && escola.loc_longitude ? (
                                <FaCheck style={{ marginBottom: "2px" }} color="green" size={17} />
                            ) : (
                                <FaTimes style={{ marginBottom: "2px" }} color="red" size={17} />
                            )}
                        </>
                    ),
                    lat: escola.loc_latitude ? Number(escola.loc_latitude) : null,
                    lng: escola.loc_longitude ? Number(escola.loc_longitude) : null,
                })),
            );
        }
    }, [escolasData]);

    React.useEffect(() => {
        locations.some((location) => {
            if (location.lat && location.lng) {
                setCenter({ lat: location.lat, lng: location.lng });
                return true;
            }
            return false;
        });
    }, [locations]);

    React.useEffect(() => {
        if (!!selectedOption)
            if (selectedOption.lat && selectedOption.lng) {
                setCenterEscola({ lat: selectedOption.lat, lng: selectedOption.lng });
                setHelperCircle(true);
            } else {
                createModal("error", { title: "Ops... Tivemos um problema", html: "Essa escola ainda não foi georeferenciada" });
            }
    }, [selectedOption]);

    const handleChange = (e) => {
        setSelectedOption(e);
    };

    const exportMapPNG = React.useCallback(() => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-image-name.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ref]);

    return (
        <Container>
            <ContainerItem>
                <InputSelect
                    label="SELECIONE A ESCOLA"
                    name="escolas"
                    options={escolasOptions}
                    onChange={handleChange}
                    placeholder="Escolha uma escola"
                    isHorizontal={false}
                    hasPlaceholderOption
                />
            </ContainerItem>
            <div ref={ref}>
                <MapView title="LOCALIZAÇÃO ALUNOS" center={center} centerEscola={centerEscola} escola>
                    {locations.map(
                        (location) =>
                            location.lat &&
                            location.lng && (
                                <Marker
                                    lat={location.lat}
                                    lng={location.lng}
                                    icon={location.icon}
                                    idEscola={location.id_escola}
                                    nome={location.nome}
                                    ensino={location.ensino}
                                    horarioFuncionamento={location.horarioFuncionamento}
                                />
                            ),
                    )}
                </MapView>
            </div>
            <ContainerIcons>
                <div>
                    <BsCircleFill
                        color="#e34a33"
                        size={20}
                        style={{
                            marginRight: "5px",
                        }}
                    />
                    <strong> 15 km</strong>
                </div>
                <div>
                    <BsCircleFill
                        color="#fdbb84"
                        size={20}
                        style={{
                            marginRight: "5px",
                        }}
                    />
                    <strong> 10 km</strong>
                </div>
                <div>
                    <BsCircleFill
                        color="#fee8c8"
                        size={20}
                        style={{
                            marginRight: "5px",
                        }}
                    />
                    <strong>5 km</strong>
                </div>
            </ContainerIcons>
            <Button onClick={exportMapPNG}>Download Imagem do Mapa (JPEG)</Button>
        </Container>
    );
};

export default Localizacao;
