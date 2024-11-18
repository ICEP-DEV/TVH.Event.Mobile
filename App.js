import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from './screens/auth/login.js'
import NotificationScreen from "./screens/Notifications.js";
import HomeScreen from "./screens/home.js";
import RegistrationScreen from "./screens/registration.js";
import SignupScreen from './screens/auth/signup.js'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AllEvents from "./screens/allEvents.js";
import EventDetails from "./screens/eventdetails.js";
import RegistrationForm from './screens/registrationform.js';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: true, title: "Home" }} />
      <Stack.Screen
        name="AllEvents"
        component={AllEvents}
        options={{ headerShown: true, title: "All Events" }}
      />
      <Stack.Screen name="Register" component={RegistrationForm} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Notifications") {
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (route.name === "Registration") {
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
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
