import React from "react";

import * as interaction from "ol/interaction";
import * as condition from "ol/events/condition";
import PopupFeature from "ol-ext/overlay/PopupFeature";

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
            let select = new interaction.Select({
                hitTolerance: 5,
                multi: true,
                condition: condition.singleClick,
            });
            map.mapInstance.addInteraction(select);
            let popup = new PopupFeature({
                select: select,
                canFix: true,
                template: {
                    title: function (f) {
                        return f.get("nom") + " (" + f.get("id") + ")";
                    },
                    attributes: {
                        region: { title: "Région" },
                        arrond: { title: "Arrondissement" },
                        cantons: { title: "Cantons" },
                        communes: { title: "Communes" },
                        pop: {
                            title: "Population", // attribute's title
                            before: "", // something to add before
                            after: " hab.", // something to add after
                        },
                        pop2: {
                            title: "Population (kHab.)", // attribute's title
                            format: function (val, f) {
                                return Math.round(parseInt(f.get("pop")) / 100).toLocaleString() + " kHab.";
                            },
                        },
                    },
                },
            });
            map.mapInstance.addOverlay(popup);
        }
    }, []);

    return (
        <Container ref={containerRef}>
            <div id="map"></div>
        </Container>
    );
};

export default OpenLayers;
