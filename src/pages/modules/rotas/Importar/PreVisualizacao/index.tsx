import React from "react";
import { useWatch } from "react-hook-form";
import { Button } from "react-bootstrap";
import * as format from "ol/format";
import simplify from "simplify-geojson";
import GpxParser from "gpxparser";

import { LayerObj } from "helpers/Maps/Map";
import { MapControlEvents } from "helpers/Maps/MapControlEvents";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container } from "./styles";

const PreVisualizacao: React.FC = () => {
    const arquivoGpx = useWatch({ name: "arquivo" });
    const mapController = React.useRef<MapControlEvents | null>(null);
    const malhaController = React.useRef<LayerObj | null>(null);
    const { previousStep, nextStep, step } = useReactHookNavCard();

    const generateRouteFromGeoJSON = (geoJSON: any) => {
        const mapInstance = mapController.current?.mapInstance;
        const malhaSource = malhaController.current?.source;
        let trackFeatures = null as any;

        for (let i = 0; i < geoJSON.features.length; i++) {
            if (geoJSON.features[i].geometry.type == "LineString") {
                if (trackFeatures) {
                    trackFeatures.geometry.coordinates.push(...geoJSON.features[i].geometry.coordinates);
                } else {
                    trackFeatures = geoJSON.features[i];
                }
            }

            if (geoJSON.features[i].geometry.type == "MultiLineString") {
                let lineStringCoordinates = [] as any[];
                for (let ls of geoJSON.features[i].geometry.coordinates) {
                    lineStringCoordinates.push(...(ls as unknown as any[]));
                }

                if (trackFeatures) {
                    trackFeatures.geometry.coordinates.push(...lineStringCoordinates);
                } else {
                    let feature = {
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            properties: {},
                            options: {},
                        },
                        properties: {},
                    } as any;
                    feature.geometry.coordinates = lineStringCoordinates;
                    trackFeatures = feature;
                }
            }
        }
        geoJSON.features = [trackFeatures];
        const gpxSimplificado = simplify(geoJSON, 0.0001);
        console.log(gpxSimplificado);
        console.log(malhaSource);

        malhaSource?.clear();
        malhaSource?.addFeatures(new format.GeoJSON().readFeatures(gpxSimplificado));

        mapInstance?.getView().fit(malhaSource?.getExtent() as any);
    };

    React.useEffect(() => {
        if (!mapController?.current) {
            mapController.current = new MapControlEvents("map");
            const mapInstance = mapController.current;
            malhaController.current = mapInstance.addLayer("Malha");
        }
    }, []);

    React.useEffect(() => {
        if (step === 1) {
            mapController.current?.mapInstance.updateSize();

            if (arquivoGpx) {
                if (!arquivoGpx) {
                    return;
                }
                console.log(arquivoGpx);
                const fileReader = new FileReader();
                const gpxParser = new GpxParser();
                fileReader.readAsText(arquivoGpx, "UTF8");
                fileReader.onload = function () {
                    gpxParser.parse(fileReader.result as string);
                    const gpx = (gpxParser as any).toGeoJSON();
                    generateRouteFromGeoJSON(gpx);
                };
            }
        }
    }, [step]);

    return (
        <Container>
            <BlockTitle message="PRÉ-VISUALIZAÇÃO DA ROTA IMPORTADA." />
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
