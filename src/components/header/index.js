import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { appColors } from '../../colors'

export const Header = ({ name }) => {
    return (
        <View>
            <Text style={styles.header}>{name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({

    header: {
        fontSize: 26,
        alignSelf: 'center',
        fontWeight: 'bold',
        // color: appColors.blue,
        // backgroundColor: 'tra',
        margin: 10,
    },
})

