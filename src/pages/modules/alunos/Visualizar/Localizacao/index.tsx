import React from "react";
import { useFormContext } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useNavCard } from "contexts/NavCard";
import { Aluno } from "entities/Aluno";
import { Escola } from "entities/Escola";

import MapView from "components/micro/MapView";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";
import EscolasMarker from "assets/icons/escolas/escolas-marker.png";

import { Container, mediaQuery } from "./styles";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];
type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { setValue } = useFormContext();
    const { aditionalData } = useReactHookNavCard();

    const [alunoData] = aditionalData?.alunoData as AlunoData;
    const [escolaData] = aditionalData?.escolaData as EscolaData;

    React.useEffect(() => {
        if (!!alunoData) {
            setValue("latlng", [
                ["", "", alunoData?.loc_latitude, alunoData?.loc_longitude, AlunosMarker],
                ["", "", escolaData?.loc_latitude, escolaData?.loc_longitude, EscolasMarker],
            ]);

            if (alunoData?.loc_latitude && alunoData?.loc_longitude) {
                mapRef.current?.goToLocation([Number(alunoData?.loc_longitude), Number(alunoData?.loc_latitude)]);
            } else {
                if (escolaData?.loc_latitude && escolaData?.loc_longitude) {
                    mapRef.current?.goToLocation([Number(escolaData?.loc_longitude), Number(escolaData?.loc_latitude)]);
                }
            }
        }
    }, [alunoData, escolaData]);

    mapRef.current?.updateSize();

    return (
        <Container>
            <MapView title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO" mapController={mapRef} name="latlng" />
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
