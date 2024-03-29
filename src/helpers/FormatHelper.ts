/**
 * Classe que serve para formatar inputs para uma forma desejada
 */

type StringObject = {
    [key: string]: string;
};

type ValueOf<T> = T[keyof T];

class FormatHelper {
    public capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
    }

    public normalize(str: string): string {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s/g, "")
            .toLocaleLowerCase();
    }

    public mergeArrayItemsWithBr(arr: string[]): string {
        const arrLength = arr.length;
        let str = "";
        arr.forEach((item, index) => {
            if (index === arrLength - 1) {
                str += item;
                return;
            }
            str += `${item}</br>`;
        });
        return str;
    }

    public mergeObjectItemWithBr(obj: StringObject): string {
        const objectEntries = Object.entries(obj);
        let str = "";
        objectEntries.forEach(([, value], index) => {
            if (index === objectEntries.length - 1) {
                str += value;
                return;
            }
            str += `${value}</br>`;
        });
        return str;
    }

    public concatUrlImg(img: string) {
        const backendUrl = process.env.REACT_APP_API_URL || "";
        return `${backendUrl}/${img}`;
    }

    public getNumbersEnumEntries<Enum extends object = {}>(enValues: Enum): [string, ValueOf<Enum>][] {
        return Object.entries(enValues).filter((x) => typeof x === "number") as any;
    }
    public getNumbersEnumValues<Enum extends object = {}>(enValues: Enum): ValueOf<Enum>[] {
        return Object.values(enValues).filter((x) => typeof x === "number") as any;
    }
    public parseBooleanToSN(bool?: boolean) {
        return bool ? "S" : "N";
    }
    public parseSNToBoolean(str?: string) {
        return str === "S";
    }
    public parseSNToString(sn?: string, str?: string) {
        return this.parseSNToBoolean(sn) ? str : undefined;
    }
}

const formatHelper = new FormatHelper();
export { formatHelper, FormatHelper };
