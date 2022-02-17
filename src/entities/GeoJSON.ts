interface Geometry {
    type: string;
    coordinates: number[];
}

interface GeoJSON {
    type: string;
    geometry: Geometry;
    features: any[];
    bbox?: number[];
    properties?: any;
}

export type { Geometry, GeoJSON };
