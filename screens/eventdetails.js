import { Dimensions, ScrollView, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { getAttendee } from './utils/auth';





const { height, width } = Dimensions.get('window');


export default function EventDetails({ route, navigation }){
    const {event} = route.params


    const [imageUri, setImageUri] = useState(null);
    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        setIsLogged(getAttendee());
        if (event.image) {
          //const base64String = Buffer.from(event.image, 'binary').toString('base64');

          setImageUri(`data:image/jpeg;base64,${event.image}`);
        }
      }, [event.image]);

    return(
        <ScrollView>
            <View style={styles.NavBar}>

                <Text style={styles.NavText}>Event Details</Text>
            </View>
            <View style={styles.ImageContainer}>
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.Image}
                        height={height * 0.4}
                        width={width * 0.8}
                    />
                )}
            </View>
            <View>
                <Text style={styles.Text}>
                    {event.description}
                </Text>
                <Text style={styles.Text}>
                    Date : {event.start_date.split('T')[0]}
                </Text>
                <Text style={styles.Text}>
                    Time : {event.time.split('T')[1].split('.')[0]}
                </Text>
                <Text style={styles.Text}>
                    {event.location}
                </Text>
                <Button title={"Register For Event"}
                    onPress={()=>{
                        if(isLogged !== null){
                            navigation.navigate('RegisterForm', event.event_id)
                        }
                        else{
                            navigation.replace('Login')
                        }

                    }}
                />

                
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    NavBar : {
        height : height * 0.15,
        backgroundColor : '#000000',
        display : 'flex',
        paddingTop : height * 0.075
    },
    NavText : {
        fontSize : 30,
        color : '#ffffff',
        textAlign : 'center',
        
    },
    Text : {
        paddingVertical : height * 0.02,
        paddingHorizontal : width * 0.05,
        fontSize : 18

    },
    ImageContainer : {
        height : height * 0.41,
        paddingHorizontal : width * 0.05,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },

});


