import jsPDF from "jspdf";

import * as ol from "ol";
import * as layer from "ol/layer";
import * as geom from "ol/geom";
import * as control from "ol/control";
import BingMaps from "ol/source/BingMaps";
import OSM from "ol/source/OSM";
import Vector from "ol/source/Vector";

import CanvasScaleLine from "ol-ext/control/CanvasScaleLine";
import PrintDialog from "ol-ext/control/PrintDialog";

import { ViewOptions } from "ol/View";

type MapConstructorViewOptionsDTO = ViewOptions;

type CreateMapViewOptionsDTO = MapConstructorViewOptionsDTO;
class Map {
    public mapInstance: ol.Map;
    public vectorLayer: layer.Vector<Vector<geom.Geometry>>;
    public vectorSource: Vector<geom.Geometry>;

    constructor(mapId: string, viewOptions?: MapConstructorViewOptionsDTO) {
        this.vectorSource = new Vector();
        this.vectorLayer = new layer.Vector({
            source: this.vectorSource,
        });
        this.mapInstance = this.createMap(mapId, viewOptions);
        this.activatePrinting();
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
                    source: new BingMaps({
                        key: "ciN5QAQYiHzOFNabIODf~b61cOBWqj2nmKSuoyjuyKA~AiShqLNGsToztBeSE2Tk8Pb1cUdr4nikxL24hlMRaHCJkIpKaYtdBXoxaDEgFhQv",
                        imagerySet: "AerialWithLabels",
                        ...{ displayInLayerSwitcher: true },
                    }),
                }),
                new layer.Tile({
                    source: new OSM(),
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

    public activatePrinting() {
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
}

export { Map };
export type { MapConstructorViewOptionsDTO, CreateMapViewOptionsDTO };
