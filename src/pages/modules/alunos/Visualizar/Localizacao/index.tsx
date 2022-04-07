import React from "react";

import { useNavCard } from "contexts/NavCard";
import { Aluno } from "entities/Aluno";
import { Escola } from "entities/Escola";

import { MapView, Marker } from "components/micro/MapView";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";
import EscolasMarker from "assets/icons/escolas/escolas-marker.png";

import { Container } from "./styles";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];
type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const Localizacao: React.FC = () => {
    const [center, setCenter] = React.useState<{ lat: number; lng: number } | undefined>();
    const { aditionalData } = useNavCard();

    const [alunoData] = aditionalData?.alunoData as AlunoData;
    const [escolaData] = aditionalData?.escolaData as EscolaData;

    React.useEffect(() => {
        if (alunoData && escolaData) {
            if (alunoData.loc_latitude && alunoData.loc_longitude) {
                setCenter({ lat: Number(alunoData.loc_latitude), lng: Number(alunoData.loc_longitude) });
            } else if (escolaData.loc_latitude && escolaData.loc_longitude) {
                setCenter({ lat: Number(escolaData.loc_latitude), lng: Number(escolaData.loc_longitude) });
            }
        }
    }, [alunoData, escolaData]);

    return (
        <Container>
            <MapView title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO" center={center}>
                {alunoData && <Marker lat={Number(alunoData.loc_latitude)} lng={Number(alunoData.loc_longitude)} icon={AlunosMarker} />}
                {escolaData && <Marker lat={Number(escolaData.loc_latitude)} lng={Number(escolaData.loc_longitude)} icon={EscolasMarker} />}
            </MapView>
        </Container>
    );
};

export default Localizacao;
