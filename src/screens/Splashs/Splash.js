
import React, { useEffect } from 'react'
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { appImages } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';


const Splash = (props) => {
    // useEffect(() => {
    //     setTimeout(() => {
    //       props.navigation.navigate('Login')
    //     }, 2000);
    //       }, [])

    useEffect(() => {
        testingFun()
    }, [])

    const testingFun = async () => {
        const userData = await AsyncStorage.getItem("userData")
        console.log('12345678', userData);
        if (userData != null) {
            let data = JSON.parse(userData)
            console.log('12345678', data?.type == 'teacher');
            if (data?.type == 'teacher') {
                props.navigation.dispatch(StackActions.replace('mainStack', {
                    screen: 'Teacherhome'
                }))
            }
            else if (data?.type == 'student') {
                props.navigation.dispatch(StackActions.replace('mainStack', {
                    screen: 'Home'
                }))
            }
            else if (data?.type == 'admin') {
                props.navigation.dispatch(StackActions.replace('mainStack', {
                    screen: 'adminLogin'
                }))
            }
        }
    }

    return (

        <View style={styles.sectionContainer}>
            <Image style={styles.image}
                source={appImages.logo}
            />



            <View style={styles.space}></View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login', { screen: 'admin' })} style={styles.button}>
                <Text style={styles.buttonText}>
                    Admin Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Login', { screen: 'teacher' })}
                style={styles.button}>
                <Text style={styles.buttonText}>
                    Teacher Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login', { screen: 'student' })} style={styles.button}>
                <Text style={styles.buttonText}>
                    Student Login
                </Text>
            </TouchableOpacity>


        </View>

    );


}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
    },
    image: {
        height: 200,
        width: 200,
        marginTop: 80,
        alignSelf: "center",
    },

    view: {
        marginTop: 50,
    },

    input: {
        backgroundColor: "white",
        fontSize: 12,
        width: 350,
        fontFamily: "verdana",
        color: "black",
        borderWidth: 2,
        borderColor: "black",
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 45,
        alignSelf: 'center',
    },

    space: { marginTop: '40%', },
    buttonText: {
        fontSize: 14,
        fontFamily: "verdana",
        color: "white",
    },

    forgetpassword: {
        fontSize: 16,
        alignSelf: "flex-end",
        fontFamily: "verdana",
        color: "#223a80",
        marginTop: 10,
        marginRight: 20,
    },

    button: {
        backgroundColor: "#223a80",
        borderWidth: 1,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 40,
        alignItems: "center",
        height: 39,
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
    },

});
export default Splash;
