import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { width, height } from 'react-native-dimension'
import { appImages } from '../../constants'

const ContactUs = () => {
    return (
        <View>
            <Image style={styles.image}
                source={appImages.logo}
            />
            <View>
                <Text style={styles.Text1}>
                    Layyans Management System
                </Text>
                <Text style={styles.Test2}>
                    Contact Information
                </Text>
            </View>

            <View style={styles.textView}>
                <View>
                    <Text>Address</Text>
                    <Text>Phone </Text>
                    <Text>Cell</Text>
                    <Text>Email</Text>
                </View>

                <View>
                    <Text>Said Pur road Pandora rawalpindi</Text>
                    <Text>051.78132433</Text>
                    <Text>0306 6767229</Text>
                    <Text>layyans @gmail.com</Text>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: width(40),
        width: width(40),
        alignSelf: 'center',
        marginTop: 20,

    },
    Text1: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        // color: #213b70,
    },
    Test2: {
        alignSelf: 'center',
        // fontWeight: 10,
    },
    textView: {
        margin: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        // backgroundColor: "red",
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
})


export default ContactUs