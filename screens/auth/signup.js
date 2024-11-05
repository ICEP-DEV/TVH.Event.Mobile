


import React , {useState} from "react";
import { ScrollView, Dimensions, View, Alert, StyleSheet, Text, TextInput, Pressable } from "react-native";
import axios from 'axios';
import api from '../../APIs/API';
import { Button, CheckBox  } from 'react-native-elements';


const { height, width } = Dimensions.get('window');

export default function SignupScreen({navigation}){

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false)

    const submitForm = async () =>{

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            Alert.alert('Validation Error', 'Please fill all the fields.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Validation Error', 'Passwords do not match.');
            return;
        }

        if (!checked) {
            Alert.alert('Validation Error', 'You must agree to the Terms and Conditions.');
            return;
        }

        const payload = {
            firstname,
            lastname, 
            email,
            password
        }

        await axios.post(
            api + '/auth/mobile/create',
            payload
        ).then(response =>{
            Alert.alert('Success', response.data.results);
            navigation.replace("Login")
        })
        .catch(error =>{
            if(error.status === 403){
                Alert.alert('Error', 'Email Address may already exist.');
            }
            else{
                Alert.alert('Error', 'Failed to connect to the server.');
            }
        })

    }

    return (
        <ScrollView style={styles.MainScreen}>
        
        <View style={styles.Header}>
            <Text style={styles.HeadText}>Sign up</Text>
        </View>
        <View style={styles.FormField}>
            <Text>First Name</Text>
            <TextInput 
                style={styles.TextInput} 
                placeholder='enter first name'
                value={firstname}
                onChangeText={setFirstname}
            />
        </View>
        <View style={styles.FormField}>
            <Text>Last Name</Text>
            <TextInput 
                style={styles.TextInput} 
                placeholder='enter last name'
                value={lastname}
                onChangeText={setLastname}
            />
        </View>
        <View style={styles.FormField}>
            <Text>Email</Text>
            <TextInput 
                style={styles.TextInput} 
                placeholder='enter email'
                value={email}
                onChangeText={setEmail}
            />
        </View>
        <View style={styles.FormField}>
            <Text>Password</Text>
            <TextInput 
                style={styles.TextInput} 
                secureTextEntry 
                placeholder='enter password'
                value={password}
                onChangeText={setPassword}
            />
        </View>
        <View style={styles.FormField}>
            <Text>Confirm Password</Text>
            <TextInput 
                style={styles.TextInput} 
                secureTextEntry 
                placeholder='confirm password'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
        </View>
        <View style={styles.TermsField}>
            <CheckBox
                checked={checked}
                onPress={() => setChecked(!checked)}
                style={{flex:1}}
            />
            <Text style={styles.TermsText}>By registering you accept our Terms of Use and Privacy Policy</Text>
        </View>
        <View style={styles.ButtonField}>
            <Button 
                buttonStyle={styles.Button} 
                titleStyle={{color:"#000000"}} 
                title={"Continue"}
                onPress={submitForm}    
            ></Button>
        </View>
        <View style={styles.TermsField}>
            <Text style={{marginLeft : height * 0.05}}>Already have an Account? </Text>
            <Pressable onPress={()=>{navigation.replace('Login')}}>
                <Text style={{color : "#0000ff", textDecorationLine : "underline"}}>Login</Text>
            </Pressable>
        </View>
    </ScrollView>
    );
}



const styles = StyleSheet.create({
    MainScreen : {
        display : 'flex',
        flexDirection : 'column'
    },
    Header : {
        height : height * 0.15,
        width : width,
        display : 'flex',
        alignContent : 'center',
        justifyContent : 'flex-end',
        marginBottom : height * 0.05
    },
    HeadText :{
        fontSize: 26,
        color: '#000',
        textDecorationLine : 'underline',
        textDecorationColor : '#0000ff',
        textAlign : 'center',
        fontWeight : 'bold',
        
    },
    ButtonField : {
        marginLeft : width * 0.05,
        marginBottom : height * 0.02,
        width : width * 0.9,
    },
    Button : {
        backgroundColor: "#a8a8a8",
        borderRadius : 12,
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
        borderColor : "#bbbbbb",
        paddingHorizontal : 10,
        fontSize : 16
    },
    TermsField : {
        display : 'flex',
        flexWrap : 'wrap',
        flexDirection : 'row'
    },
    TermsText: {
        flex : 10,
        flexShrink: 1, 
        marginRight : width * 0.05
      },
})

