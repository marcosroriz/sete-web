/**
 * Classe que estende a Map adicionando controllers de events nela.
 */
import React from "react";
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
    view?: boolean;
};

class MapControlEvents extends Map {
    private positionMarker: ol.Feature<geom.Point> | null;
    private translateMarker: interaction.Translate | null;
    private positionsMarkers: ol.Feature<geom.Point>[];

    constructor(mapId: string, viewOptions?: MapConstructorViewOptionsDTO) {
        super(mapId, viewOptions);
        this.positionMarker = null;
        this.translateMarker = null;
        this.positionsMarkers = [];
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

    public handleMarkerInstanceMapView({ lat, lng, icon, anchor = [12, 37] }: GenerateMarkerDTO) {
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

        this.positionsMarkers.push(this.positionMarker);
        this.vectorSource.addFeature(this.positionMarker);
    }

    public removeMarkers() {
        //console.log("positionsMarkers", this, this.positionsMarkers);
        if (this.positionsMarkers) {
            this.positionsMarkers.forEach((marker) => {
                this.vectorSource.removeFeature(marker);
            });
            this.positionsMarkers = [];
        }
    }
}

export { MapControlEvents };
