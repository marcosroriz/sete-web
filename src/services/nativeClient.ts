import Electron from "electron";
const electron = (process.env.REACT_APP_APP_ENV === "web" ? {} : require("electron")) as typeof Electron;

type Urls = "/save_file" | "/open_file";

type NativeResponses = {
    response: {
        status: number;
        data: any;
    };
};

type NativeInstanceProps = {
    url: Urls;
    data?: any;
    params?: any;
};

type NativeInstance = (data: NativeInstanceProps) => Promise<NativeResponses>;

const electronConnectionByName = (payload: NativeInstanceProps) => {
    if (process.env.REACT_APP_APP_ENV === "web") {
        return new Promise<NativeResponses>((resolve) =>
            resolve({ response: { status: 400, data: { messages: "Você precisa estar no aplicativo desktop para acessar esse recurso" } } }),
        );
    }
    return new Promise<NativeResponses>((resolve, reject) => {
        const electronConnectionCallback = (_: any, value: any) => {
            if (value.status > 399) {
                reject(value);
            } else {
                resolve(value.response);
            }
            electron.ipcRenderer.removeListener(`main${payload.url}`, electronConnectionCallback);
        };
        electron.ipcRenderer.on(`main${payload.url}`, electronConnectionCallback);
        electron.ipcRenderer.send(`renderer${payload.url}`, payload);
    });
};

const getNativeClient = (): NativeInstance => {
    return (data) => {
        return electronConnectionByName(data);
    };
};

export type { NativeInstance };
export { getNativeClient };
