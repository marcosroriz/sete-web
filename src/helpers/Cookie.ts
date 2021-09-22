import { parse, serialize, CookieParseOptions, CookieSerializeOptions } from "cookie";

class Cookie {
    private isJSON(value: string): boolean {
        try {
            JSON.parse(value);
        } catch (err) {
            return false;
        }
        return true;
    }
    private stringfyJSON(value: any): string {
        if (typeof value === "object" && value !== null) {
            return JSON.stringify(value);
        }
        return value.toString();
    }
    private parseJSON(value: string): any {
        if (this.isJSON(value)) {
            return JSON.parse(value);
        }
        return value;
    }
    public parse(options?: CookieParseOptions): { [key: string]: string } {
        const cookies = parse(document.cookie, options);
        return cookies;
    }
    public get(name: string, options?: CookieParseOptions): any | undefined {
        const cookies = parse(document.cookie, options);
        return this.parseJSON(cookies[name]) || undefined;
    }
    public set(name: string, value: any, options?: CookieSerializeOptions): void {
        document.cookie = serialize(name, this.stringfyJSON(value), options);
    }
    public destroy(name: string): void {
        document.cookie = serialize(name, "", { expires: new Date(1, 1, 1) });
    }
}

const cookie = new Cookie();
export { cookie, Cookie };
