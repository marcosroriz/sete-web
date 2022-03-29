import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useNavCard } from "contexts/NavCard";
import { Aluno, AlunoListObj, NivelEnum, NivelLabel } from "entities/Aluno";
import { Escola } from "entities/Escola";

import MapView from "components/micro/MapView";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";
import EscolasMarker from "assets/icons/escolas/escolas-marker.png";

import { Container, mediaQuery } from "./styles";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import { formatHelper } from "helpers/FormatHelper";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { useAuth } from "contexts/Auth";
import { AlunosService } from "services/Alunos";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];
type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const nivelOptions = formatHelper
    .getNumbersEnumValues(NivelEnum)
    .map((value) => (
        <ReactHookInputCheckbox key={value} name="nivel" label={NivelLabel.get(value as NivelEnum) || ""} value={value.toString()} position="right" />
    ));

const LocalizacaoAlunos: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { setValue } = useFormContext();
    const { aditionalData } = useReactHookNavCard();

    const [alunosData] = aditionalData?.alunosData as any;

    const [alunosLocations, setAlunosLocations] = React.useState<any | null>([]);
    const [locations, setLocations] = React.useState<any | null>([]);
    const arrayAux: any[] = [];

    React.useEffect(() => {
        if (!!alunosData) {
            alunosData.forEach((aluno) => {
                if (aluno.loc_latitude != null && aluno?.loc_longitude != null) {
                    let item = [aluno?.nivel, aluno?.turno, aluno?.loc_latitude, aluno?.loc_longitude, AlunosMarker];

                    alunosLocations.push(item);
                }
            });
            setAlunosLocations(alunosLocations);
            setValue("alunosLoc", alunosLocations);
        }
    }, [alunosData]);

    const alunosNivel = useWatch({
        name: "nivel",
    });

    React.useEffect(() => {
        setLocations([]);
        setValue("alunosLoc", locations);

        alunosLocations.forEach((loc) => {
            console.log("Nivel", alunosNivel);
            console.log("loc[0]", loc[0]);

            alunosNivel.forEach((val) => {
                if (val == loc[0]) {
                    arrayAux.push(loc);
                }
            });
        });

        setLocations(arrayAux);
        setValue("alunosLoc", locations);
    }, [alunosNivel]);

    return (
        <Container>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="EM QUAL NÍVEL DE ENSINO O ALUNO SE ENCONTRA?*"
                    name="nivel"
                    fieldsHorizontal={mediaQuery.desktop}
                    formListSpacing="30px"
                >
                    {nivelOptions}
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
