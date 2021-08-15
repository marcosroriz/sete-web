import { Location } from "history";
import queryString from "query-string";

import { Permission } from "entities/Permission";

class AuthRouteHelper {
    public userTypePermission = {
        reader: 0,
        editor: 1,
        admin: 2,
    };

    public renderPathname(isPrivate: boolean, location: Location<unknown>): string {
        let redirectUrl = "";
        const params = queryString.parse(location.search);
        if (isPrivate) {
            redirectUrl = "/login";
        } else {
            if (params.redirect) {
                redirectUrl = params.redirect as string;
            } else {
                redirectUrl = "/";
            }
        }
        return redirectUrl;
    }

    public checkPermission(routePermission: Permission, userPermission: Permission): boolean {
        const routeType = this.userTypePermission[routePermission || "reader"];
        const userType = this.userTypePermission[userPermission || "reader"];
        if (routeType > userType) return false;
        return true;
    }
}

const authRouteHelper = new AuthRouteHelper();
export { authRouteHelper, AuthRouteHelper };
