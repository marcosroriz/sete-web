/**
 * Classe principal de mapas da aplicação com todas as funcionalidades necessárias.
 */

import jsPDF from "jspdf";

import * as ol from "ol";
import * as layer from "ol/layer";
import * as geom from "ol/geom";
import * as control from "ol/control";
import * as source from "ol/source";
import * as proj from "ol/proj";

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
type GoToLocation = [number, number];

type MapConstructorViewOptionsDTO = ViewOptions;

type CreateMapViewOptionsDTO = MapConstructorViewOptionsDTO;
class Map {
    public mapInstance: ol.Map;
    public vectorLayer: layer.Vector<source.Vector<geom.Geometry>>;
    public vectorSource: source.Vector<geom.Geometry>;
    public layerSwitcherActivated: boolean;
    public mapLayers: LayersObj;
    public mapGroupLayer: layer.Group | null;

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

    public goToLocation(location: GoToLocation): void {
        this.mapInstance.getView().setCenter(location);
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
}

export { Map };
export type { MapConstructorViewOptionsDTO, CreateMapViewOptionsDTO, LayerObj };
