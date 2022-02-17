import React from "react";
import { useFormContext } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useNavCard } from "contexts/NavCard";
import { Aluno } from "entities/Aluno";

import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container, mediaQuery } from "./styles";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { aditionalData } = useReactHookNavCard();
    const { setValue } = useFormContext();

    const [alunoData] = aditionalData?.alunoData as AlunoData;

    React.useEffect(() => {
        if (alunoData) {
            setValue("latlng[0]", alunoData?.loc_latitude || "");
            setValue("latlng[1]", alunoData.loc_longitude || "");

            if (alunoData?.loc_latitude && alunoData?.loc_longitude) {
                mapRef.current?.goToLocation([Number(alunoData?.loc_longitude), Number(alunoData?.loc_latitude)]);
            }
        }
    }, [alunoData]);

    return (
        <Container>
            <ReactHookLatLngMap title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO" mapController={mapRef} name="latlng" icon={AlunosMarker} />
            <ReactHookFormItemCard placeItems="center" required>
                <ReactHookMultiFormList name="modo" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="20px">
                    <ReactHookInputText label="LATITUDE:" name="latlng[0]" isHorizontal={mediaQuery.desktop} dontShowError disabled />
                    <ReactHookInputText label="LONGITUDE:" name="latlng[1]" isHorizontal={mediaQuery.desktop} dontShowError disabled />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
        </Container>
    );
};

export default Localizacao;
