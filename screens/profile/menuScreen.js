import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";

const ProfileScreen = ({ navigation }) => {
  // Menu items
  const menuItems = [
    {
      id: 1,
      title: "Registered Events",
      onPress: () => console.log("Registered Events Pressed"),
    },
    {
      id: 2,
      title: "Surveys",
      onPress: () => console.log("Surveys Pressed"),
    },
    // {
    //   id: 3,
    //   title: "Feedback & Reviews",
    //   onPress: () => navigation.navigate("FeedbackAndReview"),
    // },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => console.log("Notifications")}>
          <Icon name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/default_profile.jpg")} // Replace with the user's profile picture
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <View style={styles.menuList}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
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
  profileSection: {
    alignItems: "center",
    backgroundColor: "#32CD32",
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  menuList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuTitle: {
    fontSize: 16,
    color: "#000",
  },
});

export default ProfileScreen;
