/**
 * Componente contendo os mapa de latlng integrado com React-Hook-Forms
 */

import React from "react";
import * as ol from "ol";
import * as geom from "ol/geom";

import { Map, MapConstructorViewOptionsDTO, CreateMarkerDTO } from "helpers/Maps/Map";

import { Container } from "./styles";

type MarkerProps = CreateMarkerDTO & {
    map?: Map;
};

import { MapControlEvents } from "helpers/Maps/MapControlEvents";

const Marker: React.FC<MarkerProps> = ({ map, ...props }) => {
    const [marker, setMarker] = React.useState<ol.Feature<geom.Point>>();

    React.useEffect(() => {
        if (map && !marker) {
            setMarker(map.createMarker(props));
        }
        return () => {
            if (map && marker) {
                map.removeMarker(marker);
            }
        };
    }, [marker]);

    return null;
};

type MapViewProps = {
    id?: string;
    title?: string;
    viewOptions?: MapConstructorViewOptionsDTO;
    center?: { lat: number; lng: number };
    mapController?: React.MutableRefObject<MapControlEvents | null>;
};

const MapView: React.FC<MapViewProps> = ({ id = "map", title, viewOptions, mapController, center, children }) => {
    const divRef = React.useRef<HTMLDivElement | null>(null);
    const observer = React.useRef<IntersectionObserver>();
    const [map, setMap] = React.useState<Map>();

    // React.useEffect(() => {
    //     if (!mapController?.current) {
    //         mapController!.current = new MapControlEvents("map");
    //         const map = mapController?.current;
    //         if (!!map) {

    //         }
    //     }
    // }, []);

    React.useEffect(() => {
        if (!map) {
            setMap(new Map(id, { ...viewOptions }));
        } else {
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    map.updateSize();
                }
            });
            map.mapInstance.on("singleclick", (event) => {
                const [lng, lat] = event.coordinate;
                console.log(lng, lat);
            });
            if (divRef.current) {
                observer.current.observe(divRef.current);
            }
            map.activateImageLayerSwitcher();
        }
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [map]);

    React.useEffect(() => {
        if (map && center) {
            map.goToLocation(center);
        }
    }, [center]);

    return (
        <Container>
            <h3 className="map-title">{title}</h3>
            <div id={id} className="map-container" ref={divRef}></div>
            {React.Children.map(children, (child) => React.isValidElement(child) && React.cloneElement(child, { map }))}
        </Container>
    );
};

export { MapView, Marker };
