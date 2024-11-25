import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import api from "../../APIs/API";
import { getAttendee } from "../utils/auth";

const RegisteredEventsScreen = ({ navigation }) => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with the attendee_id for your user
  const attendeeId = 30; 
  // Example attendee ID

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(api + "/attendee/events/" +attendeeId);
        const data = await response.json();

        // Check if the request was successful
        if (response.ok) {
          setRegisteredEvents(data.results);
        } else {
          console.error("Error fetching registered events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching registered events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
        <Text>Loading Registered Events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registered Events</Text>
        <TouchableOpacity onPress={() => console.log("Notifications")}>
          <Icon name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <FlatList
        data={registeredEvents}
        keyExtractor={(item) => item.event_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventItem} onPress={() => {
            navigation.navigate("EventDetails", { item });
          }}>
            <Text style={styles.eventText}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: 50
  },
  header: {
    backgroundColor: "#32CD32",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  eventText: {
    fontSize: 16,
    color: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisteredEventsScreen;
