import React from "react";
import { Button } from "react-bootstrap";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { nextStep } = useReactHookNavCard();

    return (
        <Container>
            <BlockTitle message="PREENCHA OS DADOS REFERENTES A LOCALIZAÇÃO DO ALUNO." />
            <ReactHookLatLngMap title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO (CLIQUE NO MAPA)" mapController={mapRef} name="latlng" icon={AlunosMarker} />
            <ReactHookFormItemCard placeItems="center" required>
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
                    <ReactHookInputRadio label="Área urbana" value="1" name="mec_tp_localizacao" position="right" />
                    <ReactHookInputRadio label="Área rural" value="2" name="mec_tp_localizacao" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="ENDEREÇO" name="loc_endereco" isHorizontal={mediaQuery.desktop} />
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
            <ButtonsContainer>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
                <Button variant="info" type="button" className="btn-fill" onClick={() => console.log(mapRef.current)}>
                    Vai
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Localizacao;
