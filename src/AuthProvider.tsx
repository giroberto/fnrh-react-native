import React, { Props, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = React.createContext<{
    user: User;
    login: () => void;
    logout: () => void;
}>({ user: null, login: () => {}, logout: () => {} });

type User = null | { username: string };

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                login: () => {
                    const fakeUser = { username: "bob" };
                    setUser(fakeUser);
                    AsyncStorage.setItem("user", JSON.stringify(fakeUser));
                },
                logout: () => {
                    setUser(null);
                    AsyncStorage.removeItem("user");
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
