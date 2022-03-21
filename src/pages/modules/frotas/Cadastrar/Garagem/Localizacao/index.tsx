import React from "react";
import { Button } from "react-bootstrap";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";

import GaragemMarker from "assets/icons/garagem/garagem-marker.png";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleFormCancel = async () => {
        try {
            createModal("warning", { title: "Cancelar Edição?", html: "Se você cancelar, nenhuma alteração será feita. " });
        } catch (err) {
            errorHandler(err, { title: "Erro ao Cancelar Edição" });
        }
    };

    return (
        <Container>
            <BlockTitle message="PREENCHA OS DADOS REFERENTES A GARAGEM DO MUNICÍPIO." />
            <ReactHookLatLngMap
                title="VOCÊ PODE CLICAR NO MAPA PARA MUDAR A LOCALIZAÇÃO DA GARAGEM."
                name="latlng"
                mapController={mapRef}
                icon={GaragemMarker}
            />
            <ReactHookFormItemCard placeItems="center" required>
                <ReactHookMultiFormList name="modo" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="20px">
                    <ReactHookInputText label="LATITUDE:*" name="latlng[0]" isHorizontal={mediaQuery.desktop} />
                    <ReactHookInputText label="LONGITUDE:*" name="latlng[1]" isHorizontal={mediaQuery.desktop} />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard placeItems="center">
                <ReactHookInputText label="ENDEREÇO:" name="loc_endereco" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard placeItems="center">
                <ReactHookInputNumberFormat label="CEP:" name="loc_cep" format="#####-###" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ButtonsContainer>
                <Button variant="danger" type="button" className="btn-fill" onClick={handleFormCancel}>
                    Cancelar Edição
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Salvar
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Localizacao;
