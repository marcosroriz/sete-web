import React from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { Button } from "react-bootstrap";

import { MapGeoJSONParser } from "helpers/Maps/MapGeoJSONParser";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container } from "./styles";

const PreVisualizacao: React.FC = () => {
    const { setValue } = useFormContext();
    const arquivoGpx = useWatch({ name: "arquivo" });
    const mapController = React.useRef<MapGeoJSONParser | null>(null);
    const { previousStep, nextStep, step } = useReactHookNavCard();

    const handleReverseRoute = () => {
        const processedGeoJSON = mapController.current?.reverseRoute();
        setValue("gpx", processedGeoJSON);
    };

    const handleReadFile = async (file?: File) => {
        if (!file) {
            return;
        }
        const geoJSON = await mapController.current?.readGpxFile(file);
        if (geoJSON) {
            const processedGeoJSON = mapController.current?.generateRouteFromGeoJSON(geoJSON);
            setValue("gpx", processedGeoJSON);
        }
    };

    React.useEffect(() => {
        if (!mapController?.current) {
            mapController.current = new MapGeoJSONParser("map");
        }
    }, []);

    React.useEffect(() => {
        if (step === 1) {
            mapController.current?.mapInstance.updateSize();
            handleReadFile(arquivoGpx);
        }
    }, [step]);

    return (
        <Container>
            <BlockTitle message="PRÉ-VISUALIZAÇÃO DA ROTA IMPORTADA." />
            <Button onClick={handleReverseRoute}>Reverter Rotas</Button>
            <div id="map" className="map-container"></div>
            <ButtonsContainer position="evenly">
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default PreVisualizacao;
