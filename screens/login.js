


import { StyleSheet, Text, View } from 'react-native';


export default function LoginScreen(){

    return (
        <View>
            <Text style={styles.container}>Login Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  