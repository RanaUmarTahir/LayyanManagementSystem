
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { width, height } from 'react-native-dimension'
import { appColors } from '../../constants/colos'

export const resultMark = ({ name, props }) => {
    return (
        <TextInput onPress={() => props.navigation.navigate('resultMark')}

            style={styles.main}>
            <Text style={styles.searchBar} >{name}</Text>
        </TextInput>
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
        margin: 10,
        padding: 10,
        backgroundColor: appColors.white,
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: appColors.black,
        alignSelf: 'center'





    }

})