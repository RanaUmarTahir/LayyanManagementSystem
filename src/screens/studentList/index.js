import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appColors } from '../../constants/colos'
import { width, height } from 'react-native-dimension'
import { appImages } from '../../constants'
import { Spacer, Wspacer } from '../../components/spacer'
import { Namebar } from '../../components/nameBar'
import addTeacher from '../addTeacher'
import addStudent from '../addStudent'
import { useIsFocused } from '@react-navigation/native'
import { deleteDocument, getAllOfCollection } from '../../../android/app/src/firebasefunction/Utility'


const studentList = (props) => {
    const [search, setSearch] = useState('')
    const [studentList, setStudentList] = useState([])
    const [showstudentList, setShowStudentList] = useState([])
    console.log('showstudentList', showstudentList);


    const renderitem = ({ item, index }) => {
        console.log('itemmmmm:::::', item);
        return <Namebar name={item?.name} srnum={index + 1}
            onPressDelete={() => onPressDelete(item?.id)}
            onPressEdit={() => props.navigation.navigate('addStudent', { item })}
        // onPress={() => props.navigation.navigate(item.route)}
        />
    }
    useEffect(() => {
        getAllStudent()

    }, [useIsFocused()])

    const getAllStudent = () => {
        getAllOfCollection('Student').then((result) => {
            console.log(result)
            setStudentList(result)
            setShowStudentList(result)
        }).catch((error) => {
            console.log('get student error', error);
        })
    }

    const searchByName = (search) => {
        let data = studentList.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        setShowStudentList(data)
    }
    const onPressDelete = (id) => {
        deleteDocument('Student', id)
        getAllStudent()
    }

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.header}>Students</Text>
            <TextInput style={styles.searchBar} placeholder={'Enter Student Name'}
                value={search} onChangeText={(text) => {
                    setSearch(text)
                    searchByName(text)
                }} />
            <View style={styles.backgound}>
                <FlatList data={showstudentList}
                    renderItem={renderitem} />
            </View>
            <TouchableOpacity style={styles.add} onPress={() => props.navigation.navigate(addStudent)}>
                <Image style={styles.icon} source={appImages.add} />

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
    },
    header: {
        fontSize: 26,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: appColors.blue,
        margin: 10,
    },
    searchBar: {
        height: height(8),
        width: width(90),
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: appColors.black,
        backgroundColor: appColors.lightgrey,
        padding: 10,
    },
    backgound: {
        margin: 10,
        padding: 10,
        width: width(90),
        backgroundColor: "gray",
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
    },
    add: {
        height: height(8),
        width: height(8),
        backgroundColor: appColors.blue,
        borderRadius: height(8),
        position: 'absolute',
        marginRight: 10,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        bottom: height(6),
        right: width(2)

    },
    icon: {
        height: height(6),
        width: height(6),
        tintColor: appColors.white,
        alignSelf: 'center',
    },

})
export default studentList