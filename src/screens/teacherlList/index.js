import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appColors } from '../../constants/colos'
import { width, height } from 'react-native-dimension'
import { appImages } from '../../constants'
import { Spacer, Wspacer } from '../../components/spacer'
import { Namebar } from '../../components/nameBar'
import addTeacher from '../addTeacher'
import { deleteDocument, getAllOfCollection } from '../../../android/app/src/firebasefunction/Utility'
import { useIsFocused } from '@react-navigation/native'


const teacherList = (props) => {
    const [teacherList, setTeacherList] = useState([])
    const [showTeacherList, setShowTeacherList] = useState([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        getAllTeacher()

    }, [useIsFocused()])

    const getAllTeacher = () => {
        getAllOfCollection('Teacher').then((result) => {
            setTeacherList(result)
            setShowTeacherList(result)
        }).catch((error) => {
            console.log('get teachers error', error);
        })

    }

    const searchByName = (search) => {
        let data = teacherList.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        setShowTeacherList(data)
    }

    const onPressDelete = (id) => {
        deleteDocument('Teacher', id)
        getAllTeacher()
    }

    const renderitem = ({ item, index }) => {
        console.log('lllllllllllllll', item)
        return <Namebar name={item.name} srnum={index + 1}
            onPressDelete={() => onPressDelete(item?.id)}
            onPressEdit={() => props.navigation.navigate('addTeacher', { item })}
        />
    }

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.header}>Teachers</Text>
            <TextInput
                value={search}
                onChangeText={(s) => {
                    setSearch(s)
                    searchByName(s)
                }}
                style={styles.searchBar} placeholder={'Enter Teacher Name'} />
            <View style={styles.backgound}>
                <FlatList
                    data={showTeacherList}
                    renderItem={renderitem}
                    ListEmptyComponent={() => {
                        return (
                            <Text>No Data</Text>
                        )
                    }}
                />
            </View>
            <TouchableOpacity style={styles.add} onPress={() => props.navigation.navigate('addTeacher')}>
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
export default teacherList