import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Icon } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'
import { getAllOfCollection } from '../../../android/app/src/firebasefunction/Utility'

const viewAnnouncement = () => {
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

    // let data = [
    //     {
    //         id: 1,
    //         title: 'Happy New Year',
    //         description: 'School will remain closed on today due to New year'
    //     },
    //     {
    //         id: 2,
    //         title: 'Happy New Year',
    //         description: 'School will remain closed on today due to New year'
    //     },
    // ]
    return (
        <View>
            <Text style={styles.heading}>
                Announcements
            </Text>

            <FlatList
                data={announcement}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.update}>
                            <View style={styles.vertor}>
                                <Icon name='notification' type='antdesign' />
                                <Text style={styles.TextA}>
                                    {item?.title}
                                </Text>
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

export default viewAnnouncement


const styles = StyleSheet.create({
    heading: {
        alignSelf: 'center',
        fontSize: 24,
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
    vertor: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TextA: {
        marginLeft: 10,
        fontWeight: 'bold',
    }


})
