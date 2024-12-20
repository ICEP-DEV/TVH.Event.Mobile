import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Camera, CameraView, useCameraPermissions, } from 'expo-camera';
import axios from 'axios';
import api from '../../APIs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';



const QRScannerComponent = ()=>{
    
    const [scanned, setScanned] = useState(false);
    const [attendee, setAttendee] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        const fetchAttendee = async()=>{
            const response = await AsyncStorage.getItem("attendee");
            if(response){
                setAttendee(JSON.parse(response))
            }
        }
        fetchAttendee();
    }, null)


    const objScanned = async(e) =>{
        setScanned(true);
        const scann = JSON.parse(e).api;
        await axios.put(
            api + scann,
            {
                "attendee_id" : attendee.attendee_id
            }
        ).then((response) =>{
            setMessage("Thank you for signing the register")

        }).catch((error) =>{
            console.log("error scanning : " + error)
            setScanned(false);
        })
        
    }

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <CameraView 
                style={StyleSheet.absoluteFillObject}
                facing='back'
                onBarcodeScanned={({data}) =>{
                    if(!scanned){
                        objScanned(data)
                    }
                }}
            />
            
            <View style={styles.overlay}>
                <View style={styles.topOverlay} />
                <View style={styles.middleOverlay}>
                    <View style={styles.sideOverlay} /> 
                    <View style={styles.focusFrame}>
                    {
                        message !== "" ?
                            <View style={styles.messageContainer}>
                                <Text style={styles.messageText}>{message}</Text>
                                <Pressable onPress={()=>{setMessage(""); setScanned(false)}} style={styles.messageBtn}>
                                    <Text style={styles.messageBtnText}>OK</Text>
                                </Pressable>
                            </View>
                            :<></>
                    }    
                    </View> 
                    <View style={styles.sideOverlay} />
                </View>
                <View style={styles.bottomOverlay} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    overlay : {
        ...StyleSheet.absoluteFillObject,
        justifyContent : 'center',
        alignContent: 'center'
    },
    topOverlay : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,0.6)',
        width : '100%'
    },
    middleOverlay : {
        flexDirection : 'row'
    },
    sideOverlay : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,0.6)',
    },
    focusFrame : {
        width : 250,
        height : 250,
        borderWidth : 2,
        borderColor : '#fff',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomOverlay : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,0.6)',
        width : '100%'
    },
    messageContainer : {
        paddingVertical : '5%',
        width : '80%',
        borderRadius : 5,
        backgroundColor : '#e1e1e1'
    },
    messageText : {
        textAlign : 'center',
        fontSize : 14
    },
    messageBtn : {
        alignSelf : 'center',
        paddingHorizontal : 40,
        paddingVertical : 10,
        margin : 5,
        backgroundColor : '#aaa',
        borderRadius : 3
    },
    messageBtnText : {
        textAlign : 'center',
        fontSize : 12,
        fontWeight : 'bold'
    }
})

export default QRScannerComponent;