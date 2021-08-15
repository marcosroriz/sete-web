import { parse, serialize, CookieParseOptions, CookieSerializeOptions } from "cookie";

class Cookie {
    public parse(options?: CookieParseOptions): { [key: string]: string } {
        const cookies = parse(document.cookie, options);
        return cookies;
    }
    public get(name: string, options?: CookieParseOptions): string | undefined {
        const cookies = parse(document.cookie, options);
        return cookies[name] || undefined;
    }
    public set(name: string, value: string, options?: CookieSerializeOptions): void {
        document.cookie = serialize(name, value, options);
    }
    public destroy(name: string): void {
        document.cookie = serialize(name, "", { expires: new Date(1, 1, 1) });
    }
}

const cookie = new Cookie();
export { cookie, Cookie };
