import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { Camera, CameraView, useCameraPermissions, } from 'expo-camera';





const QRScannerComponent = ()=>{
    
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState(null)


    const objScanned = (e) =>{
        setData(e)
        console.log(e)
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
                    <View style={styles.focusFrame} /> 
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
        borderColor : '#fff'
    },
    bottomOverlay : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,0.6)',
        width : '100%'
    }
})

export default QRScannerComponent;