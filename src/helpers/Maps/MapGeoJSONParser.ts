import simplify from "simplify-geojson";
import GpxParser from "gpxparser";

import * as ol from "ol";
import * as format from "ol/format";
import * as geom from "ol/geom";
import * as style from "ol/style";
import * as sphere from "ol/sphere";

import Feature from "ol/render/Feature";
import FlowLine from "ol-ext/style/FlowLine";

import { GeoJSON } from "entities/GeoJSON";

import RotasInicio from "assets/icons/rotas/rotas-inicio.png";
import RotasArrow from "assets/icons/rotas/rotas-arrow.png";

import { Map, LayerObj, MapConstructorViewOptionsDTO } from "./Map";

class MapGeoJSONParser extends Map {
    public malhaInstance: LayerObj | null;
    public simplifiedGpx: GeoJSON | null;

    constructor(mapId: string, viewOptions?: MapConstructorViewOptionsDTO) {
        super(mapId, viewOptions);
        this.malhaInstance = null;
        this.simplifiedGpx = null;
        this.malhaInstance = this.addLayer("Malha");
        this.malhaInstance.layer.setStyle((feature) => {
            if (feature.getGeometry() instanceof geom.LineString) {
                (feature as any).setStyle(this.getGeomStyle(feature));
            }
        });
    }

    public reverseRoute(): GeoJSON | null {
        const malhaSource = this.malhaInstance?.source;
        malhaSource?.clear();
        let coordinatesArr = this.simplifiedGpx?.features[0].geometry.coordinates;
        coordinatesArr.reverse();

        const features = this.simplifiedGpx?.features[0];
        if (features) {
            features.geometry.coordinates = coordinatesArr;
        }
        malhaSource?.addFeatures(new format.GeoJSON().readFeatures(this.simplifiedGpx));
        this.mapInstance?.getView().fit(malhaSource?.getExtent() as any);
        return this.simplifiedGpx;
    }

    public getGeomStyle(feature: Feature | ol.Feature<geom.Geometry>) {
        let styles = [] as style.Style[];

        if (feature.getGeometry() instanceof geom.LineString) {
            styles.push(
                new style.Style({
                    stroke: new style.Stroke({ color: "white", width: 8 }),
                }),
            );
            styles.push(
                new FlowLine({
                    color: "Orange",
                    color2: "DarkSlateGrey",
                    width: 3,
                    width2: 3,
                    arrowSize: 32,
                    lineCap: "butt",
                }),
            );

            let pontoReferencial = null as any;
            let ultPonto = (feature.getGeometry() as any)?.getLastCoordinate()?.slice(0, 2);

            (feature.getGeometry() as any)?.forEachSegment((start: number[], end: number[]) => {
                let plotSeta = false;
                if (!pontoReferencial) {
                    plotSeta = true;
                    // pontoReferencial = proj.transform(start, "EPSG:3857", "EPSG:4326");
                    pontoReferencial = start;
                    styles.push(
                        new style.Style({
                            geometry: new geom.Point(start),
                            image: new style.Icon({
                                src: RotasInicio,
                                anchor: [0.75, 0.5],
                                rotateWithView: true,
                            }),
                            zIndex: 150,
                        }),
                    );
                    return;
                } else if ((start[0] == ultPonto[0] && start[1] == ultPonto[1]) || (end[0] == ultPonto[0] && end[1] == ultPonto[1])) {
                    plotSeta = true;
                } else {
                    // let pontoAtual = proj.transform(end, "EPSG:3857", "EPSG:4326");
                    let pontoAtual = end;
                    let distancia = sphere.getDistance(pontoReferencial, pontoAtual);
                    if (distancia > 2000) {
                        pontoReferencial = pontoAtual;
                        plotSeta = true;
                    }
                }
                if (plotSeta) {
                    let dx = end[0] - start[0];
                    let dy = end[1] - start[1];
                    let rotation = Math.atan2(dy, dx);
                    styles.push(
                        new style.Style({
                            geometry: new geom.Point(end),
                            image: new style.Icon({
                                src: RotasArrow,
                                anchor: [0.75, 0.5],
                                rotateWithView: true,
                                rotation: -rotation,
                            }),
                            zIndex: 100,
                        }),
                    );
                }
            });
        }
        return styles;
    }

    public generateRouteFromGeoJSON(geoJSON: GeoJSON): GeoJSON | null {
        const mapInstance = this.mapInstance;
        const malhaSource = this.malhaInstance?.source;
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
        this.simplifiedGpx = simplify(geoJSON, 0.0001);

        malhaSource?.clear();
        malhaSource?.addFeatures(new format.GeoJSON().readFeatures(this.simplifiedGpx));

        mapInstance.getView().fit(malhaSource?.getExtent() as number[]);

        return this.simplifiedGpx;
    }

    public async readGpxFile(file: File): Promise<GeoJSON> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            const gpxParser = new GpxParser();
            fileReader.readAsText(file, "UTF8");
            fileReader.onload = function () {
                gpxParser.parse(fileReader.result as string);
                const gpx = (gpxParser as any).toGeoJSON();
                resolve(gpx);
            };
            fileReader.onerror = function (err) {
                reject(err);
            };
        });
    }
}

export { MapGeoJSONParser };
