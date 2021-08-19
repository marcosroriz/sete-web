type StringObject = {
    [key: string]: string;
};

class FormatHelper {
    public mergeArrayItemsWithBr(arr: string[]): string {
        const arrLength = arr.length;
        let str = "";
        arr.forEach((item, index) => {
            str += `${item}</br>`;
            if (index === arrLength - 1) {
                str += item;
            }
        });
        return str;
    }

    public mergeObjectItemWithBr(obj: StringObject): string {
        const objectEntries = Object.entries(obj);
        let str = "";
        objectEntries.forEach(([, value], index) => {
            str += `${value}</br>`;
            if (index === objectEntries.length - 1) {
                str += value;
            }
        });
        return str;
    }
}

const formatHelper = new FormatHelper();
export { formatHelper, FormatHelper };
