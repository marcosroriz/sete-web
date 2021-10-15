import React from "react";
import { useFormContext } from "react-hook-form";

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container } from "./styles";

type ReactHookLatLngMapProps = {
    name: string;
    children?: React.ReactNode;
    title?: string;
};

const ReactHookLatLngMap: React.FC<ReactHookLatLngMapProps> = ({ title, name, children }) => {
    const mapRef = React.useRef<MapControlEvents | null>(null);
    const { setValue } = useFormContext();

    React.useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new MapControlEvents("map");
            const map = mapRef.current;
            map.mapInstance.on("singleclick", (event) => {
                const [lng, lat] = event.coordinate;
                map.handleSingleClickEvent({ lng: lng, lat: lat, icon: AlunosMarker, anchor: [25, 50] });
                setValue(name, [lat.toPrecision(8), lng.toPrecision(8)]);
                const translate = map.getTranslateMarker();
                if (!translate) {
                    return;
                }
                translate.on("translateend", (translateEvent) => {
                    const [lng, lat] = translateEvent.coordinate;
                    setValue(name, [lat.toPrecision(8), lng.toPrecision(8)]);
                });
            });
        }
    }, []);

    return (
        <Container>
            <h3 className="map-title">{title}</h3>
            <div id="map" className="map-container"></div>
            {children}
        </Container>
    );
};

export default ReactHookLatLngMap;