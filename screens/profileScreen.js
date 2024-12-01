import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const { height: h, width: w } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();

  const optionTile = (title, icon, onPress) => (
    <TouchableOpacity style={styles.optionTile} onPress={onPress}>
      <View style={styles.optionTileContent}>
        <Icon name={icon} type="material" color="#007bff" size={24} />
        <Text style={styles.optionTitle}>{title}</Text>
      </View>
      <Icon name="arrow-forward-ios" type="material" size={16} />
    </TouchableOpacity>
  );

  const renderSection = (title, options) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {options.map((option, index) => (
        <View key={index}>
          {optionTile(option.title, option.icon, option.onPress)}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <View style={styles.profileIconContainer}>
          <Icon
            name="person"
            type="material"
            size={75}
            color="#87CEEB"
            containerStyle={styles.profileIcon}
          />
        </View>
      </View>


      <View style={styles.userInfo}>
        <Text style={styles.userName}>Hi, Yinhla Makamu</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>


      {renderSection('Account', [
        { title: 'Update Password', icon: 'lock-outline', onPress: () => {} },
        { title: 'Notifications', icon: 'notifications', onPress: () => {} },
      ])}
      {renderSection('Events', [
        { title: 'Events history', icon: 'list', onPress: () => {} },
        { title: 'Surveys', icon: 'insert-drive-file', onPress: () => {} },
      ])}
      {renderSection('About', [
        { title: 'About Us', icon: 'info-outline', onPress: () => {} },
        { title: 'Feedback', icon: 'thumbs-up-down', onPress: () => {} },
        { title: 'Privacy Policy', icon: 'privacy-tip', onPress: () => {} },
        { title: 'Terms and Conditions', icon: 'description', onPress: () => {} },
      ])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: h * 0.22,
    backgroundColor: '#000',
    display : 'flex',
    justifyContent : 'flex-end',
    marginBottom : h * 0.05,

  },
  profileIconContainer: {
    height: h * 0.11,
    width: w * 0.24,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : h * 0.05,
    position : 'absolute',
    top : h * 0.11,
    left : w * 0.05
    //bottom : 0
  },
  profileIcon: {
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 50,
    padding: 8,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: w * 0.05,
    marginVertical: h * 0.02,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: w * 0.05,
    paddingVertical: h * 0.01,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: h * 0.01,
  },
  optionTile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: h * 0.015,
  },
  optionTileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
