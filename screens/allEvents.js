import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import api from "../APIs/API";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// Main Component: AllEvents
function AllEvents() {
  const navigation = useNavigation();

  const [allevents, setAllEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await axios.get(api + "/event/all");
        setAllEvents(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    const getAllCategories = async () => {
      try {
        const response = await axios.get(api + "category/all");
        setCategory(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getAllEvents();
    getAllCategories();
  }, []);

  const formattedDate = (databaseDate) => {
    const date = new Date(databaseDate);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const displayBlobAsImage = (blobData) => {
    // Convert the blob to a Base64 string
    const base64Image = `data:image/jpeg;base64,${blobData}`;
    return { uri: base64Image };
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.eventList}>
          {allevents.map((event) => (
            <View key={event.event_id} style={styles.eventCardContainer}>
              <Image
                source={displayBlobAsImage(event.image)}
                style={styles.eventImage}
              />
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                  {formattedDate(event.start_date)}
                </Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.locationContainer}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/pin.png")}
                  style={styles.locationIcon}
                />
                <Text style={styles.locationText}>{event.location}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => navigation.navigate("Register")} // Navigate to Register screen
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 13 },
  statusBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 326,
  },
  timeText: {
    color: "rgba(25, 25, 26, 1)",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  iconContainer: { flexDirection: "row", marginLeft: 5 },
  cellularIcon: { width: 17, aspectRatio: 1.7 },
  wifiIcon: { width: 15, aspectRatio: 1.36 },
  batteryIcon: { width: 25, aspectRatio: 2.08 },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 11,
    marginLeft: 14,
    width: "100%",
    maxWidth: 342,
  },
  backButton: {
    borderRadius: 28,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: { width: 24, aspectRatio: 1 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderRadius: 36,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  searchIcon: { width: 24, aspectRatio: 1, marginRight: 8 },
  input: { flex: 1, fontSize: 12, color: "rgba(161, 155, 155, 1)" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 46,
    marginLeft: 14,
    marginBottom: 16,
  },
  headerText: { fontSize: 18, color: "#120D26", fontWeight: "600", flex: 1 },
  headerIcon: { width: 6, aspectRatio: 0.67 },
  eventList: { alignItems: "center" },
  eventCardContainer: {
    borderRadius: 25,
    padding: 10,
    marginBottom: 28,
    width: "100%",
    maxWidth: 326,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  eventImage: { borderRadius: 10, aspectRatio: 1.17, width: "100%" },
  dateContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "rgba(240, 99, 90, 0.8)",
    borderRadius: 10,
  },
  dateText: { fontSize: 14, color: "white", textAlign: "center" },
  eventTitle: { fontSize: 18, fontWeight: "500", color: "black", marginTop: 4 },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    padding: 0,
    height: 30,
  },
  locationIcon: { width: 16, marginRight: 5 },
  locationText: {
    fontSize: 13,
    color: "rgba(43, 40, 73, 1)",
    fontWeight: "900",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    height: 45,
    alignItems: "center",
  },
  viewButton: {
    borderRadius: 10,
    borderColor: "rgba(88, 200, 66, 1)",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  viewButtonText: {
    color: "rgba(88, 200, 66, 1)",
    fontSize: 20,
    fontWeight: "900",
    width: 90,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  registerButton: {
    borderRadius: 10,
    backgroundColor: "rgba(88, 200, 66, 1)",
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    width: 90,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
export default AllEvents;
