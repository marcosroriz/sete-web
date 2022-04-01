import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useNavCard } from "contexts/NavCard";
import { NivelEnum, NivelLabel, TurnoEnum, TurnoLabel } from "entities/Aluno";

import MapView from "components/micro/MapView";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container, mediaQuery } from "./styles";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import { formatHelper } from "helpers/FormatHelper";

const nivelOptions = formatHelper
    .getNumbersEnumValues(NivelEnum)
    .map((value) => (
        <ReactHookInputCheckbox key={value} name="nivel" label={NivelLabel.get(value as NivelEnum) || ""} value={value.toString()} position="right" />
    ));

const turnoOptions = formatHelper
    .getNumbersEnumValues(TurnoEnum)
    .map((value) => (
        <ReactHookInputCheckbox key={value} name="turno" label={TurnoLabel.get(value as TurnoEnum) || ""} value={value.toString()} position="right" />
    ));

type AlunoLocation = {
    loc_latitude: string;
    loc_longitude: string;
    nivel: string;
    turno: string;
    icon: string;
};

const LocalizacaoAlunos: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { setValue } = useFormContext();
    const { aditionalData } = useReactHookNavCard();

    const [alunosData] = aditionalData?.alunosData as any;

    const [alunosLocations, setAlunosLocations] = React.useState<AlunoLocation[]>([]);
    const locations: AlunoLocation[] = []; // Mudar para State / Ref

    const alunosNivel = useWatch({
        name: "nivel",
    });

    const alunosTurno = useWatch({
        name: "turno",
    });

    React.useEffect(() => {
        if (!!alunosData) {
            alunosData.forEach((aluno: AlunoLocation) => {
                if (aluno.loc_latitude != null && aluno?.loc_longitude != null) {
                    let item: AlunoLocation = {
                        nivel: aluno?.nivel,
                        turno: aluno?.turno,
                        loc_latitude: aluno?.loc_latitude,
                        loc_longitude: aluno?.loc_longitude,
                        icon: AlunosMarker,
                    };
                    alunosLocations.push(item); // Mudar para State / Ref
                }
            });
            setValue("alunosLoc", alunosLocations);
        }
    }, [alunosData]);

    React.useEffect(() => {
        alunosLocations.forEach((aluno: AlunoLocation) => {
            if (alunosNivel.includes(aluno.nivel.toString()) || alunosTurno.includes(aluno.turno.toString())) {
                locations.push(aluno); // Mudar para State / Ref
            }
        });
        setValue("alunosLoc", locations);
    }, [alunosNivel, alunosTurno]);

    return (
        <Container>
            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="EM QUAL NÍVEL DE ENSINO O ALUNO SE ENCONTRA?"
                    name="nivel"
                    fieldsHorizontal={mediaQuery.desktop}
                    formListSpacing="30px"
                >
                    {nivelOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookMultiFormList label="EM QUAL TURNO O ALUNO SE ESTÁ?" name="turno" fieldsHorizontal={mediaQuery.desktop} formListSpacing="30px">
                    {turnoOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookMultiFormList
                name="alunosLoc"
                isHorizontal={mediaQuery.desktop}
                fieldsHorizontal={mediaQuery.mobile}
                formListSpacing="20px"
            ></ReactHookMultiFormList>
            <MapView title="LOCALIZAÇÃO ALUNOS" mapController={mapRef} name="alunosLoc" />
        </Container>
    );
};

export default LocalizacaoAlunos;
