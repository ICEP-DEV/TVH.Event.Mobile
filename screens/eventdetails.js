import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../APIs/API";

const { height, width } = Dimensions.get("window");

export default function EventDetails({ route, navigation }) {
  const { event } = route.params;

  const [imageUri, setImageUri] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (event.image) {
      setImageUri(`data:image/jpeg;base64,${event.image}`);
    }

    const getRegistered = async () => {
      const attendee = await AsyncStorage.getItem("attendee_id");
      setIsLogged(attendee);
      try {
        const attendee_id = await AsyncStorage.getItem("attendee_id");
        const payload = {
          attendee_id: attendee_id,
          event: event.event_id,
        };
        await axios
          .post(api + "/register/checkattendee", payload)
          .then((response) => {
            if (response.data["message"]) {
              setIsRegistered(true);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    getRegistered();
  }, [event.image, event.event_id]);

  const toRegister = async () => {
    if (isRegistered) {
      Alert.alert("You have already registered");
    } else {
      navigation.navigate("RegisterForm", event.event_id);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.navText}>Event Details</Text>
      </View>

      <View style={styles.card}>
        <Image source={{ uri: imageUri }} style={styles.eventImage} />

        <View style={styles.content}>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Location: </Text>
            {event.location}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Time: </Text>
            {event.time.split("T")[1].split(".")[0]}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Start Date: </Text>
            {event.start_date.split("T")[0]}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>End Date: </Text>
            {event.end_date.split("T")[0]}
          </Text>

          <Button
            title="Register"
            buttonStyle={styles.registerButton}
            onPress={() => {
              if (isLogged !== null) {
                toRegister();
              } else {
                navigation.replace("Login");
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  navBar: {
    backgroundColor: "#32CD32",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  navText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: "100%",
    height: height * 0.25,
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#32CD32",
    borderRadius: 5,
    marginTop: 15,
  },
});
