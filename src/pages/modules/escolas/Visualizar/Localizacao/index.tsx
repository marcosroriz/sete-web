import React from "react";

import { useNavCard } from "contexts/NavCard";
import { Aluno } from "entities/Aluno";
import { Escola } from "entities/Escola";

import { MapView, Marker } from "components/micro/MapView";

import EscolasMarker from "assets/icons/escolas/escolas-marker.png";

import { Container } from "./styles";

type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const Localizacao: React.FC = () => {
    const [center, setCenter] = React.useState<{ lat: number; lng: number } | undefined>();
    const { aditionalData } = useNavCard();

    const [escolaData] = aditionalData?.escolaData as EscolaData;

    React.useEffect(() => {
        if (escolaData) {
            if (escolaData.loc_latitude && escolaData.loc_longitude) {
                setCenter({ lat: Number(escolaData.loc_latitude), lng: Number(escolaData.loc_longitude) });
            }
        }
    }, [escolaData]);

    return (
        <Container>
            <MapView title="LOCALIZAÇÃO DA ESCOLA" center={center}>
                {escolaData && <Marker lat={Number(escolaData.loc_latitude)} lng={Number(escolaData.loc_longitude)} icon={EscolasMarker} />}
            </MapView>
        </Container>
    );
};

export default Localizacao;
