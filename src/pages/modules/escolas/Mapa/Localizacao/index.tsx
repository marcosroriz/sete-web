import React from "react";

import { EscolaListObj } from "entities/Escola";

import { useNavCard } from "contexts/NavCard";
import { useAlertModal } from "hooks/AlertModal";

import InputSelect from "components/micro/Inputs/InputSelect";
import { MapView, Marker } from "components/micro/MapView";

import EscolasMarker from "assets/icons/escolas/escolas-marker.png";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Container, ContainerItem } from "./styles";

type EscolaLocation = {
    lat: number | null;
    lng: number | null;
    icon: string;
    name: string;
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
    const [locations, setLocations] = React.useState<EscolaLocation[]>([]);
    const [escolasOptions, setEscolasOptions] = React.useState<SelectOptions[]>([]);
    const [selectedOption, setSelectedOption] = React.useState<SelectOptions>();

    const { aditionalData } = useNavCard();
    const [escolasData] = aditionalData?.escolasData as [EscolaListObj[]];

    React.useEffect(() => {
        if (escolasData) {
            setLocations(
                escolasData.map((escola) => ({
                    icon: EscolasMarker,
                    lat: escola.loc_latitude ? Number(escola.loc_latitude) : null,
                    lng: escola.loc_longitude ? Number(escola.loc_longitude) : null,
                    name: escola.nome,
                })),
            );
            setEscolasOptions(
                escolasData.map((escola) => ({
                    value: escola.nome,
                    label: (
                        <>
                            {escola.nome}{" "}
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
        if (!!selectedOption)
            if (selectedOption.lat && selectedOption.lng) {
                setCenter({ lat: selectedOption.lat, lng: selectedOption.lng });
            } else {
                createModal("error", { title: "Ops... Tivemos um problema", html: "Essa escola ainda não foi georeferenciada" });
            }
    }, [selectedOption]);

    const handleChange = (e) => {
        setSelectedOption(e);
    };

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

            <MapView title="LOCALIZAÇÃO ALUNOS" center={center}>
                {locations.map((location) => location.lat && location.lng && <Marker lat={location.lat} lng={location.lng} icon={location.icon} />)}
            </MapView>
        </Container>
    );
};

export default Localizacao;
