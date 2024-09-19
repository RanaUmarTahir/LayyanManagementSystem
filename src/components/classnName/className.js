
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { width, height } from 'react-native-dimension'
import { appColors } from '../../constants/colos'

export const Classname = ({ name, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}

            style={styles.main}>
            <Text style={styles.searchBar} >{name}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    searchBar: {

        fontSize: 14,
        color: 'black'
    },
    main: {
        height: height(8),
        width: width(90),
        margin: 15,
        padding: 10,
        backgroundColor: appColors.white,
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: appColors.black,
        alignSelf: 'center'





    }

})