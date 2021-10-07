import * as ol from "ol";
import * as layer from "ol/layer";
import * as geom from "ol/geom";
import * as style from "ol/style";
import BingMaps from "ol/source/BingMaps";
import OSM from "ol/source/OSM";
import Vector from "ol/source/Vector";

// Types
import { ViewOptions } from "ol/View";

type MapConstructorViewOptionsDTO = ViewOptions;

type CreateMapViewOptionsDTO = MapConstructorViewOptionsDTO;

class Map {
    public mapInstance: ol.Map;

    constructor(mapId: string, viewOptions: MapConstructorViewOptionsDTO) {
        this.mapInstance = this.createMap(mapId, viewOptions);
    }

    public createMap(mapId: string, viewOptions: CreateMapViewOptionsDTO): ol.Map {
        return new ol.Map({
            target: mapId,
            layers: [
                new layer.Tile({
                    source: new BingMaps({
                        key: "ciN5QAQYiHzOFNabIODf~b61cOBWqj2nmKSuoyjuyKA~AiShqLNGsToztBeSE2Tk8Pb1cUdr4nikxL24hlMRaHCJkIpKaYtdBXoxaDEgFhQv",
                        imagerySet: "AerialWithLabels",
                    }),
                }),
                new layer.Tile({
                    source: new OSM(),
                    visible: false,
                }),
                new layer.Vector({
                    source: new Vector(),
                }),
            ],
            view: new ol.View({
                projection: "EPSG:4326",
                center: [-49.2727665, -16.7384281],
                zoom: 12,
                ...viewOptions,
            }),
        });
    }
}

export { Map };
