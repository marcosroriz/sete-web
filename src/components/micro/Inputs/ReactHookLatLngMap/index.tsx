import React from "react";
import { useFormContext } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import { Container } from "./styles";

type ReactHookLatLngMapProps = {
    name: string;
    mapController?: MapControlEvents | null;
    icon?: string;
    anchor?: [number, number];
    children?: React.ReactNode;
    title?: string;
};

const ReactHookLatLngMap: React.FC<ReactHookLatLngMapProps> = ({ title, mapController, name, icon, anchor, children }) => {
    const transladeRef = React.useRef<boolean>(false);
    const { setValue, watch } = useFormContext();

    React.useEffect(() => {
        if (!mapController) {
            mapController = new MapControlEvents("map");
            const map = mapController;
            map.mapInstance.on("singleclick", (event) => {
                const [lng, lat] = event.coordinate;
                setValue(name, [lat.toPrecision(8), lng.toPrecision(8)]);
            });
            map.activatePrinting();
            map.activateImageLayerSwitcher();
        }
    }, []);

    React.useEffect(() => {
        if (watch(name) && mapController && !transladeRef.current) {
            const map = mapController;
            const [lat, lng] = watch(name);
            console.log(lat);
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
    }, [watch(name)]);

    return (
        <Container>
            <h3 className="map-title">{title}</h3>
            <div id="map" className="map-container"></div>
            {children}
        </Container>
    );
};

export default ReactHookLatLngMap;
