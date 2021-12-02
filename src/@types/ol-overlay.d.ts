import Overlay, { Options, OverlayObjectEventTypes, OverlayOnSignature, PanIntoViewOptions, PanOptions, Property } from "ol/Overlay";

import Popup from "ol-popup";

declare module "ol/Overlay" {
    export { Options, OverlayObjectEventTypes, OverlayOnSignature, PanIntoViewOptions, PanOptions, Property };
    export default class Over extends Overlay {
        public static Popup: Popup;
    }
}
