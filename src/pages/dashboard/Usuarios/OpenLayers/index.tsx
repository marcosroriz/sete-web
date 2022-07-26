import React from "react";
import { Overlay as OverlayBootstrap } from "react-bootstrap";

import * as interaction from "ol/interaction";
import * as condition from "ol/events/condition";
import PopupFeature from "ol-ext/overlay/PopupFeature";
import Popup from "ol-ext/overlay/Popup";
import Overlay from "ol/Overlay";

import { Map } from "helpers/Maps/Map";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container } from "./styles";

import $ from "jquery";

const OpenLayers: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const popRef = React.useRef<HTMLDivElement | null>(null);
    //const [target, setTarget] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const mapRef = React.useRef<Map | null>(null);

    const [pupulation, setPopulation] = React.useState<Number>(0);

    // const handleClick = (event) => {
    //     setIsOpen((prev) => !prev);
    //     setTarget(event.target);
    // };

    React.useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new Map("map", { zoom: 5 });
            const map = mapRef.current;
            map.createMarker({ lng: Number(-48.068419), lat: Number(-15.105272), icon: AlunosMarker, anchor: [25, 50], population: 434300, rainfall: 500 });
            map.createMarker({ lng: Number(-60.068419), lat: Number(-15.105272), icon: AlunosMarker, anchor: [25, 50], population: 4000, rainfall: 500 });
            // let select = new interaction.Select({
            //     hitTolerance: 5,
            //     multi: true,
            //     condition: condition.singleClick,
            // });
            // map.mapInstance.addInteraction(select);
            // let popup = new PopupFeature({
            //     select: select,
            //     canFix: true,
            //     template: {
            //         title: function (f) {
            //             return f.get("nom") + " (" + f.get("id") + ")";
            //         },
            //         attributes: {
            //             region: { title: "Région" },
            //             arrond: { title: "Arrondissement" },
            //             cantons: { title: "Cantons" },
            //             communes: { title: "Communes" },
            //             pop: {
            //                 title: "Population", // attribute's title
            //                 before: "", // something to add before
            //                 after: " hab.", // something to add after
            //             },
            //             pop2: {
            //                 title: "Population (kHab.)", // attribute's title
            //                 format: function (val, f) {
            //                     return Math.round(parseInt(f.get("pop")) / 100).toLocaleString() + " kHab.";
            //                 },
            //             },
            //         },
            //     },
            // });
            const element = document.getElementById("popup");

            const popup1 = new Overlay({
                element: element as any,
                positioning: "top",
                stopEvent: false,
            });

            const popup = new Popup();

            map.mapInstance.addOverlay(popup1);
            //map.mapInstance.addOverlay(popup);

            map.mapInstance.on("click", function (evt) {
                const feature = map.mapInstance.forEachFeatureAtPixel(evt.pixel, function (feature) {
                    return feature;
                });

                console.log("feature", feature);
                if (feature) {
                    popup1.setPosition(evt.coordinate);
                    //popup.show([-48.13477867179912, -14.872759985941514], "djkdjkdjkdjk");

                    setIsOpen(true);
                    setPopulation(feature.get("population"));

                    // $(element).popover({
                    //     placement: "top",
                    //     html: true,
                    //     content: feature.get("name"),
                    // });
                    // $(element).popover("show");
                    //setIsOpen(true);
                } else {
                    popup.hide();
                    setIsOpen(false);
                }
            });
        }
    }, []);

    return (
        <>
            <Container ref={containerRef}>
                <div id="map">
                    <div ref={popRef} id="popup"></div>
                </div>
            </Container>
            <OverlayBootstrap target={popRef.current} show={isOpen} placement="right">
                <div
                    style={{
                        position: "absolute",
                        backgroundColor: "rgba(255, 100, 100, 0.85)",
                        padding: "2px 10px",
                        color: "white",
                        borderRadius: 3,
                    }}
                >
                    {pupulation}
                </div>
            </OverlayBootstrap>
        </>
    );
};

export default OpenLayers;
