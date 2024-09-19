import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ShowClassesComponent = ({ data, onPress }) => {
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item?.name)} >
                            <View style={styles.mainView}>
                                <Text style={styles.name}>{item?.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10
    },
    name: {
        fontSize: 16,

    },
})

export default ShowClassesComponent