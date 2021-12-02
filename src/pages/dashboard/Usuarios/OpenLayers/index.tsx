import React from "react";
import Overlay from "ol/Overlay";

import { toLonLat } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";
import RenderFeature from "ol/render/Feature";
import Geometry from "ol/geom/Geometry";

import { Map } from "helpers/Maps/Map";

import AlunosMarker from "assets/icons/alunos/alunos-marker.png";

import { Container } from "./styles";

const OpenLayers: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [target, setTarget] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const mapRef = React.useRef<Map | null>(null);

    const handleClick = (event) => {
        setIsOpen((prev) => !prev);
        setTarget(event.target);
    };

    React.useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new Map("map", { zoom: 5 });
            const map = mapRef.current;
            map.createMarker({ lng: Number(-48.068419), lat: Number(-15.105272), icon: AlunosMarker, anchor: [25, 50] });
            let popup = new Overlay.Popup();
            popup.setOffset([0, -55]);
            map.mapInstance.addOverlay(popup);
            map.mapInstance.on("click", function (evt) {
                let f = map.mapInstance.forEachFeatureAtPixel(evt.pixel, function (ft, layer) {
                    return ft;
                });
                if (f && f.get("type") == "click") {
                    let geometry = f.getGeometry() as any;
                    let coord = geometry.getCoordinates();

                    let content = "<h1>" + f.get("desc") + "</h1>";

                    popup.show(coord, content);
                } else {
                    popup.hide();
                }
            });
            // const popup = new Overlay({
            //     element: document.getElementById("popup") || undefined,
            // });
            // map.mapInstance.addOverlay(popup);
            // map.mapInstance.on("click", function (evt) {
            //     const element = popup.getElement() as HTMLElement;
            //     console.log(`clicou no mapa`);
            //     if (element) {
            //         const jqElement = $(element) as any;
            //         jqElement.popover("dispose");
            //         map.mapInstance.forEachFeatureAtPixel(evt.pixel, function () {
            //             const coordinate = evt.coordinate;
            //             popup.setPosition(coordinate);
            //             jqElement.popover({
            //                 container: element,
            //                 placement: "top",
            //                 animation: false,
            //             });
            //             jqElement.popover("show");
            //         });
            //     }
            // });
        }
    }, []);

    return (
        <Container ref={containerRef}>
            <div id="map"></div>
            <div style={{ display: "none" }}>
                <div id="popup" title="Welcome to OpenLayers">
                    <button>Clica aqui</button>
                </div>
            </div>
        </Container>
    );
};

export default OpenLayers;
