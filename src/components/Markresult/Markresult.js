import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const Markresult = ({ name, obtainMarks, totalMarks, onChangeTextObtain, onChangeTextTotal, selectedSubject, subject }) => {
    return (
        <View style={styles.view}>
            <Text style={styles.Text1}>{name}</Text>

            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    editable={selectedSubject == subject ? true : false}
                    placeholder='0'
                    keyboardType='number-pad'
                    value={obtainMarks}
                    onChangeText={onChangeTextObtain}
                    style={{ borderWidth: 1, width: 50, borderRadius: 10, marginRight: 20 }}
                />

                <TextInput
                    editable={selectedSubject == subject ? true : false}
                    placeholder='0'
                    keyboardType='number-pad'
                    value={totalMarks}
                    onChangeText={onChangeTextTotal}
                    style={{ borderWidth: 1, width: 50, borderRadius: 10 }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    Text1: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})

export default Markresult