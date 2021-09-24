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
    const mapRef = React.useRef<Map | null>(null);
    React.useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new Map("map", { zoom: 5 });
        }
    }, []);

    return (
        <Container>
            <div id="map"></div>
        </Container>
    );
};

export default OpenLayers;
