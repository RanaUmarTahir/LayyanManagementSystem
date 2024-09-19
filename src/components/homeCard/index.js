import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { height, width } from "react-native-dimension"
import { appImages } from '../../constants'
import { appColors } from '../../constants/colos'
import { Spacer } from '../spacer'
import teacherList from '../../screens/teacherlList'

export const HomeCard = ({ name, icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Image style={styles.cardImage} source={icon} />
            <Spacer totalHeight={height(1)} />
            <Text style={styles.cardText}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        height: height(30),
        width: width(80),
        backgroundColor: appColors.white,
        borderRadius: 20,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImage: {
        height: height(20),
        width: height(20),
        resizeMode: 'contain',
        tintColor: appColors.blue,
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: appColors.blue,
    },
})
