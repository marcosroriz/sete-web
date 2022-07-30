/**
 * Componente contendo os mapa de latlng integrado com React-Hook-Forms
 */

import React from "react";
import { Overlay as OverlayBootstrap, Row, Col } from "react-bootstrap";
import * as ol from "ol";
import * as geom from "ol/geom";
import Overlay from "ol/Overlay";

import { Map, MapConstructorViewOptionsDTO, CreateMarkerDTO } from "helpers/Maps/Map";
import { TurnoLabel, NivelLabel, NivelEnum, TurnoEnum } from "entities/Aluno";

import { Container, OverlayContainer } from "./styles";

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
    const popRef = React.useRef<HTMLDivElement | null>(null);
    const mapRef = React.useRef<Map | null>(null);

    const [nome, setNome] = React.useState<string>();
    const [escola, setEscola] = React.useState<string>();
    const [rota, setRota] = React.useState<string>();
    const [turno, setTurno] = React.useState<Number>(0);
    const [nivel, setNivel] = React.useState<Number>(0);

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

                    setNome(feature.get("nome"));
                    setEscola(feature.get("escola"));
                    setRota(feature.get("rota"));
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
            <OverlayBootstrap target={popRef.current} show={isOpen} placement="top">
                <OverlayContainer>
                    <Row style={{ fontSize: "17px", fontWeight: "bold", padding: "7px 10px" }}>
                        <Col md={3}>Nome:</Col>
                        <Col md={9}>{nome}</Col>
                    </Row>

                    <Row style={{ backgroundColor: "#F0F0F0", padding: "7px 10px" }}>
                        <Col md={3}>Escola:</Col>
                        <Col md={9}>{escola} </Col>
                    </Row>
                    <Row style={{ padding: "7px 10px" }}>
                        <Col md={3}>Rota</Col>
                        <Col md={9}>{rota}</Col>
                    </Row>
                    <Row style={{ backgroundColor: "#F0F0F0", padding: "7px 10px" }}>
                        <Col md={3}>Nivel:</Col>
                        <Col md={9}>{NivelLabel.get(nivel as NivelEnum) || "-"}</Col>
                    </Row>
                    <Row style={{ padding: "7px 10px" }}>
                        <Col md={3}>Turno:</Col>
                        <Col md={9}>{TurnoLabel.get(turno as TurnoEnum) || "-"}</Col>
                    </Row>
                </OverlayContainer>
            </OverlayBootstrap>
        </>
    );
};

export { MapView, Marker };
