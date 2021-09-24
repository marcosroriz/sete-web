import * as ol from "ol";
import * as layer from "ol/layer";
import * as geom from "ol/geom";
import * as style from "ol/style";
import * as source from "ol/source";
import XYZ from "ol/source/XYZ";
import { ViewOptions } from "ol/View";

type MapConstructorViewOptionsDTO = ViewOptions;

type CreateMapViewOptionsDTO = MapConstructorViewOptionsDTO;

class Map {
    private mapInstance: ol.Map;
    constructor(mapId: string, viewOptions: MapConstructorViewOptionsDTO) {
        this.mapInstance = this.createMap(mapId, viewOptions);
    }
    public createMap(mapId: string, viewOptions: CreateMapViewOptionsDTO): ol.Map {
        return new ol.Map({
            target: mapId,
            layers: [
                new layer.Tile({
                    source: new XYZ({
                        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    }),
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
