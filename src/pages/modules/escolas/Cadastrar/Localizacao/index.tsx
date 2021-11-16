import React from "react";
import { Button } from "react-bootstrap";
import { useWatch } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { LocalidadeService } from "services/Localidade";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";

import EscolasMarker from "assets/icons/escolas/escolas-marker.png";

import { ButtonsContainer, Container, mediaQuery } from "./styles";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";

const Localizacao: React.FC = () => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const mec_co_uf = useWatch({
        name: "mec_co_uf",
    });
    const { nextStep } = useReactHookNavCard();
    const [estadoOptions, setEstadoOptions] = React.useState<{ label: string; value: string }[]>([{ label: "Escolher rota depois", value: "0" }]);
    const [cidadeOptions, setCidadeOptions] = React.useState<{ label: string; value: string }[]>([{ label: "Escolher rota depois", value: "0" }]);

    React.useEffect(() => {
        const fetchData = async () => {
            const localidadeService = new LocalidadeService();
            const response = await localidadeService.getEstados();
            const options = response.data.map((option) => ({ label: option.nome, value: option.codigo.toString() }));
            setEstadoOptions(options);
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        const fetchData = async (co_uf: number) => {
            const localidadeService = new LocalidadeService();
            const response = await localidadeService.getMunicipiosFromEstado(co_uf);
            const options = response.data.map((option) => ({ label: option.nm_cidade, value: option.codigo_cidade.toString() }));
            setCidadeOptions(options);
        };
        if (mec_co_uf) {
            fetchData(Number(mec_co_uf));
        }
    }, [mec_co_uf]);

    return (
        <Container>
            <BlockTitle message="PREENCHA OS DADOS REFERENTES A LOCALIZAÇÃO DO ALUNO." />
            <ReactHookLatLngMap title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO (CLIQUE NO MAPA)" name="latlng" mapController={mapRef} icon={EscolasMarker} />
            <ReactHookFormItemCard placeItems="center">
                <ReactHookMultiFormList name="modo" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="20px">
                    <ReactHookInputText label="LATITUDE:" name="latlng[0]" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="LONGITUDE:" name="latlng[1]" isHorizontal={mediaQuery.desktop} dontShowError />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="ESTADO*"
                    name="mec_co_uf"
                    placeholder="Selecione uma Opção"
                    options={estadoOptions}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="CIDADE*"
                    name="mec_co_municipio"
                    placeholder="Selecione uma Opção"
                    options={cidadeOptions}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="ENDEREÇO DA ESCOLA" name="loc_endereco" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat label="CEP" name="loc_cep" format="#####-###" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="A ESCOLA ESTÁ LOCALIZADA EM:*"
                    name="mec_tp_localizacao"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Área Urbana" value="1" name="mec_tp_localizacao" position="right" />
                    <ReactHookInputRadio label="Área Rural" value="2" name="mec_tp_localizacao" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="A ESCOLA ESTÁ LOCALIZADA EM ÁREA DIFERENCIADA?*"
                    name="mec_tp_localizacao_diferenciada"
                    isHorizontal={mediaQuery.desktop}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Não se aplica" value="7" name="mec_tp_localizacao_diferenciada" position="right" />
                    <ReactHookInputRadio label="Área de Assentamento" value="1" name="mec_tp_localizacao_diferenciada" position="right" />
                    <ReactHookInputRadio label="Terra Indígena" value="2" name="mec_tp_localizacao_diferenciada" position="right" />
                    <ReactHookInputRadio label="Área remanescente de Quilombo" value="3" name="mec_tp_localizacao_diferenciada" position="right" />
                </ReactHookMultiFormList>
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
