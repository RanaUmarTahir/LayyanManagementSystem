import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ShowClassesComponent from '../../components/ShowClasses'
import MonthPicker from 'react-native-month-year-picker';
import Modal from 'react-native-modal'
import { width, height } from 'react-native-dimension'
import { getAllOfCollection } from '../../../android/app/src/firebasefunction/Utility';

const ShowClasses = (props) => {
    const [selectType, setSelectType] = useState('Present Day')
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [className, setClassName] = useState('')

    let type = props?.route?.params?.type || ''
    const onValueChange = useCallback(
        (event, newDate) => {
            const selectedDate = newDate || date;

            // showPicker(false);
            setShow(false)
            setDate(selectedDate);
        },
        [date, show],
    );

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

    const getAttendance = (section) => {
        console.log('11111', className, 'aaaa', section);
        getAllOfCollection('Student')
            .then((result) => {
                let filteredData = result?.filter((student) => student?.class === className && student?.section === section);
                console.log('filteredData', filteredData);

                setModalVisible(!isModalVisible)
                props.navigation.navigate('veiwAttendance', { type: type, attendance: filteredData[0]?.attendance ?? [] })

            })
            .catch((error) => {
                console.log('get Student error', error);
            });
    };

    return (
        <View>
            <Text style={styles.heading}>Classes</Text>

            <ShowClassesComponent
                data={data}
                onPress={(classN) => {
                    setClassName(classN)
                    setModalVisible(!isModalVisible)
                    // props.navigation.navigate('veiwAttendance', { type: type })
                }}
            />
            {show && (
                <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    minimumDate={new Date(2020, 5)}
                    maximumDate={new Date(2025, 5)}
                />
            )}
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
                    style={{ backgroundColor: 'white', borderRadius: 20, width: width(60), alignItems: 'center' }}>
                    <Text
                        onPress={() => {
                            getAttendance('Section A')
                        }}
                        style={styles.textView}>
                        Section A</Text>
                    <Text
                        onPress={() => {
                            getAttendance('Section B')
                        }}

                        style={styles.textView}>
                        Section B</Text>
                    <Text
                        onPress={() => {
                            getAttendance('Section C')
                        }}

                        style={styles.textView}>
                        Section C</Text>
                    <Text
                        onPress={() => {
                            getAttendance('Section D')
                        }}
                        style={styles.textView}>
                        Section D</Text>
                </View>
            </Modal >
        </View>
    )
}

export default ShowClasses

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        color: 'black',
        textAlign: 'center'
    },
    textView: {
        borderRadius: 10,
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