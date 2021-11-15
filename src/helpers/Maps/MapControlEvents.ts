import * as ol from "ol";
import * as geom from "ol/geom";
import * as interaction from "ol/interaction";
import * as style from "ol/style";

import { Map, MapConstructorViewOptionsDTO } from "./Map";

type GenerateMarkerDTO = {
    lat: number;
    lng: number;
    icon: string;
    anchor?: [number, number];
};

class MapControlEvents extends Map {
    private positionMarker: ol.Feature<geom.Point> | null;
    private translateMarker: interaction.Translate | null;

    constructor(mapId: string, viewOptions?: MapConstructorViewOptionsDTO) {
        super(mapId, viewOptions);
        this.positionMarker = null;
        this.translateMarker = null;
    }

    public handleMarkerInstance({ lat, lng, icon, anchor = [12, 37] }: GenerateMarkerDTO) {
        if (this.positionMarker) {
            this.vectorSource.removeFeature(this.positionMarker);
        }
        this.positionMarker = new ol.Feature({
            geometry: new geom.Point([lng, lat]),
        });
        this.positionMarker.setStyle(
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
        this.vectorSource.addFeature(this.positionMarker);

        this.translateMarker = new interaction.Translate({
            features: new ol.Collection([this.positionMarker]),
        });
        this.mapInstance.addInteraction(this.translateMarker);
    }

    public getTranslateMarker(): interaction.Translate | null {
        if (this.translateMarker) {
            this.translateMarker.removeEventListener("translateend", () => {
                return;
            });
        }
        return this.translateMarker;
    }
}

export { MapControlEvents };
