import React from "react";
import { useDebounce } from "hooks/Debounce";

import { NivelEnum, NivelLabel, TurnoEnum, TurnoLabel } from "entities/Aluno";
import { AlunoListObj } from "entities/Aluno";

import { useNavCard } from "contexts/NavCard";

import MultiFormList from "components/micro/Inputs/MultiFormList";
import InputCheckbox from "components/micro/Inputs/InputCheckbox";
import { MapView, Marker } from "components/micro/MapView";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container, ContainerItem, mediaQuery } from "./styles";
import { formatHelper } from "helpers/FormatHelper";

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
    const [locations2, setLocations2] = React.useState<AlunoLocation[]>([]);
    const [checkedNivel, setCheckedNivel] = React.useState<any>([]);
    const [checkedTurno, setCheckedTurno] = React.useState<any>([]);

    const { aditionalData } = useNavCard();
    const [alunosData] = aditionalData?.alunosData as [AlunoListObj[]];

    const handleCheckNivel = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...checkedNivel];
        if (event.target.checked) {
            updatedList = [...checkedNivel, event.target.value];
        } else {
            updatedList.splice(checkedNivel.indexOf(event.target.value), 1);
        }
        setCheckedNivel(updatedList);
    };

    const handleCheckTurno = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...checkedTurno];
        if (event.target.checked) {
            updatedList = [...checkedTurno, event.target.value];
        } else {
            updatedList.splice(checkedTurno.indexOf(event.target.value), 1);
        }
        setCheckedTurno(updatedList);
    };

    const nivelOptions = formatHelper
        .getNumbersEnumValues(NivelEnum)
        .map((value) => (
            <InputCheckbox
                key={value}
                name="nivel"
                label={NivelLabel.get(value as NivelEnum) || ""}
                value={value.toString()}
                position="right"
                onChange={handleCheckNivel}
            />
        ));

    const turnoOptions = formatHelper
        .getNumbersEnumValues(TurnoEnum)
        .map((value) => (
            <InputCheckbox
                key={value}
                name="turno"
                label={TurnoLabel.get(value as TurnoEnum) || ""}
                value={value.toString()}
                position="right"
                onChange={handleCheckTurno}
            />
        ));

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
        if (locations) {
            setLocations2(locations.filter((loc) => checkedNivel.includes(loc.nivel.toString()) || checkedTurno.includes(loc.turno.toString())));
        }
    }, [checkedNivel, checkedTurno]);

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
            <ContainerItem>
                <MultiFormList label="NÍVEL DE ENSINO" name="nivel" formListSpacing="30px" fieldsHorizontal={mediaQuery.desktop}>
                    {nivelOptions}
                </MultiFormList>
            </ContainerItem>
            <ContainerItem>
                <MultiFormList label="TURNO" name="turno" formListSpacing="30px" fieldsHorizontal={mediaQuery.desktop}>
                    {turnoOptions}
                </MultiFormList>
            </ContainerItem>
            <MapView title="LOCALIZAÇÃO ALUNOS" center={center}>
                {locations2.map((location) => location.lat && location.lng && <Marker lat={location.lat} lng={location.lng} icon={location.icon} />)}
            </MapView>
        </Container>
    );
};

export default Localizacao;
