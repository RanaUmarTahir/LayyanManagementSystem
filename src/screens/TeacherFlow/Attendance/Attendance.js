import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Classname } from '../../../components/classnName/className'
import Modal from 'react-native-modal'
import { width, height } from 'react-native-dimension'
import { getAllOfCollection } from '../../../../android/app/src/firebasefunction/Utility'

const Attendance = (props) => {


    const [isModalVisible, setModalVisible] = useState(false);
    const [className, setClassName] = useState('');

    const data = [
        {
            name: 'Play',
        },
        {
            name: 'Nursery',
        },
        {
            name: 'Prep',
        },
        {
            name: 'Class 1',
        },
        {
            name: 'Class 2',
        },
        {
            name: 'Class 3',
        },
        {
            name: 'Class 4',
        },
        {
            name: 'Class 5',
        },
        {
            name: 'Class 6',
        },
        {
            name: 'Class 7',
        },
        {
            name: 'Class 8',
        },
    ]
    const renderItem = ({ item }) => {
        return <Classname name={item.name} onPress={() => {
            setClassName(item.name)
            setModalVisible(!isModalVisible)
        }}
        />
    }
    return (
        <View>
            <Text style={styles.Testa}>
                Class
            </Text>
            <View style={styles.Testb}>
                <FlatList data={data} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />

            </View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(!isModalVisible)}
                style={{
                    backgroundColor: "transparent",
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{ backgroundColor: 'grey', borderRadius: 20, width: width(60), alignItems: 'center' }}>
                    <Text
                        onPress={() => {
                            props.navigation.navigate('addAttendance', { className: className, section: 'Section A' })
                            setModalVisible(!isModalVisible)
                        }}
                        style={styles.textView}>
                        Section A</Text>
                    <Text
                        onPress={() => {
                            props.navigation.navigate('addAttendance', { className: className, section: 'Section B' })
                            setModalVisible(!isModalVisible)
                        }}
                        style={styles.textView}>
                        Section B</Text>
                    <Text
                        onPress={() => {
                            props.navigation.navigate('addAttendance', { className: className, section: 'Section C' })
                            setModalVisible(!isModalVisible)
                        }}
                        style={styles.textView}>
                        Section C</Text>
                    <Text
                        onPress={() => {
                            props.navigation.navigate('addAttendance', { className: className, section: 'Section D' })
                            setModalVisible(!isModalVisible)
                        }}
                        style={styles.textView}>
                        Section D</Text>
                </View>
            </Modal >

        </View>
    )
}

const styles = StyleSheet.create({
    Testa: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 10,
    },
    Testb: {
        backgroundColor: 'gray',
        borderRadius: 25,
        margin: 10,
        padding: 10,
    },
    textView: {
        borderRadius: 20,
        backgroundColor: "white",
        width: width(50),
        textAlign: 'center',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 20,
        marginVertical: 6,
        marginTop: 7
    }

})
export default Attendance