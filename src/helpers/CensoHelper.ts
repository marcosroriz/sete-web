import Papa from "papaparse";

class CensoHelper {
    public parseBaseCenso(arq: any, cb: any) {
        Papa.parse(arq);
    }
}

export { CensoHelper };
