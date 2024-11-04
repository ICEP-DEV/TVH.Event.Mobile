import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const events = [
  {
    id: 1,
    title: "ALX Hackathon",
    date: "10\nJune",
    image:
      "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/2e0f5546a0dda100eaee72677eac032cc83b0715937057726a668e45e8f6ac4c?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
    location: "Soshanguve South,\nPTA",
  },
  {
    id: 2,
    title: "GKHack '24",
    date: "10\nJune",
    image:
      "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/dc75f7d0f60462380902628fb3a751b03087575359cfbfd0ad3701e2c2bdeb9e?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
    location: "Soshanguve South,\nPTA",
  },
  {
    id: 3,
    title: "AWS Hackathon",
    date: "10\nJune",
    image:
      "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/97bc880b18f2bef778d16354a36dd039ee1fefad766b0b22b643091aa3b8e516?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
    location: "Soshanguve South,\nPTA",
  },
  {
    id: 4,
    title: "TVH",
    date: "10\nJune",
    image:
      "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/25f22e1aa821631e11a8ad68d2f1ea2838f2096367f8fe00b4d4f5d9cd98a51b?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
    location: "Soshanguve South,\nPTA",
  },
];

// Main Component: AllEvents
function AllEvents() {
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        

        

        {/* Event Cards */}
        <View style={styles.eventList}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCardContainer}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{event.date}</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.locationContainer}>
                <Image
                  resizeMode="contain"
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/8e3b3bc5bfaa13b728e4d3e40c920eb3f3a83fe0504652e27f31767e38e41870?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
                  }}
                  style={styles.locationIcon}
                />
                <Text style={styles.locationText}>{event.location}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton}>
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
    marginTop: 8,
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
