import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { FornecedoresService } from "services/Fornecedores";
import { Fornecedor } from "entities/Fornecedor";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

type FornecedorData = [Fornecedor | null, React.Dispatch<React.SetStateAction<Fornecedor | null>>];

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { user } = useAuth();
    const { setValue } = useFormContext();
    const { nextStep, previousStep, aditionalData } = useReactHookNavCard();

    const [fornecedorData] = aditionalData?.fornecedorData as FornecedorData;

    React.useEffect(() => {
        if (!!fornecedorData) {
            setValue("latlng[0]", fornecedorData?.loc_latitude || "");
            setValue("latlng[1]", fornecedorData?.loc_longitude || "");
            setValue("loc_endereco", fornecedorData?.loc_endereco || "");
            setValue("loc_cep", fornecedorData?.loc_cep || "");
        }
    }, [fornecedorData]);
    return (
        <Container>
            <BlockTitle message="PREENCHA OS DADOS REFERENTES A LOCALIZAÇÃO DO FORNECEDOR." />
            <ReactHookLatLngMap title="LOCALIZAÇÃO DO FORNECEDOR (CLIQUE NO MAPA)" mapController={mapRef} name="latlng" icon={AlunosMarker} />
            <ReactHookFormItemCard placeItems="center">
                <ReactHookMultiFormList name="latlng" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="20px">
                    <ReactHookInputText label="LATITUDE:" name="latlng[0]" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="LONGITUDE:" name="latlng[1]" isHorizontal={mediaQuery.desktop} dontShowError />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="ENDEREÇO DO FORNECEDOR" name="loc_endereco" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="CEP DO FORNECEDOR" name="loc_cep" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Localizacao;
