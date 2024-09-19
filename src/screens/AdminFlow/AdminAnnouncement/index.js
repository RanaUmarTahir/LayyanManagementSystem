import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, Image } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'
import { deleteDocument, getAllOfCollection } from '../../../../android/app/src/firebasefunction/Utility'
import { height } from 'react-native-dimension'
import { appImages } from '../../../constants'
import { Wspacer } from '../../../components/spacer'

const AdminAnnouncement = (props) => {
    const [announcement, setAnnouncement] = useState([])


    useEffect(() => {
        getAnnouncement()

    }, [useIsFocused()])

    const getAnnouncement = () => {
        getAllOfCollection('Announcement').then((result) => {
            setAnnouncement(result)
            console.log('yahya', result)


        }).catch((error) => {
            console.log('get teachers error', error);

        })

    }
    const eonPressDelet = (id) => {
        deleteDocument('Announcement', id)
        getAnnouncement()
    }


    return (
        <View>
            <View style={{ paddingHorizontal: 20, alignItems: "center", flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.heading}>
                    Announcements
                </Text>

                <Text onPress={() => props.navigation.navigate('AddAnnouncement')} style={styles.heading1}>
                    Add
                </Text>
            </View>

            <FlatList
                data={announcement}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.update}>
                            <View style={styles.rowView}>
                                <View style={styles.vertor}>
                                    <Icon name='notification' type='antdesign' />
                                    <Text style={styles.TextA}>
                                        {item?.title}
                                    </Text>
                                </View>
                                <View style={styles.iconView}>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('AddAnnouncement', { item }) }}>
                                        <Image source={appImages.edit} style={styles.iconStyle}

                                        />
                                    </TouchableOpacity>
                                    <Wspacer />
                                    <TouchableOpacity onPress={() => { eonPressDelet(item?.id) }}>
                                        <Image source={appImages.delete} style={styles.iconStyleb} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text>
                                {item?.description}
                            </Text>
                        </View>
                    )
                }}
            />

        </View>
    )
}

export default AdminAnnouncement

const styles = StyleSheet.create({
    heading: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    heading1: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    update: {
        // alignSelf: 'center',
        // borde
        rRadius: 15,
        backgroundColor: 'gray',
        marginTop: 20,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 10,
        fontWeight: 'bold',
        // alignSelf: 'center',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    vertor: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TextA: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    iconView: {
        flexDirection: 'row',

    },
    iconStyle: {
        height: height(4),
        width: height(4),
        // tintColor: appColors.blue,
    },
    iconStyleb: {
        height: height(4),
        width: height(4),
        flexDirection: 'row',
        // tintColor: appColors.red,
    },


})