import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Center } from "./Center";
import { Text, Button } from "react-native";
import { AppParamList } from "./AppParamList";
import { AuthContext } from "./AuthProvider";

const Tabs = createBottomTabNavigator<AppParamList>();

interface AppTabsProps {}

function Home() {
    const { logout } = useContext(AuthContext);
    return (
        <Center>
            <Text>Home</Text>
            <Button
                title="Logout"
                onPress={() => {
                    logout();
                }}
            />
        </Center>
    );
}

function Hospede() {
    return (
        <Center>
            <Text>Hospede</Text>
        </Center>
    );
}

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused
                            ? "ios-information-circle"
                            : "ios-information-circle-outline";
                    } else if (route.name === "Hospede") {
                        iconName = focused ? "ios-list-box" : "ios-list";
                    }

                    // You can return any component that you like here!
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                }
            })}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray"
            }}
        >
            <Tabs.Screen name="Home" component={Home} />
            <Tabs.Screen name="Hospede" component={Hospede} />
        </Tabs.Navigator>
    );
};
