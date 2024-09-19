import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { height, width } from 'react-native-dimension'

export const Spacer = ({ totalHeight }) => {
    return (
        <View style={{ height: totalHeight ?? height(2) }}>

        </View>
    )
}
export const Wspacer = ({ totalWidth }) => {
    return (
        <View style={{ width: totalWidth ?? width(2) }}>

        </View>
    )
}
