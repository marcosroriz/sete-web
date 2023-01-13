/**
 * Componente contendo os mapa de latlng integrado com React-Hook-Forms
 */

import React from "react";
import { Overlay as OverlayBootstrap, Row, Col } from "react-bootstrap";
import * as ol from "ol";
import * as geom from "ol/geom";
import Overlay from "ol/Overlay";
import { Link } from "react-router-dom";

import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import { Map, MapConstructorViewOptionsDTO, CreateMarkerDTO } from "helpers/Maps/Map";
import { TurnoLabel, NivelLabel, NivelEnum, TurnoEnum } from "entities/Aluno";

import { formatHelper } from "helpers/FormatHelper";

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
    centerEscola?: { lat: number; lng: number };
    mapController?: React.MutableRefObject<MapControlEvents | null>;
    escola?: boolean;
    aluno?: boolean;
};

type AlunoOverlay = {
    idAluno: number;
    nome: string;
    escola: string;
    rota: string;
    turno: number;
    nivel: number;
};

type EscolaOverlay = {
    idEscola: number;
    nome: string;
    ensino: string;
    horarioFunc: string;
    numeroAlunos: string;
};

const MapView: React.FC<MapViewProps> = ({ id = "map", title, viewOptions, center, centerEscola, children, escola, aluno }) => {
    const divRef = React.useRef<HTMLDivElement | null>(null);
    const observer = React.useRef<IntersectionObserver>();
    const [map, setMap] = React.useState<Map | null>();
    const [isOpen, setIsOpen] = React.useState(false);
    const popRef = React.useRef<HTMLDivElement | null>(null);
    const mapRef = React.useRef<Map | null>(null);

    const [alunoOverlay, setAlunoOverlay] = React.useState<AlunoOverlay>({ idAluno: 0, nome: "", escola: "", rota: "", turno: 0, nivel: 0 });
    const [escolaOverlay, setEscolaOverlay] = React.useState<EscolaOverlay>({ idEscola: 0, ensino: "", nome: "", horarioFunc: "", numeroAlunos: "" });

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
        if (map && centerEscola) {
            map.removeCircles();
            map.createCircle(centerEscola);
            map.goToLocationEscola(centerEscola);
        }
    }, [centerEscola]);

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
                    popup1.setPosition(evt.coordinate);

                    setIsOpen(true);

                    const idAluno = feature.get("idAluno");
                    const nomeAluno = feature.get("nome");
                    const escolaAluno = feature.get("escola");
                    const rotaAluno = feature.get("rota");
                    const turnoAluno = feature.get("turno");
                    const nivelAluno = feature.get("nivel");

                    setAlunoOverlay({ idAluno: idAluno, nome: nomeAluno, escola: escolaAluno, rota: rotaAluno, turno: turnoAluno, nivel: nivelAluno });

                    const idEscola = feature.get("idEscola");
                    const ensinoEscola = feature.get("ensino");
                    const nomeEscola = feature.get("nome");
                    const horarioFunc = feature.get("horarioFuncionamento");
                    const numeroAlunos = feature.get("numeroAlunos");

                    setEscolaOverlay({ idEscola: idEscola, ensino: ensinoEscola, nome: nomeEscola, horarioFunc: horarioFunc, numeroAlunos: numeroAlunos });
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
                {React.Children.map(children, (child) => React.isValidElement(child) && React.cloneElement(child, { map } as any))}
            </Container>
            <OverlayBootstrap target={popRef.current} show={isOpen} placement="top">
                <OverlayContainer style={{ border: "2px #B0C4DE solid" }}>
                    {aluno && (
                        <>
                            <Row style={{ fontSize: "17px", fontWeight: "bold", padding: "7px 10px" }}>
                                <Col md={3}>Nome:</Col>
                                <Col md={9}>{alunoOverlay.nome}</Col>
                            </Row>
                            <Row style={{ backgroundColor: "#F0F0F0", padding: "7px 10px" }}>
                                <Col md={3}>Escola:</Col>
                                <Col md={9}>{alunoOverlay.escola} </Col>
                            </Row>
                            <Row style={{ padding: "7px 10px" }}>
                                <Col md={3}>Rota:</Col>
                                <Col md={9}>{alunoOverlay.rota}</Col>
                            </Row>
                            <Row style={{ backgroundColor: "#F0F0F0", padding: "7px 10px" }}>
                                <Col md={3}>Nivel:</Col>
                                <Col md={9}>{NivelLabel.get(alunoOverlay.nivel as NivelEnum) || "-"}</Col>
                            </Row>
                            <Row style={{ padding: "7px 10px" }}>
                                <Col md={3}>Turno:</Col>
                                <Col md={9}>{TurnoLabel.get(alunoOverlay.turno as TurnoEnum) || "-"}</Col>
                            </Row>
                            <Row style={{ padding: "7px 10px" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Link
                                        to={`/alunos/gerenciar/visualizar/${alunoOverlay.idAluno}`}
                                        style={{
                                            display: "block",
                                            marginBottom: "-2px",
                                            border: "none",
                                            backgroundColor: "transparent",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <FaSearch size={"30px"} color={"gray"} />
                                    </Link>
                                    <Link
                                        to={`/alunos/gerenciar/editar/${alunoOverlay.idAluno}`}
                                        style={{
                                            display: "block",
                                            marginLeft: "6px",
                                            border: "none",
                                            backgroundColor: "transparent",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <FaEdit size={"32px"} color={"orange"} />
                                    </Link>
                                    <button
                                        style={{
                                            border: "none",
                                            backgroundColor: "transparent",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                            console.log("excluir escola");
                                            // e.stopPropagation();
                                            // addOptions?.delete(escolaObj);
                                        }}
                                    >
                                        <FaTrash size={"30px"} color={"red"} />
                                    </button>
                                </div>
                            </Row>
                        </>
                    )}
                    {escola && (
                        <>
                            <Row style={{ fontSize: "17px", fontWeight: "bold", padding: "7px 10px" }}>
                                <Col md={3}>Nome:</Col>
                                <Col md={9}>{escolaOverlay.nome}</Col>
                            </Row>
                            <Row style={{ backgroundColor: "#F0F0F0", padding: "7px 10px" }}>
                                <Col md={5}>Horario de Func.:</Col>
                                <Col md={7}>{escolaOverlay.horarioFunc}</Col>
                            </Row>
                            <Row style={{ backgroundColor: "#F0F0F0", padding: "7px 10px" }}>
                                <Col md={5}>Ensino:</Col>
                                <Col md={7}>{escolaOverlay.ensino}</Col>
                            </Row>
                            <Row style={{ padding: "7px 10px" }}>
                                <Col md={6}>Número de alunos</Col>
                                <Col md={6}>{escolaOverlay.numeroAlunos}</Col>
                            </Row>
                            <Row style={{ padding: "7px 10px" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Link
                                        to={`/escolas/gerenciar/visualizar/${escolaOverlay.idEscola}`}
                                        style={{
                                            display: "block",
                                            marginBottom: "-2px",
                                            border: "none",
                                            backgroundColor: "transparent",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <FaSearch size={"30px"} color={"gray"} />
                                    </Link>
                                    <Link
                                        to={`/escolas/gerenciar/editar/${escolaOverlay.idEscola}`}
                                        style={{
                                            display: "block",
                                            marginLeft: "6px",
                                            border: "none",
                                            backgroundColor: "transparent",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <FaEdit size={"32px"} color={"orange"} />
                                    </Link>
                                    <button
                                        style={{
                                            border: "none",
                                            backgroundColor: "transparent",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                            console.log("excluir escola");
                                            // e.stopPropagation();
                                            // addOptions?.delete(escolaObj);
                                        }}
                                    >
                                        <FaTrash size={"30px"} color={"red"} />
                                    </button>
                                </div>
                            </Row>
                        </>
                    )}
                </OverlayContainer>
            </OverlayBootstrap>
        </>
    );
};

export { MapView, Marker };
