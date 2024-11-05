import React, {useState} from "react";
import axios from "axios";
import api from "../APIs/API";
import {ScrollView, StyleSheet, Text, TextInput, View, Dimensions, Button} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export default function RegistrationForm({route, navigation}){

    const [questions, setQuestions] = useState([]);
    const [form_id, setForm_id] = useState('')
    const [answers, setAnswers] = useState({});
    const event_id = route.params

    const handleAnswerChange = (question, answerText) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [question]: answerText,
        }));
      };
      
    

    useState(()=>{
        const getQuestions = async()=>{
            await axios.get(
                api + '/register/' + event_id
            ).then( (response) => {
                setQuestions(response.data['results']['questionair'])
                setForm_id(response.data['results']['registration_form_id'])
            })
        }

        getQuestions()
    })

    const submitForm = async()=>{
        const payload = {
            attendee_id : AsyncStorage.getItem('attendee_id'),
            reg_form_id : form_id,
            response : answers
        }
        await axios.post(
            api + '/register/submit',
            payload
        ).then((response) =>{

        }).catch((error) =>{
            console.log(error)
        })
    }

    return (
        <ScrollView>
            <Text style={styles.HeadText}>
                Registration Form
            </Text>
            <View>
                {
                    questions.map((question) =>{
                        if(question !== "" ){
                            return <View key={question} style={styles.FormField}>
                                        <Text>{question}</Text>
                                        <TextInput 
                                            style={styles.TextInput} 
                                            onChangeText={(text) => handleAnswerChange(question, text)}
                                            value={answers[question] || ""}
                                            placeholder="Type your answer"   
                                        />
                                    </View>

                        }
                        
                    })
                }
            </View>
            <View style={styles.ButtonField}>
                <Button 
                    title="Submit"
                    buttonStyle={styles.Button}
                    onPress={submitForm} 
                />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    HeadText : {
        fontSize : 24,
        paddingHorizontal : width * 0.05,
        paddingVertical : height * 0.05
    },  
    FormField : {
        marginLeft : width * 0.05,
        marginBottom : height * 0.02,
        width : width * 0.9,
    },
    TextInput : {
        borderWidth: 1,
        borderRadius : 5,
        height : height * 0.075,
        borderColor : "#0000ff",
        paddingHorizontal : 10,
        fontSize : 16
    },

    ButtonField : {
        marginLeft : width * 0.05,
        marginBottom : height * 0.02,
        width : width * 0.3,
    },
    Button : {
        backgroundColor: "#a8a8a8",
        borderRadius : 30,
    },
})