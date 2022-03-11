import React from "react";
import { useFormContext } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useNavCard } from "contexts/NavCard";
import { Aluno } from "entities/Aluno";
import { Escola } from "entities/Escola";

import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container, mediaQuery } from "./styles";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];
type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const mapRef2 = React.useRef<MapControlEvents | null>(null);
    const { setValue } = useFormContext();
    const { aditionalData } = useReactHookNavCard();

    const [alunoData] = aditionalData?.alunoData as AlunoData;
    const [escolaData] = aditionalData?.escolaData as EscolaData;

    React.useEffect(() => {
        if (!!alunoData) {
            setValue("latlng", [alunoData?.loc_latitude, alunoData?.loc_longitude]);

            if (alunoData?.loc_latitude && alunoData?.loc_longitude) {
                mapRef.current?.goToLocation([Number(alunoData?.loc_longitude), Number(alunoData?.loc_latitude)]);
            }
        }

        if (!!escolaData) {
            setValue("latlng2", [escolaData?.loc_latitude, escolaData?.loc_longitude]);

            if (escolaData?.loc_latitude && escolaData?.loc_longitude) {
                mapRef2.current?.goToLocation([Number(alunoData?.loc_longitude), Number(alunoData?.loc_latitude)]);
            }
        }
    }, [alunoData, escolaData]);

    mapRef.current?.updateSize();

    return (
        <Container>
            <ReactHookLatLngMap isView={true} title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO" mapController={mapRef} name="latlng" icon={AlunosMarker} />
            <ReactHookMultiFormList
                name="latlng"
                isHorizontal={mediaQuery.desktop}
                fieldsHorizontal={mediaQuery.mobile}
                formListSpacing="20px"
            ></ReactHookMultiFormList>
        </Container>
    );
};

export default Localizacao;
