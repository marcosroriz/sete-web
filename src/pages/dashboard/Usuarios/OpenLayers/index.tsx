import React from "react";

import ol from "ol";
import * as interaction from "ol/interaction";
import * as events from "ol/events";
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
            const marker = map.createMarker({ lng: Number(-48.068419), lat: Number(-15.105272), icon: AlunosMarker, anchor: [25, 50] });
            let select = new interaction.Select({
                hitTolerance: 5,
                multi: false,
                condition: events.condition.singleClick,
                filter: (feature, layer) => {
                    if (feature.getGeometry().getType() == "Point" && feature.getProperties()["TIPO"] == tipo) {
                        return true;
                    } else {
                        return false;
                    }
                },
            });
            let popupEscola = new PopupFeature({
                closeBox: true,
                onshow: () => {
                    console.log("abrir");
                },
                onclose: () => {
                    console.log("Fechou");
                },
                template: {
                    title: (elem) => {
                        return "Aluno Meu";
                    },
                    attributes: {
                        NOME: {
                            title: "Nome",
                        },
                        SEXO: {
                            title: "Sexo",
                        },
                        NIVELSTR: {
                            title: "Nível",
                        },
                        TURNOSTR: {
                            title: "Turno",
                        },
                    },
                },
            });
        }
    }, []);

    return (
        <Container ref={containerRef}>
            <div id="map"></div>
        </Container>
    );
};

export default OpenLayers;
