import { NativeInstance, getNativeClient } from "./nativeClient";

class FileService {
    private api: NativeInstance;

    constructor() {
        this.api = getNativeClient();
    }

    public async saveFile() {
        const response = await this.api({ url: "/open_file" });
        console.log(response);
    }
}

export { FileService };
