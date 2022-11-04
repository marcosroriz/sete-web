/**
 * Classe principal de mapas da aplicação com todas as funcionalidades necessárias.
 */

import jsPDF from "jspdf";

import * as ol from "ol";
import * as layer from "ol/layer";
import * as geom from "ol/geom";
import * as control from "ol/control";
import * as source from "ol/source";
import * as style from "ol/style";

import CanvasScaleLine from "ol-ext/control/CanvasScaleLine";
import PrintDialog from "ol-ext/control/PrintDialog";
import LayerSwitcherImage from "ol-ext/control/LayerSwitcherImage";

import { ViewOptions } from "ol/View";

type LayerObj = {
    source: source.Vector<geom.Geometry>;
    layer: layer.Vector<source.Vector<geom.Geometry>>;
    displayInLayerSwitcher?: boolean;
};

type LayersObj = {
    [name: string]: LayerObj;
};

// [lng, lat]
type GoToLocation = { lat: number; lng: number };

type MapConstructorViewOptionsDTO = ViewOptions;

type CreateMapViewOptionsDTO = MapConstructorViewOptionsDTO;

type CreateMarkerDTO = {
    lat: number;
    lng: number;
    icon: string;
    anchor?: [number, number];
    view?: boolean;
    nome?: string;
    sexo?: string;
    rota?: string;
    escola?: string;
    nivel?: number;
    turno?: number;
    horarioFuncionamento?: string;
    ensino?: string;
};

class Map {
    public mapInstance: ol.Map;
    public vectorLayer: layer.Vector<source.Vector<geom.Geometry>>;
    public vectorSource: source.Vector<geom.Geometry>;
    public layerSwitcherActivated: boolean;
    public mapLayers: LayersObj;
    public mapGroupLayer: layer.Group | null;
    public circles: ol.Feature<geom.Circle>[];

    constructor(mapId: string, viewOptions?: MapConstructorViewOptionsDTO) {
        this.vectorSource = new source.Vector();
        this.vectorLayer = new layer.Vector({
            source: this.vectorSource,
        });
        this.mapInstance = this.createMap(mapId, viewOptions);
        this.mapLayers = {
            base: {
                layer: this.vectorLayer,
                source: this.vectorSource,
            },
        };
        this.mapGroupLayer = null;
        this.layerSwitcherActivated = false;
        this.circles = [];
    }

    public createMap(mapId: string, viewOptions?: CreateMapViewOptionsDTO): ol.Map {
        return new ol.Map({
            controls: control.defaults().extend([
                new control.FullScreen({
                    tipLabel: "Ativar/Desativar tela cheia",
                }),
                new CanvasScaleLine(),
            ]),
            target: mapId,
            layers: [
                new layer.Tile({
                    source: new source.BingMaps({
                        key: "ciN5QAQYiHzOFNabIODf~b61cOBWqj2nmKSuoyjuyKA~AiShqLNGsToztBeSE2Tk8Pb1cUdr4nikxL24hlMRaHCJkIpKaYtdBXoxaDEgFhQv",
                        imagerySet: "AerialWithLabels",
                        ...{ displayInLayerSwitcher: true },
                    }),
                }),
                new layer.Tile({
                    source: new source.OSM(),
                    visible: false,
                    ...{ displayInLayerSwitcher: true },
                }),
                this.vectorLayer,
            ],
            view: new ol.View({
                projection: "EPSG:4326",
                center: [-49.2727665, -16.7384281],
                zoom: 12,
                ...viewOptions,
            }),
        });
    }

    public addLayer(name: string, displayInLayerSwitcher?: boolean): LayerObj {
        let addedVectorSource = new source.Vector();
        let addedVectorLayer = new layer.Vector({
            source: addedVectorSource,
            ...{ displayInLayerSwitcher },
        });
        addedVectorLayer.set("name", name);

        let addedLayer = {
            source: addedVectorSource,
            layer: addedVectorLayer,
            ...{ displayInLayerSwitcher },
        };

        this.mapLayers[name] = addedLayer;
        this.mapInstance.addLayer(addedVectorLayer);
        return addedLayer;
    }

    public removeLayer(name: string): void {
        if (this.mapLayers[name] != null) {
            this.mapLayers[name].source.clear();
            this.mapInstance.removeLayer(this.mapLayers[name] as any);
            delete this.mapLayers[name];
        }
    }

    public addGroupLayer(layers: layer.Vector<source.Vector<geom.Geometry>>[]): void {
        let groupLayer = new layer.Group({
            ...{ displayInLayerSwitcher: true },
            layers: layers,
        });

        this.mapGroupLayer = groupLayer;
        this.mapInstance.addLayer(groupLayer);
    }

    public removeGroupLayer(): void {
        if (this.mapGroupLayer != null) {
            this.mapInstance.removeLayer(this.mapGroupLayer);
        }
    }

    public goToLocation({ lat, lng }: GoToLocation): void {
        this.mapInstance.getView().setCenter([lng, lat]);
        this.mapInstance.getView().setZoom(15);
    }

    public updateSize(): void {
        this.mapInstance.updateSize();
    }

    public activatePrinting(): void {
        let printControl = new PrintDialog({ lang: "pt" });
        printControl.setSize("A4");
        this.mapInstance.addControl(printControl);
        /* On print > save image file */
        (printControl as any).on(["print", "error"], (e) => {
            // Print success
            if (e.image) {
                if (e.pdf) {
                    // Export pdf using the print info
                    let pdf = new jsPDF({
                        orientation: e.print.orientation,
                        unit: e.print.unit,
                        format: e.print.size,
                    });
                    pdf.addImage(e.image, "JPEG", e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
                    pdf.save(e.print.legend ? "legend.pdf" : "map.pdf");
                }
                (document.querySelector(".ol-ext-buttons button[type='button']") as any).click();
            } else {
                (document.querySelector(".ol-ext-buttons button[type='button']") as any).click();
            }
        });
    }

    public activateImageLayerSwitcher(): void {
        if (!this.layerSwitcherActivated) {
            let switcher = new LayerSwitcherImage({
                reordering: false,
                drawDelay: 1000,
                displayInLayerSwitcher: (layer) => {
                    if (layer.values_.displayInLayerSwitcher != undefined) {
                        return layer.values_.displayInLayerSwitcher;
                    } else if (layer.values_.name == undefined) {
                        return true;
                    } else {
                        return !layer.values_.name.startsWith("geocoder");
                    }
                },
            });
            this.mapInstance.addControl(switcher as any);
            this.layerSwitcherActivated = true;
        }
    }

    public createMarker({
        lat,
        lng,
        icon,
        anchor = [12, 37],
        nome,
        sexo,
        rota,
        escola,
        nivel,
        turno,
        horarioFuncionamento,
        ensino,
    }: CreateMarkerDTO): ol.Feature<geom.Point> {
        const marker = new ol.Feature({
            geometry: new geom.Point([lng, lat]),
            nome: nome,
            sexo: sexo,
            escola: escola,
            rota: rota,
            nivel: nivel,
            turno: turno,
            horarioFuncionamento: horarioFuncionamento,
            ensino: ensino,
        });
        marker.setStyle(
            new style.Style({
                image: new style.Icon({
                    anchor: anchor,
                    anchorXUnits: "pixels",
                    anchorYUnits: "pixels",
                    opacity: 1,
                    src: icon,
                }),
            }),
        );

        console.log("create marker");
        this.vectorSource.addFeature(marker);

        return marker;
    }

    public createCircle({ lat, lng }: any): ol.Feature<geom.Circle> {
        const circleFeature1 = new ol.Feature({
            geometry: new geom.Circle([lng, lat], 0.015),
        });
        circleFeature1.setStyle(
            new style.Style({
                renderer(coordinates, state) {
                    const x = coordinates[0][0];
                    const y = coordinates[0][1];
                    const x1 = coordinates[1][0];
                    const y1 = coordinates[1][1];

                    const ctx = state.context;
                    const dx = x1 - x;
                    const dy = y1 - y;
                    const radius = Math.sqrt(dx * dx + dy * dy);

                    const innerRadius = 0;
                    const outerRadius = radius * 1.4;

                    const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
                    gradient.addColorStop(0, "rgba(255,0,0,0)");
                    gradient.addColorStop(0.6, "rgba(255,0,0,0.2)");
                    gradient.addColorStop(1, "rgba(255,0,0,0.8)");
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                    ctx.strokeStyle = "rgba(255,0,0,1)";
                    ctx.stroke();
                },
            }),
            // new style.Style({
            //     stroke: new style.Stroke({
            //         color: "blue",
            //         width: 3,
            //     }),
            //     fill: new style.Fill({
            //         color: "rgba(0, 0, 255, 0.1)",
            //     }),
            // }),
        );
        const circleFeature2 = new ol.Feature({
            geometry: new geom.Circle([lng, lat], 0.01),
        });
        circleFeature2.setStyle(
            new style.Style({
                renderer(coordinates, state) {
                    const x = coordinates[0][0];
                    const y = coordinates[0][1];
                    const x1 = coordinates[1][0];
                    const y1 = coordinates[1][1];

                    const ctx = state.context;
                    const dx = x1 - x;
                    const dy = y1 - y;
                    const radius = Math.sqrt(dx * dx + dy * dy);

                    const innerRadius = 0;
                    const outerRadius = radius * 1.4;

                    const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
                    gradient.addColorStop(0, "rgba(170,0,0,0)");
                    gradient.addColorStop(0.6, "rgba(170,0,0,0.2)");
                    gradient.addColorStop(1, "rgba(170,0,0,0.8)");
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                    ctx.strokeStyle = "rgba(170,0,0,1)";
                    ctx.stroke();
                },
            }),
        );
        const circleFeature3 = new ol.Feature({
            geometry: new geom.Circle([lng, lat], 0.005),
        });
        circleFeature3.setStyle(
            new style.Style({
                renderer(coordinates, state) {
                    const x = coordinates[0][0];
                    const y = coordinates[0][1];
                    const x1 = coordinates[1][0];
                    const y1 = coordinates[1][1];

                    const ctx = state.context;
                    const dx = x1 - x;
                    const dy = y1 - y;
                    const radius = Math.sqrt(dx * dx + dy * dy);

                    const innerRadius = 0;
                    const outerRadius = radius * 1.4;

                    const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
                    gradient.addColorStop(0, "rgba(100,0,0,0)");
                    gradient.addColorStop(0.6, "rgba(100,0,0,0.2)");
                    gradient.addColorStop(1, "rgba(100,0,0,0.8)");
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
                    ctx.strokeStyle = "rgba(100,0,0,1)";
                    ctx.stroke();
                },
            }),
        );

        this.vectorSource.addFeature(circleFeature1);
        this.vectorSource.addFeature(circleFeature2);
        this.vectorSource.addFeature(circleFeature3);

        this.circles.push(circleFeature1);
        this.circles.push(circleFeature2);
        this.circles.push(circleFeature3);

        return circleFeature1;
    }

    public removeMarker(marker: ol.Feature<geom.Point>): void {
        this.vectorSource.removeFeature(marker);
    }

    public removeCircles(): void {
        if (this.circles) {
            this.circles.forEach((c) => {
                this.vectorSource.removeFeature(c);
            });
            this.circles = [];
        }
    }
}

export { Map };
export type { GoToLocation, MapConstructorViewOptionsDTO, CreateMapViewOptionsDTO, CreateMarkerDTO, LayerObj, LayersObj };
