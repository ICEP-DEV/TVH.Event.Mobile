import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import api from "../APIs/API";

const NotificationScreen = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [eventDetails, setEventDetails] = useState({}); // Store both images and titles
  const [error, setError] = useState(null);

  // Fetch all notifications
  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        const response = await axios.get(api + "/notifications/notifications");
        setAllNotifications(response.data);

        // Fetch event details for each notification
        const details = {};
        for (const notification of response.data) {
          const eventId = notification.event_id;
          if (eventId) {
            try {
              const eventResponse = await axios.get(api + "/event/" + eventId);
              const eventData = eventResponse.data.results[0];
              details[eventId] = {
                image: eventData.image,
                title: eventData.title,
              };
            } catch (eventError) {
              console.error(
                `Failed to load event details for event ID ${eventId}`,
                eventError
              );
            }
          }
        }
        setEventDetails(details);
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
  const renderNotification = ({ item }) => {
    const eventId = item.event_id;
    const event = eventDetails[eventId] || {}; // Get the event details (image and title)

    return (
      <Card containerStyle={styles.card}>
        <View style={styles.notificationContainer}>
          <Image
            source={
              displayBase64AsImage(event.image) ||
              require("../assets/default_event.jpg")
            }
            style={styles.logo}
          />
          <View style={styles.textContainer}>
            <Text style={styles.eventTitleText}>
              {event.title || "Event Title Not Available"}
            </Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.eventText}>Timestamp</Text>
          </View>
        </View>
      </Card>
    );
  };

  

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
  eventTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  messageText: {
    fontSize: 14,
    color: "#222",
  },
  eventText: {
    fontSize: 12,
    color: "#999",
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
