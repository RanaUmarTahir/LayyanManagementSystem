import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Result = () => {
    return (
        <View>
            <Text style={styles.Texta}>
                Class
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    Texta: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
    },
})

export default Result