import React from "react";

import { NivelEnum, NivelLabel, TurnoEnum, TurnoLabel } from "entities/Aluno";
import { AlunoListObj } from "entities/Aluno";

import { useNavCard } from "contexts/NavCard";

import { MapView, Marker } from "components/micro/MapView";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container } from "./styles";

type AlunoLocation = {
    lat: number | null;
    lng: number | null;
    nivel: NivelEnum;
    turno: TurnoEnum;
    icon: string;
};

const Localizacao: React.FC = () => {
    const [center, setCenter] = React.useState<{ lat: number; lng: number } | undefined>();
    const [locations, setLocations] = React.useState<AlunoLocation[]>([]);

    const { aditionalData } = useNavCard();
    const [alunosData] = aditionalData?.alunosData as [AlunoListObj[]];

    React.useEffect(() => {
        if (alunosData) {
            setLocations(
                alunosData.map((aluno) => ({
                    icon: AlunosMarker,
                    lat: aluno.loc_latitude ? Number(aluno.loc_latitude) : null,
                    lng: aluno.loc_longitude ? Number(aluno.loc_longitude) : null,
                    nivel: aluno.nivel!,
                    turno: aluno.turno!,
                })),
            );
        }
    }, [alunosData]);

    React.useEffect(() => {
        locations.some((location) => {
            if (location.lat && location.lng) {
                setCenter({ lat: location.lat, lng: location.lng });
                return true;
            }
            return false;
        });
    }, [locations]);

    return (
        <Container>
            <MapView title="LOCALIZAÇÃO ALUNOS" center={center}>
                {locations.map((location) => location.lat && location.lng && <Marker lat={location.lat} lng={location.lng} icon={location.icon} />)}
            </MapView>
        </Container>
    );
};

export default Localizacao;
