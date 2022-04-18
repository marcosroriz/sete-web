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
    icon?: string;
    anchor?: [number, number];
    children?: React.ReactNode;
    title?: string;
};

const ReactHookLatLngMap: React.FC<ReactHookLatLngMapProps> = ({ title, mapController, name, icon, anchor, children }) => {
    const transladeRef = React.useRef<boolean>(false);
    const { setValue } = useFormContext();
    const inputValue = useWatch({
        name,
    });

    React.useEffect(() => {
        if (!mapController?.current) {
            mapController!.current = new MapControlEvents("map");
            const map = mapController?.current;
            map.mapInstance.on("singleclick", (event) => {
                const [lng, lat] = event.coordinate;
                setValue(name, [lat.toPrecision(8), lng.toPrecision(8)]);
            });

            // map.activatePrinting();
            map.activateImageLayerSwitcher();
        }
    }, []);

    React.useEffect(() => {
        if (inputValue && mapController?.current && !transladeRef.current) {
            const map = mapController?.current;
            const [lat, lng] = inputValue;
            map.handleMarkerInstance({ lng: Number(lng), lat: Number(lat), icon: icon || "", anchor: anchor || [25, 50] });
            const translate = map.getTranslateMarker();
            if (!translate) {
                return;
            }

            translate.on("translateend", (translateEvent) => {
                const [lng, lat] = translateEvent.coordinate;
                setValue(name, [lat.toPrecision(8), lng.toPrecision(8)]);
                transladeRef.current = true;
            });
        } else {
            transladeRef.current = false;
        }
    }, [inputValue]);

    return (
        <Container>
            <h3 className="map-title">{title}</h3>
            <div id="map" className="map-container"></div>
            {children}
        </Container>
    );
};

export default ReactHookLatLngMap;
