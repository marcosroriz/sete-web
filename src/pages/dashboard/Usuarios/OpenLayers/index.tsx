import React from "react";

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
