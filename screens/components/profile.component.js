import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
}
from "react-native";

import ToggleSwitch from "toggle-switch-react-native";
import { Alert } from "react-native";
import axios from "axios";
import api from "../../APIs/API";


const UpdatePassword = ({attendee})=>{

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetPassword = async()=>{
        if(newPassword.trim() === "" || currentPassword.trim() === "" || confirmPassword.trim() === ""){
            return Alert.alert("Missing Fields" ,"Please fill in all fields")
        }
        else if(newPassword.trim() !== confirmPassword.trim()){
            return Alert.alert("Password Fields","New Password and Confirm Password do not match")
        }
        else{

            await axios.put(api + "/attendee/password",{
                "attendee_id" : attendee.attendee_id,
                "current_password" : currentPassword,
                "new_password" : newPassword
            }).then(() => {
                setConfirmPassword('')
                setCurrentPassword('')
                setNewPassword('')
                return Alert.alert("Success", "Password has been successfully updated")
            }).catch(() =>{
                return Alert.alert("Something went wrong", "Current password was invalid")
            })

            
        }
    }

    return <ScrollView>
        
        {
            attendee === null ? (
                <Text>Please log in first</Text>
            ) : (
                <View>
                    <TextInput
                        placeholder="Current Password"
                        secureTextEntry
                        style={styles.textInput}
                        onChangeText={(e) => setCurrentPassword(e)}
                        value={currentPassword}
                    />
                    <TextInput
                        placeholder="Update Password"
                        secureTextEntry
                        style={styles.textInput}
                        onChangeText={(e) => setNewPassword(e)}
                        value={newPassword}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry
                        style={styles.textInput}
                        onChangeText={(e) => setConfirmPassword(e)}
                        value={confirmPassword}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => resetPassword()}
                    >
                        <Text style={styles.buttonText}>Update Password</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
    </ScrollView>
}


const NotificationSetting = () =>{
    return <View style={styles.flexContainer}>
        <Text>Push Notifications : </Text>
        <ToggleSwitch
            isOn={true}
            onColor="#007bff"
            offColor="#dedede"
            onToggle={isOn => true}
        />
    </View>
}


const EventsHistory = ({attendee, setIsModalVisible, setModalContent, navigation}) =>{

    const [events, setEvents] = useState([])

    useState(()=>{
        const fetchAttendeeEvents = async()=>{
            await axios.get(
                api + "/register/attendee/all/" + attendee.attendee_id
            ).then((response) =>{
                setEvents(response.data.results)
            }).catch((error) =>{
                console.error("Error retrieving attendee from AsyncStorage:", error);
            })
        }

        if(attendee){
            fetchAttendeeEvents();
        }        
    })

    const handleEventClick = (event) => {
        setIsModalVisible(false);
        setModalContent({ title: '', content: null, props: {} });
        navigation.navigate('EventFeedbackScreen', { event });
    };
    

    return <ScrollView>
        {
            events.map((event) =>(
                <TouchableOpacity 
                    key={event.title}
                    style={styles.eventContainer}
                    onPress={() => handleEventClick(event)}
                    >

                    <Text>
                        {event.title}
                    </Text>
                    {
                        event.successful === 1 ?
                            <Text>Participated</Text>
                            :<Text>Applied</Text>    
                    }
  
                </TouchableOpacity>
                
            ))
        }
    </ScrollView>
}


const Surveys = ({surveys, setIsModalVisible,setModalContent,navigation}) =>{
    const handleEventClick = (survey) => {
        setIsModalVisible(false);
        setModalContent({ title: '', content: null, props: {} });
        navigation.navigate('SurveyScreen', { survey });
    };

    return <ScrollView>
        {
            surveys.map((survey) =>(
                <TouchableOpacity
                    key={survey.survey_id}
                    style={styles.eventContainer}
                    onPress={() => handleEventClick(survey)}
                >
                    <Text>
                        {survey.title}
                    </Text>
                    <Text>
                        {survey.expires_at.split('T')[0]}
                    </Text>

                </TouchableOpacity>
            ))
        }
    </ScrollView>
}


const AboutUs = () =>{
    return <ScrollView>
        
    </ScrollView>
}


const Feedback = () =>{
    return <ScrollView>
        <Text>
            We'd love to hear from you
        </Text>
        <TextInput 
            multiline
            numberOfLines={5}
            style={styles.textArea}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send Feedback</Text>
        </TouchableOpacity>
    </ScrollView>
}

const PrivacyPolicy = ()=>{
    return <ScrollView>
        <Text style={styles.heading}>1. Introduction</Text>
        <Text style={styles.content}>
            
        </Text>

        <Text style={styles.heading}>2. Information We Collect</Text>
        <View style={styles.listView}>
            <Text style={styles.content}>
                We collect the following personal information: 
            </Text>
            <Text style={styles.content}>
                - Name: To identify users uniquely.
            </Text>
            <Text style={styles.content}>
                - Email: For account-related communication.
            </Text>
            <Text style={styles.content}>
                - Gender and Ethnic Group: For statistical purposes only.
            </Text>
        </View>

        <Text style={styles.heading}>3. How We Use Your Information</Text>
        <View style={styles.listView}>
            <Text style={styles.content}>
                - To improve the App's services and user experience.
            </Text>
            <Text style={styles.content}>
                - To generate anonymous statistical reports.
            </Text>
            <Text style={styles.content}>
                - Your data will never be sold or shared with third parties.
            </Text>
        </View>

        <Text style={styles.heading}>4. Data Security</Text>
        <Text style={styles.content}>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse.
        </Text>

        <Text style={styles.heading}>5. User Rights</Text>
        <View style={styles.listView}>
            <Text style={styles.content}>
                - You have the right to access, correct, or delete your personal data at any time.
            </Text>
            <Text style={styles.content}>
                - You can contact us at [Your Contact Email] for assistance with your data.
            </Text>
        </View>

        <Text style={styles.heading}>6. Data Retention</Text>
        <Text style={styles.content}>
            Your personal data is retained only for as long as necessary to fulfill the purposes outlined in this Privacy Policy.
        </Text>

        <Text style={styles.heading}>7. Third-Party Access</Text>
        <Text style={styles.content}>
            We do not share or disclose your personal information to any third party unless required by law.
        </Text>

        <Text style={styles.heading}>8. Children's Privacy</Text>
        <Text style={styles.content}>
            The App is not intended for children under the age of 13. We do not knowingly collect data from children.
        </Text>

        <Text style={styles.heading}>9. Changes to Privacy Policy</Text>
        <Text style={styles.content}>
            We reserve the right to update this Privacy Policy. Significant changes will be communicated to users through the App.
        </Text>

        <Text style={styles.heading}>10. Contact Us</Text>
        <Text style={styles.content}>
            If you have any questions about this Privacy Policy, please contact us at icephackathoneventssystem@gmail.com
        </Text>
    </ScrollView>

}

const TermsConditions = ()=>{
    return <ScrollView>
        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.content}>
            By using this application , you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the App.
        </Text>

        <Text style={styles.heading}>2. User Responsibilities</Text>
        <View style={styles.listView}>
            <Text style={styles.content}>
                - You must provide accurate and truthful information when registering or using the App.
            </Text>
            <Text style={styles.content}>
                - You agree to use the App only for its intended purposes and in compliance with all applicable laws and regulations.
            </Text>
        </View>

        <Text style={styles.heading}>3. Use of Collected Data</Text>
        <Text style={styles.content}>
            The App collects personal information such as your name, email, gender, and ethnic group solely for statistical purposes. This data will not be shared with any third party.
        </Text>

        <Text style={styles.heading}>4. Account Security</Text>
        <Text style={styles.content}>
            You are responsible for maintaining the confidentiality of your account and any activity that occurs under your account.
        </Text>

        <Text style={styles.heading}>5. Prohibited Conduct</Text>
        <View style={styles.listView}>
            <Text style={styles.content}>
                - Misuse or interfere with the App's functionality.
            </Text>
            <Text style={styles.content}>
                - Misuse or interfere with the App's functionality.
            </Text>
        </View>

        <Text style={styles.heading}>6. Intellectual Property</Text>
        <Text style={styles.content}>
            All content and materials provided in the App are the property of the App's developers. Unauthorized reproduction, distribution, or modification of this content is strictly prohibited.
        </Text>

        <Text style={styles.heading}>7. Limitation of Liability</Text>
        <Text style={styles.content}>
            The App is provided "as is." The developers are not responsible for any direct, indirect, incidental, or consequential damages resulting from the use of the App.
        </Text>

        <Text style={styles.heading}>8. Changes to Terms</Text>
        <Text style={styles.content}>
            The developers reserve the right to update or modify these Terms and Conditions at any time. Users will be notified of significant changes.
        </Text>

        <Text style={styles.heading}>9. Governing Law</Text>
        <Text style={styles.content}>
            These Terms and Conditions are governed by the laws of South Africa.
        </Text>
    </ScrollView>
}


const styles = StyleSheet.create({
    flexContainer : {
        display: 'flex',
        flexDirection : 'row',
        width : 'auto',
        justifyContent : 'space-between',
    },
    eventContainer : {
        display: 'flex',
        flexDirection : 'row',
        width : 'auto',
        justifyContent : 'space-between',
        backgroundColor : '#dedede',
        padding : 10,
        borderRadius : 5,
        marginBottom : 10
    },
    heading : {
        fontWeight : 'bold',
        fontSize : 14,
    },
    content : {
        fontSize : 12,
    },

    listView : {

    },
    textInput : {
        borderWidth: 1,
        borderRadius : 5,
        height : 45,
        borderColor : "#bbbbbb",
        paddingHorizontal : 10,
        fontSize : 13,
        marginTop : 10
    },
    textArea : {
        borderWidth: 1,
        borderRadius : 5,
        height: 120,
        borderColor: "#bbbbbb",
        paddingHorizontal : 5,
        paddingTop : 2,
        fontSize : 13,
        marginTop : 10,
        textAlignVertical: "top",
    },

    button: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        width : '60%',
        marginTop: 10
    },

    buttonText: {
    color: '#fff',
    fontSize : 14,
    textAlign : 'center'
    },

    rowView : {
        display : 'flex',
        justifyContent : 'space-between'
    }
})


export {
    UpdatePassword, NotificationSetting, Surveys, EventsHistory, AboutUs, Feedback, PrivacyPolicy, TermsConditions
}