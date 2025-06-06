import { createContext, useState, useMemo, ReactNode } from "react";

type UserType = {
    id: string;
    username: string;
};

type AuthContextTypes = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextTypes | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const value: AuthContextTypes = useMemo(() => ({ isAuthenticated, setIsAuthenticated, user, setUser }), [isAuthenticated, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
