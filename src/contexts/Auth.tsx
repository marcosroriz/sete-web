import React from "react";
import md5 from "md5";

import { AuthenticatorService } from "services/Authenticator";
import { cookie } from "helpers/Cookie";
import { User } from "entities/User";
import { useError } from "hooks/Errors";

type FormikNavCardData = {
    user: User | null;
    isAuthenticated: boolean;
    signIn(data: { email: string; senha: string }): Promise<void>;
    signOut(): Promise<void>;
};

const AuthContext = React.createContext({} as FormikNavCardData);

const AuthProvider: React.FC = ({ children }) => {
    const { errorHandler } = useError();
    const [user, setUser] = React.useState<User | null>(() => {
        const token = cookie.get("@sete-web:token");
        if (token) return {};
        return null;
    });
    const isAuthenticated = !!user;
    const authenticatorService = new AuthenticatorService();

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userInfo = await authenticatorService.isAuthenticated();
                if (userInfo) {
                    const data = userInfo.data;
                    setUser({ ...data });
                    if (!userInfo.result) throw { ...userInfo };
                }
            } catch (err) {
                errorHandler(err, { title: "Atenção" });
            }
        };
        fetchUserData();
    }, []);

    const signIn = React.useCallback(async (data: { email: string; senha: string }): Promise<void> => {
        const response = await authenticatorService.signIn({ usuario: data.email, senha: md5(data.senha) });
        setUser({ ...response.data });
    }, []);

    const signOut = React.useCallback(async (): Promise<void> => {
        setUser(null);
        await authenticatorService.signOut();
    }, []);

    return <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>{children}</AuthContext.Provider>;
};

const useAuth = (): FormikNavCardData => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado entre um contexto");
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };
