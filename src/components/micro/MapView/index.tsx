/**
 * Componente contendo os mapa de latlng integrado com React-Hook-Forms
 */

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { Container } from "./styles";

type ReactHookLatLngMapProps = {
    name: string;
    mapController: React.MutableRefObject<MapControlEvents | null>;
    anchor?: [number, number];
    children?: React.ReactNode;
    title?: string;
};

const MapView: React.FC<ReactHookLatLngMapProps> = ({ title, mapController, name, anchor, children }) => {
    const transladeRef = React.useRef<boolean>(false);
    const locations = useWatch({
        name,
    });

    const [oldLocations, setOldLocations] = React.useState<any | null>([]);

    React.useEffect(() => {
        if (!mapController?.current) {
            mapController!.current = new MapControlEvents("map");
            const map = mapController?.current;

            // map.activatePrinting();
            map.activateImageLayerSwitcher();
        }
    }, []);

    React.useEffect(() => {
        if (locations && mapController?.current) {
            const map = mapController?.current;
            map.removeMarkers();
            locations.forEach(([nivel, turno, lat, lng, icon]) => {
                map.handleMarkerInstanceMapView({ lng: Number(lng), lat: Number(lat), icon: icon || "", anchor: anchor || [25, 50] });
            });
        } else {
            transladeRef.current = false;
        }
        //setOldLocations(locations);
    }, [locations]);

    return (
        <Container>
            <h3 className="map-title">{title}</h3>
            <div id="map" className="map-container"></div>
            {children}
        </Container>
    );
};

export default MapView;
