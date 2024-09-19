import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { appColors } from '../../constants/colos'
import { width, height } from 'react-native-dimension'

export const CustomButton = ({ buttonText, onPress, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>
                {buttonText}
            </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: appColors.blue,
        borderWidth: 1,
        borderRadius: 40,
        alignItems: "center",
        height: height(8),
        width: width(70),
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: height(5)
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "verdana",
        color: "white",
    },
})