/**
 * Classe que serve para formatar inputs para uma forma desejada
 */

type StringObject = {
    [key: string]: string;
};

class FormatHelper {
    public capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
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
}

const formatHelper = new FormatHelper();
export { formatHelper, FormatHelper };
