import React, { useState, useContext, useEffect } from "react";
import {
    createStackNavigator,
    StackNavigationProp
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { Text, Button, ActivityIndicator, AsyncStorage } from "react-native";
import { Center } from "./components/Center";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { AuthContext } from "./AuthProvider";

interface RouteProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
    const { login } = useContext(AuthContext);
    return (
        <Center>
            <Text>Login</Text>
            <Button
                title="Login"
                onPress={() => {
                    login();
                }}
            />
            <Button
                title="Go to register"
                onPress={() => {
                    navigation.navigate("Register");
                }}
            />
        </Center>
    );
}

function Register({ navigation }: AuthNavProps<"Register">) {
    return (
        <Center>
            <Text>Register</Text>
            <Button
                title="Go to login"
                onPress={() => {
                    navigation.navigate("Login");
                }}
            />
        </Center>
    );
}

export const Routes: React.FC<RouteProps> = ({}) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("user").then(userString => {
            if (userString) {
                //decode it
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        );
    }
    return (
        <NavigationContainer>
            {user ? (
                <Center>
                    <Text>You're logged in!</Text>
                </Center>
            ) : (
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        options={{
                            title: "Sign In"
                        }}
                        component={Login}
                    />
                    <Stack.Screen
                        name="Register"
                        options={{
                            title: "Sign Up"
                        }}
                        component={Register}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};
