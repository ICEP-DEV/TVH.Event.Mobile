import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';

import { Icon } from 'react-native-elements';
import { endSession } from "./utils/auth"; 
import CustomModal from "./components/modal.component";
import { AboutUs, EventsHistory, Feedback, NotificationSetting, PrivacyPolicy, Surveys, TermsConditions, UpdatePassword } from "./components/profile.component";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../APIs/API';
import axios from 'axios';

const { height: h, width: w } = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  const [attendee, setAttendee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: null, props : {} });
  const [surveys, setSurveys] = useState([])


  const showModal = (title, Component, props = {}) => {
    setModalContent({ 
      title, 
      Component, 
      props 
    });
    setIsModalVisible(true);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AsyncStorage.getItem("attendee");
        if (response) {
          setAttendee(JSON.parse(response)); 
          getAllSurveys(JSON.parse(response));
        } else {
          setAttendee(null); 
        }
      } catch (error) {
        console.error("Error retrieving attendee from AsyncStorage:", error);
      }
    };

    const getAllSurveys = async (a) =>{
      await axios.get(
        api + "/survey/getallforattendee/" + a.attendee_id
      ).then((response) =>{
        setSurveys(response.data.surveys)
      }).catch((error) =>{
        console.log(error)
      })
    }
  
    getUserInfo();
    
  }, []);
  

  const optionTile = (title, icon, onPress, notification = false) => (
    <TouchableOpacity style={styles.optionTile} onPress={onPress}>
      <View style={styles.optionTileContent}>
        <Icon name={icon} type="material" color="#007bff" size={24} />
        <View style={styles.optionTitle}>
          <Text style={styles.optionTileText}>{title}</Text>
          {
            notification === true ?
            <Icon 
              name='info'
              color="#007bff"
              size={16}
            /> : <></>
          }
        </View>
      </View>
      <Icon name="arrow-forward-ios" type="material" size={16} />
    </TouchableOpacity>
  );

  const renderSection = (title, options) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {options.map((option, index) => (
        <View key={index}>
          {optionTile(option.title, option.icon, option.onPress, option.notification)}
        </View>
      ))}
    </View>
  );

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileIconContainer}>
          <Icon
            name="person"
            type="material"
            size={75}
            color="#007bff"
            containerStyle={styles.profileIcon}
          />
        </View>
      </View>

      {
        attendee === null ? (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Hi, Guest</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={() => {
              navigation.replace('Login')
              }}>
              <Text style={styles.logoutText}>Log in</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Hi, {attendee.first_name}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={() => {
              endSession(navigation);
              }}>
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        )
      }
      


      {renderSection('Account', [
        {
          title: 'Update Password',
          icon: 'lock-outline',
          onPress: () =>
          showModal('Update Password', UpdatePassword, { attendee }),
        },
        { title: 'Notifications', icon: 'notifications', onPress: () => 
          showModal(
            'Notifications Settings',
            NotificationSetting
          ),
        },
      ])}
      {renderSection('Events', [
        { title: 'Events history', icon: 'event', onPress: () => 
          showModal(
            'Events History',
            EventsHistory,
            {attendee, setIsModalVisible,setModalContent,navigation}
          ),
         },
        { title: 'Surveys', icon: 'question-answer', notification : surveys.length > 0, onPress: () => 
          showModal(
            'Surveys',
            Surveys,
            {surveys, setIsModalVisible,setModalContent,navigation}
          ),
        },
      ])}
      {renderSection('About', [
        { title: 'About Us', icon: 'info-outline', onPress: () => 
          showModal(
            'About Us',
            AboutUs
          ),
        },
        { title: 'Feedback', icon: 'thumbs-up-down', onPress: () => 
          showModal(
            'Give us Feedback',
            Feedback
          ),
         },
        { title: 'Privacy Policy', icon: 'privacy-tip', onPress: () => 
          showModal(
            'Our Privacy Policy',
            PrivacyPolicy
          ),
         },
        { title: 'Terms and Conditions', icon: 'description', onPress: () => 
          showModal(
            'Terms & Conditions',
            TermsConditions
          ),
         },
      ])}
      </ScrollView>
    
      <CustomModal 
        isVisible={isModalVisible} 
        onClose={() => { 
          setIsModalVisible(false); 
          setModalContent({ title: '', content: null, props: {} }); 
          }} 
        title={modalContent.title} 
        content={ 
          modalContent.Component ? <modalContent.Component {...modalContent.props} /> 
          : null } 
      />

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: h * 0.16,
    backgroundColor: "#0C1E36",
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: h * 0.04,
  },
  profileIconContainer: {
    height: h * 0.11,
    width: w * 0.24,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: h * 0.0,
    position: "absolute",
    top: h * 0.11,
    left: w * 0.05,
    //bottom : 0
  },
  profileIcon: {
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 50,
    padding: 8,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: w * 0.05,
    marginVertical: h * 0.02,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: "#0C1E36",
    paddingHorizontal: w * 0.05,
    paddingVertical: h * 0.01,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: h * 0.01,
  },
  optionTile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: h * 0.015,
  },
  optionTileContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    marginLeft: 10,
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center'
  },

  optionTileText : {
    marginRight : 10,
    fontSize: 16,
  },
  
});

export default ProfileScreen;
