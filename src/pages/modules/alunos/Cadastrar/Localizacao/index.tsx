import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";
import { formatHelper } from "helpers/FormatHelper";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { Aluno, MecTpLocalizacaoEnum, MecTpLocalizacaoLabel } from "entities/Aluno";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container, mediaQuery } from "./styles";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const mec_tp_localizacaoOptions = formatHelper
    .getNumbersEnumValues(MecTpLocalizacaoEnum)
    .map((value) => <ReactHookInputRadio key={value} name="mec_tp_localizacao" label={MecTpLocalizacaoLabel.get(value)!} value={value} position="right" />);

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { setValue } = useFormContext();
    const { nextStep, aditionalData } = useReactHookNavCard();
    const history = useHistory();

    const [alunoData] = aditionalData?.alunoData as AlunoData;

    React.useEffect(() => {
        if (!!alunoData) {
            setValue("latlng[0]", alunoData?.loc_latitude);
            setValue("latlng[1]", alunoData.loc_longitude);
            setValue("mec_tp_localizacao", alunoData?.mec_tp_localizacao?.toString());
            setValue("loc_endereco", alunoData?.loc_endereco);
            setValue("da_porteira", alunoData?.da_porteira === "S");
            setValue("da_mataburro", alunoData?.da_mataburro === "S");
            setValue("da_colchete", alunoData?.da_colchete === "S");
            setValue("da_atoleiro", alunoData?.da_atoleiro === "S");
            setValue("da_ponterustica", alunoData?.da_ponterustica === "S");

            if (alunoData?.loc_latitude && alunoData?.loc_longitude) {
                mapRef.current?.goToLocation([Number(alunoData?.loc_longitude), Number(alunoData?.loc_latitude)]);
            }
        }
    }, [alunoData]);

    const handleCancelEditClick = () => {
        history.goBack();
    };

    return (
        <Container>
            <BlockTitle message="PREENCHA OS DADOS REFERENTES A LOCALIZAÇÃO DO ALUNO." />
            <ReactHookLatLngMap title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO (CLIQUE NO MAPA)" mapController={mapRef} name="latlng" icon={AlunosMarker} />
            <ReactHookFormItemCard placeItems="center">
                <ReactHookMultiFormList name="latlng" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="20px">
                    <ReactHookInputText label="LATITUDE:" name="latlng[0]" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="LONGITUDE:" name="latlng[1]" isHorizontal={mediaQuery.desktop} dontShowError />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="O ALUNO ESTÁ LOCALIZADO EM:*"
                    name="mec_tp_localizacao"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    {mec_tp_localizacaoOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="ENDEREÇO" name="loc_endereco" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat label="CEP" name="loc_cep" format="#####-###" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="O LOCAL POSSUI ALGUMA DIFICULDADE DE ACESSO? SE SIM, MARQUE AS DIFICULDADES:"
                    formListSpacing="30px"
                    fieldsHorizontal={mediaQuery.desktop}
                >
                    <ReactHookInputCheckbox label="Porteira" name="da_porteira" />
                    <ReactHookInputCheckbox label="Mata-Burro" name="da_mataburro" />
                    <ReactHookInputCheckbox label="Colchete" name="da_colchete" />
                    <ReactHookInputCheckbox label="Atoleiro" name="da_atoleiro" />
                    <ReactHookInputCheckbox label="Ponte Rústica" name="da_ponterustica" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer position={!!alunoData ? "evenly" : "right"}>
                {!!alunoData && (
                    <Button variant="danger" type="button" className="btn-fill" onClick={handleCancelEditClick}>
                        Cancelar Edição
                    </Button>
                )}
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Localizacao;
