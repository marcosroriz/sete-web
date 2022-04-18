import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

class FilesHelper {
    public downloadFile(blob: string | Blob, fileName: string) {
        saveAs(blob, fileName);
    }

    public async delay(num: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, num);
        });
    }

    public processXslxFile(aoaData: React.ReactNode[][]): Blob {
        let worksheet = XLSX.utils.aoa_to_sheet(aoaData);
        let new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, "Planilha1");
        const writtenFile = XLSX.write(new_workbook, { bookType: "xlsx", type: "binary" });
        return new Blob([this.s2ab(writtenFile)]);
    }

    public s2ab(s: any): ArrayBuffer {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }
}

const filesHelper = new FilesHelper();
export { filesHelper, FilesHelper };
