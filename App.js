import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from './screens/login'
import NotificationScreen from "./screens/Notifications.js";
import HomeScreen from './screens/home.js'
import SignupScreen from './screens/signup.js'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Event") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Notifications") {
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return (
              <Icon name={iconName} type="ionicon" color={color} size={size} />
            );
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        
      </Tab.Navigator>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}