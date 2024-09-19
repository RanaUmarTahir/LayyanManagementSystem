import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { width } from "react-native-dimension";
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

const veiwAttendance = (props) => {
    const previousAttendance = props?.route?.params?.attendance

    const [selectType, setSelectType] = useState('Present Day')
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [presentDays, setPresentDays] = useState([]);
    const [absentDays, setAbsentDays] = useState([]);
    console.log('datedatedate', previousAttendance);

    const onValueChange = useCallback(
        (event, newDate) => {
            const selectedDate = newDate || date;

            // showPicker(false);
            setShow(false)
            setDate(selectedDate);
            getAttendance(selectedDate)
        },
        [date, show],
    );

    useEffect(() => {
        getAttendance(date)
    }, [previousAttendance])

    const getAttendance = async (date) => {
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let data = await filterAttendanceByMonth(previousAttendance, month, year)

        let present = []
        let absent = []

        data?.filter(res => {
            if (res?.status == 'P') {
                present.push(res)
            } else {
                absent.push(res)
            }
        })

        setPresentDays(present)
        setAbsentDays(absent)

    }

    const filterAttendanceByMonth = (attendance, month, year) => {
        return attendance?.filter(entry => {
            const entryDate = moment(entry.date, 'M/D/YYYY');
            return entryDate.month() + 1 === month && entryDate.year() === year;
        });
    }

    return (
        <View>
            <Text style={styles.TextA}>
                Monthly Attendance
            </Text>

            <Text onPress={() => setShow(true)} style={styles.TextB}>
                Select Month {moment(date).format('MM/YYYY')}
            </Text>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => setSelectType('Present Day')} style={{
                    ...styles.TextC,
                    backgroundColor: selectType == 'Present Day' ? 'blue' : 'red',
                }}>
                    <Text style={{ color: 'white' }}>Present Day</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectType('Absent Day')} style={{
                    ...styles.TextC,
                    backgroundColor: selectType == 'Absent Day' ? 'blue' : 'red',
                }}>
                    <Text style={{ color: 'white' }}>Absent Day</Text>
                </TouchableOpacity>

            </View>
            <Text style={styles.TextE}>
                Total {selectType == 'Present Day' ? 'Present' : 'Absent'} Day: {selectType == 'Present Day' ? presentDays?.length : absentDays?.length}
            </Text>

            <View style={styles.flatlistView}>
                <FlatList
                    data={selectType == 'Present Day' ? presentDays : absentDays}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.dateView}>
                                <Text>No Data Available</Text>
                            </View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.dateView}>
                                <Text>{item?.date}</Text>
                            </View>
                        )
                    }}
                />
            </View>
            {show && (
                <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    minimumDate={new Date(2020, 5)}
                    maximumDate={new Date(2025, 5)}
                />
            )}

        </View>
    )
}
const styles = StyleSheet.create({
    TextA: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 20,
    },
    TextB: {
        alignSelf: 'center',
        marginVertical: 15,
    },
    TextC: {
        marginHorizontal: 15,
        borderRadius: 100,
        width: width(40),
        height: width(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
    },
    TextE: {
        alignSelf: 'center',
        marginTop: 10,
    },
    flatlistView: {
        backgroundColor: "gray",
        marginHorizontal: width(4),
        padding: width(4),
        borderRadius: 10,
        marginTop: 20
    },
    dateView: {
        backgroundColor: 'white',
        padding: width(4),
        borderRadius: 10,
        marginVertical: 10
    },
})


export default veiwAttendance