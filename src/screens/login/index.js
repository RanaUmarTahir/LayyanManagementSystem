
import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import Navigation from '../../Navigations';
import Home from '../Home/Home';
import { StackActions } from '@react-navigation/native'
import { appImages } from '../../constants';
import { getAllOfCollection, saveData, uniqueID } from '../../../android/app/src/firebasefunction/Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';


const Login = (props) => {
    const userType = props?.route?.params?.screen || ''
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [error, setError] = useState('')


    const TeacherLoginFunction = async (mail, pass) => {
        getAllOfCollection('Teacher').then(async (result) => {

            let findTeacher = result?.find(res => res?.email == mail && res?.passWord == pass)
            console.log('findTeacherfindTeacher', findTeacher);
            if (findTeacher == undefined) {
                setError('Invalid Username or password!')
            } else {
                let data = {
                    email: email,
                    password: password,
                    type: 'teacher'
                }
                await AsyncStorage.setItem("userData", JSON.stringify(data));
                props.navigation.dispatch(StackActions.replace('mainStack', {
                    screen: 'Teacherhome'
                }))
            }
        }).catch((error) => {
            console.log('get teachers error', error);
        })
    }

    const StudentLoginFunction = async (mail, pass) => {
        getAllOfCollection('Student').then(async (result) => {

            let findStudent = result?.find(res => res?.email == mail && res?.passWord == pass)
            console.log('findStudentfindStudent', findStudent);
            if (findStudent == undefined) {
                setError('Invalid Username or password!')
            } else {
                let data = {
                    email: email,
                    password: password,
                    type: 'student'
                }
                await AsyncStorage.setItem("userData", JSON.stringify(data));
                props.navigation.dispatch(StackActions.replace('mainStack', {
                    screen: 'Home'
                }))
            }
        }).catch((error) => {
            console.log('get student error', error);
        })
    }


    return (

        <View style={styles.sectionContainer}>
            <Image style={styles.image}
                source={appImages.logo}
            />
            <Text style={styles.text}>Login</Text>
            <View style={styles.view}>
                <Text style={styles.inputText}>Enter Email or Username</Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                        setError('')
                    }}
                    style={{ ...styles.input, backgroundColor: 'white', borderWidth: 2, borderColor: 'black', width: 350 }}
                    placeholder='Email or Username'
                />


                <Text style={styles.inputText}>Enter Password</Text>

                <View style={{ ...styles.inputView, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text)
                            setError('')
                        }}
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={showPassword}
                    />
                    <Icon name={showPassword ? 'eye-off' : 'eye'} type='feather' color={'black'} onPress={() => setShowPassword(!showPassword)} />
                </View>
            </View>

            <Text style={styles.error} >{error}</Text>

            <TouchableOpacity>
                <Text style={styles.forgetpassword} >
                    Forget Password?
                </Text>

            </TouchableOpacity>
            <View style={styles.space}></View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (userType == 'admin') {
                        // if (email == 'admin@gmail.com' && password == 'admin123') {
                        props.navigation.dispatch(StackActions.replace('mainStack', {
                            screen: 'adminLogin'
                        }))
                        // } else {
                        //     if (email == '' || password == '') {
                        //         setError('Please enter username or password!')
                        //     } else {
                        //         setError('Invalid Username or password!')
                        //     }
                        // }
                    } else if (userType == 'teacher') {
                        if (email == '' || password == '') {
                            setError('Please enter username or password!')
                        } else {
                            TeacherLoginFunction(email, password)
                            // setError('Invalid Username or password!')
                        }
                        // props.navigation.dispatch(StackActions.replace('mainStack', {
                        //     screen: 'Teacherhome'
                        // }))
                    } else {
                        if (userType == 'student') {
                            if (email == '' || password == '') {
                                setError('pleace enter username or password!')
                            } else {
                                StudentLoginFunction(email, password)
                            }
                        }
                        // props.navigation.dispatch(StackActions.replace('mainStack', {
                        //     screen: 'Home'
                        // }))
                    }
                }
                }>
                <Text style={{ color: 'white' }}>
                    Login
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
        marginTop: 50,
        alignSelf: "center",
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20,
    },
    view: {
        marginTop: 30,
    },
    inputView: {
        backgroundColor: "white",
        fontSize: 12,
        width: 350,
        fontFamily: "verdana",
        color: "black",
        // marginHorizontal: 10,
        marginTop: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 45,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "black",
        alignItems: "center",
    },
    input: {
        // backgroundColor: "white",
        fontSize: 12,
        width: 300,
        fontFamily: "verdana",
        color: "black",

        // marginHorizontal: 10,
        marginTop: 5,
        borderRadius: 10,
        // paddingHorizontal: 10,
        height: 45,
        alignSelf: 'center',
    },
    inputText: {
        marginLeft: 20,
        marginTop: 8,
    },
    space: { marginTop: 30, },
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
    error: {
        fontSize: 16,
        fontFamily: "verdana",
        color: "red",
        marginTop: 10,
        marginHorizontal: 20
        // marginRight: 20,
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
export default Login;
