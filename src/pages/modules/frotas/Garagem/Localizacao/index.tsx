import React from "react";
import { Button } from "react-bootstrap";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import GaragemMarker from "assets/icons/garagem/garagem-marker.png";

import { Container, mediaQuery } from "./styles";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useHistory } from "react-router-dom";

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const history = useHistory();
    const { errorHandler } = useError();
    const { createModalAsync } = useAlertModal();

    const handleFormCancel = async () => {
        try {
            const alertResponse = await createModalAsync("warning", {
                title: "Cancelar Edição?",
                text: "Se você cancelar, nenhuma alteração será feita.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "var(--color-red-500",
                confirmButtonText: "Sim, cancelar",
                cancelButtonColor: "var(--color-grey-650)",
                cancelButtonText: "Voltar a editar",
                reverseButtons: true,
            });
            if (alertResponse.isConfirmed) {
                history.goBack();
            }
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
                <ReactHookMultiFormList name="latlng" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="40px">
                    <ReactHookInputText label="LATITUDE:*" name="latlng[0]" placeholder="Latitude:" isHorizontal={mediaQuery.desktop} />
                    <ReactHookInputText label="LONGITUDE:*" name="latlng[1]" placeholder="Longitude:" isHorizontal={mediaQuery.desktop} />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText label="ENDEREÇO:" name="loc_endereco" placeholder="Digite o endereço da Garagem:" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="CEP:"
                    name="loc_cep"
                    format="#####-###"
                    placeholder="Informe o CEP da Garagem:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ButtonsContainer position="evenly">
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
