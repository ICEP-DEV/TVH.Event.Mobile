
import axios from 'axios';
import { useState } from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import api from '../../APIs/API';


const { height, width } = Dimensions.get('window');

export default function LoginScreen({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')




    const userLogin = async() => {
        if(!email || !password){
            Alert.alert('Validation Error', 
                'Please fill all the fields.', 
            );
            return;
        }

        await axios.post(
            api + '/auth/mobile/login',
            {
                email,
                password
            }
        ).then(response => {
            
            navigation.replace('Home')
        }).catch((error) => {
            Alert.alert('Invalid Credentials','Please double check your email and password');
        })

    }




    return (
        <ScrollView style={styles.container}>
            <View style={styles.Head}>
                <Text style={styles.Heading}>Log in</Text>
            </View>
            <View>
                <Text style={styles.Label}>Email</Text>
                <TextInput 
                    placeholder='enter your email'
                    onChangeText={setEmail}
                    value={email}
                    style = {styles.Input}
                />
            </View>
            <View>
            <Text style={styles.Label}>Password</Text>
                <TextInput 
                    placeholder='enter your password'
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                    style = {styles.Input}
                />
            </View>
            <View style={{alignSelf : "flex-end", marginBottom : height * 0.02}}>
                <Pressable  onPress={()=>{console.log("clicked")}}>
                    <Text style={{color : "#0000ff", fontSize : 16}}>Forgot Password</Text>
                </Pressable>
            </View>
            <Button 
                title={"Log in"}
                buttonStyle = {styles.Button}
                onPress={userLogin}
            />
            <View style={styles.CreateAccount}>
                <Text>Don't have an Account yet? </Text>
                <Pressable onPress={()=>{navigation.replace('Signup')}}>
                    <Text style={{color : "#0000ff", textDecorationLine : "underline"}}>Create Account</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal : width * 0.05,
    },
    Head : {
        height : height * 0.3,
        display : "flex",
        justifyContent : "flex-end",
        marginBottom : height * 0.02
    },
    Heading : {
        fontSize : 26,
        color : "#000000",
        textAlign : "center",
        textDecorationLine : "underline",
        textDecorationColor : "#0000ff"
    },
    Label : {
        fontSize : 18
    },
    Input : {
        borderColor : "#bbbbbb",
        borderWidth : 1,
        height : height * 0.075,
        marginBottom : height * 0.03,
        padding : 10,
        fontSize : 16
    },
    Button : {
        backgroundColor: "#a8a8a8",
        borderRadius : 12,
    },
    CreateAccount : {
        marginVertical : height * 0.02,
        display : "flex",
        flexDirection : "row"
    }    
  });
  