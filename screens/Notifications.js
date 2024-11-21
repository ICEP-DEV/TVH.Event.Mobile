import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";

const NotificationScreen = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        const response = await axios.get("http://10.100.99.15:3001/api/notifications/notifications");
        setAllNotifications(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load notifications. Please try again later.");
      }
    };

    getAllNotifications();
  }, []);

  const displayBlobAsImage = (blobData) => {
    // Convert the blob to a Base64 string
    const base64Image = `data:image/jpeg;base64,${blobData}`;
    return { uri: base64Image };
  };

  const renderNotification = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.notificationContainer}>
        <Image
          source={require("../assets/alx.jpg")} // Use a placeholder logo
          style={styles.logo}
        />
        <Text style={styles.messageText}>{item.message}</Text>
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
  messageText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
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
