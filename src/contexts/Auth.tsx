import React from "react";
import md5 from "md5";

import { AuthenticatorService } from "services/Authenticator";
import { User } from "entities/User";
import { Permission } from "entities/Permission";

type FormikNavCardData = {
    user: User | null;
    isAuthenticated: boolean;
    signIn(data: { email: string; senha: string }): Promise<void>;
    signOut(): Promise<void>;
};

const AuthContext = React.createContext({} as FormikNavCardData);

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const isAuthenticated = !!user;
    const authenticatorService = new AuthenticatorService();

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await authenticatorService.isAuthenticated();
                if (data) {
                    const userData = data.data;
                    setUser({ nome: userData.nome, tipo_permissao: userData.tipo_permissao });
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserData();
    }, []);

    const signIn = React.useCallback(async (data: { email: string; senha: string }): Promise<void> => {
        const response = await authenticatorService.signIn({ usuario: data.email, senha: md5(data.senha) });
        setUser({ tipo_permissao: response.access_token.tipo_permissao as Permission });
    }, []);

    const signOut = React.useCallback(async (): Promise<void> => {
        await authenticatorService.signOut();
        setUser(null);
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