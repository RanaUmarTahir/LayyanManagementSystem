import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Results = (props) => {
    let type = props?.route?.params?.type || ''

    return (
        <View>
            <Text style={styles.heading}>{type == 'attend' ? 'Attendance' : 'Results'}</Text>

            <FlatList
                data={['Farhan', 'Yahya']}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.mainView}>
                            <Text style={styles.name}>{item}</Text>

                            <TouchableOpacity onPress={() => {
                                if (type == 'attend') {
                                    props.navigation.navigate('veiwAttendance')
                                } else {
                                    props.navigation.navigate('veiwResult')
                                }
                            }} style={styles.viewBack}>
                                <Text style={styles.text}>View</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Results

export const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        color: 'black',
        textAlign: 'center'
    },
    text: {
        fontSize: 14,
        color: 'white',
    },
    viewBack: {
        backgroundColor: 'gray',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    mainView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
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