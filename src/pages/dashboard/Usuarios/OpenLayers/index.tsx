import React from "react";

import * as ol from "ol";
import * as layer from "ol/layer";
import * as geom from "ol/geom";
import * as style from "ol/style";
import * as source from "ol/source";
import XYZ from "ol/source/XYZ";

import { Map } from "helpers/Maps/Map";

import { Container } from "./styles";

const OpenLayers: React.FC = () => {
    // const mapRef = React.useRef<ol.Map | null>(null);
    // React.useEffect(() => {
    //     if (!mapRef.current) {
    //         mapRef.current = new ol.Map({
    //             target: "map",
    //             layers: [
    //                 new layer.Tile({
    //                     source: new XYZ({
    //                         url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //                     }),
    //                 }),
    //             ],
    //             view: new ol.View({
    //                 projection: "EPSG:4326",
    //                 center: [-49.2727665, -16.7384281],
    //                 zoom: 12,
    //             }),
    //         });

    //         setTimeout(() => mapRef.current?.updateSize(), 100);
    //     }
    // }, []);
    const mapRef = React.useRef<Map | null>(null);
    React.useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new Map({ mapId: "map", zoom: 5 });
        }
    }, []);

    return (
        <Container>
            <div id="map"></div>
        </Container>
    );
};

export default OpenLayers;
