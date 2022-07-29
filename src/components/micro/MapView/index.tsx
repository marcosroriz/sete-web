/**
 * Componente contendo os mapa de latlng integrado com React-Hook-Forms
 */

import React from "react";
import { Overlay as OverlayBootstrap } from "react-bootstrap";
import * as ol from "ol";
import * as geom from "ol/geom";
import Overlay from "ol/Overlay";

import { Map, MapConstructorViewOptionsDTO, CreateMarkerDTO } from "helpers/Maps/Map";
import { TurnoLabel, NivelLabel, NivelEnum, TurnoEnum } from "entities/Aluno";

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
    const [isOpen, setIsOpen] = React.useState(false);
    const [turno, setTurno] = React.useState<Number>(0);
    const [nivel, setNivel] = React.useState<Number>(0);
    const popRef = React.useRef<HTMLDivElement | null>(null);
    const mapRef = React.useRef<Map | null>(null);

    React.useEffect(() => {
        if (!map) {
            mapRef.current = new Map(id, { ...viewOptions });
            setMap(mapRef.current);
        } else {
            mapRef.current = map;
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    map.updateSize();
                }
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

    React.useEffect(() => {
        if (!!map) {
            const element = document.getElementById("popup");
            const popup1 = new Overlay({
                element: element as any,
                positioning: "top",
                stopEvent: false,
            });
            map.mapInstance.addOverlay(popup1);

            map.mapInstance.on("click", function (evt) {
                setIsOpen(false);
                const feature = map.mapInstance.forEachFeatureAtPixel(evt.pixel, function (feature) {
                    return feature;
                });

                if (feature) {
                    console.log("evt", evt);
                    console.log("feature", feature);
                    popup1.setPosition(evt.coordinate);

                    setIsOpen(true);
                    setTurno(feature.get("turno"));
                    setNivel(feature.get("nivel"));
                } else {
                    setIsOpen(false);
                }
            });
        }
    }, [map]);

    return (
        <>
            <Container>
                <h3 className="map-title">{title}</h3>
                <div id={id} className="map-container" ref={divRef}>
                    <div id="popup" ref={popRef}></div>
                </div>
                {React.Children.map(children, (child) => React.isValidElement(child) && React.cloneElement(child, { map }))}
            </Container>
            <OverlayBootstrap target={popRef.current} show={isOpen} placement="right">
                <div
                    style={{
                        position: "absolute",
                        backgroundColor: "rgba(255, 100, 100, 0.85)",
                        padding: "2px 10px",
                        color: "white",
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div> Nivel: {NivelLabel.get(nivel as NivelEnum) || "-"}</div>
                    <div> Turno: {TurnoLabel.get(turno as TurnoEnum) || "-"}</div>
                </div>
            </OverlayBootstrap>
        </>
    );
};

export { MapView, Marker };
