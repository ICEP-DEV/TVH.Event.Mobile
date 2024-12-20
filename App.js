import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from './screens/auth/login.js'
import NotificationScreen from "./screens/Notifications.js";
import HomeScreen from './screens/home.js'
import RegistrationScreen from "./screens/registration.js";
import SignupScreen from './screens/auth/signup.js'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AllEvents from "./screens/allEvents.js";
import EventDetails from "./screens/eventdetails.js";
import RegistrationForm from './screens/registrationform.js';
import FeedbackAndReview from "./screens/feedback_and_review/feedback.js";
import ProfileScreen from "./screens/profileScreen.js";
import RegisteredEventsScreen from "./screens/profile/registeredEvents.js";
import SurveyScreen from "./screens/surveyScreen.js";
import EventFeedbackScreen from "./screens/eventFeedbackScreen.js";
import CalendarScreen from "./screens/calendaScreen.js";

import QRScannerComponent from "./screens/components/qrscanner.component.js";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Events") {
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
      <Tab.Screen name="Events" component={CalendarScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
  

export default function App(){

  const requestPermission = async()=>{
    
    try{
      const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.VIBRATE
      );
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomePage"
      >
        <Stack.Screen name="HomePage" component={TabNavigator} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AllEvents" component={AllEvents} />
        <Stack.Screen name="RegisterForm" component={RegistrationForm} />
        <Stack.Screen name="FeedbackAndReview" component={FeedbackAndReview} />
        <Stack.Screen name="RegisteredEventsScreen" component={RegisteredEventsScreen} />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SurveyScreen"
          component={SurveyScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="EventFeedbackScreen"
          component={EventFeedbackScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScannerComponent}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}