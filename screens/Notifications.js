import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import api from "../APIs/API";

const NotificationScreen = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [eventImages, setEventImages] = useState({});
  const [error, setError] = useState(null);

  // Fetch all notifications
  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        const response = await axios.get(
          "http://10.100.99.15:3001/api/notifications/notifications"
        );
        setAllNotifications(response.data);

        // Fetch event images for each notification
        const images = {};
        for (const notification of response.data) {
          const eventId = notification.event_id;
          if (eventId) {
            try {
              const eventResponse = await axios.get(`${api}/event/${eventId}`);
              const eventData = eventResponse.data.results[0]; // Adjusted for the correct API response format
              images[eventId] = eventData.image; // Store the base64 image
            } catch (eventError) {
              console.error(
                `Failed to load event image for event ID ${eventId}`,
                eventError
              );
            }
          }
        }
        setEventImages(images);
      } catch (error) {
        console.error(error);
        setError("Failed to load notifications. Please try again later.");
      }
    };

    getAllNotifications();
  }, []);

  // Convert base64 image to a URI
  const displayBase64AsImage = (base64Image) => {
    if (!base64Image) return null;
    return { uri: `data:image/jpeg;base64,${base64Image}` };
  };

  // Render each notification card
  const renderNotification = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.notificationContainer}>
        <Image
          source={
            displayBase64AsImage(eventImages[item.event_id]) ||
            require("../assets/default_event.jpg")
          }
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.eventText}>
            Event: {eventImages[item.event_id] ? "Loaded" : "Not Available"}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={allNotifications}
          keyExtractor={(item) => item.notification_id.toString()}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
  eventText: {
    fontSize: 12,
    color: "#555",
  },
  card: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#E0F0FF",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default NotificationScreen;
