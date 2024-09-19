import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextBar } from '../../../components/textBar'
import { saveData, uniqueID } from '../../../../android/app/src/firebasefunction/Utility'
import { CustomButton } from '../../../components/button'

const AddAnnouncement = (props) => {
    let previousData = props?.route?.params?.item
    console.log('previousDatapreviousData', previousData);

    const [title, setTitle] = useState(previousData?.title ?? '')
    const [description, setDescription] = useState(previousData?.description ?? '')


    const addAnnoucement = async () => {
        try {
            let id = uniqueID()
            let data = {
                id: id,
                title: title,
                description: description
            }
            console.log("123", data)
            saveData('Announcement', id, data).then(res => {
                console.log("res", res)
                setTitle('')
                setDescription('')
                props.navigation.goBack()
            }
            )
        } catch (error) {
            console.log("erroroor", error)
        }
    }
    const editAnnoucement = async () => {
        if (title && description) {
            try {
                let data = {
                    id: previousData?.id,
                    title: title,
                    description: description,
                }
                console.log("0dfsgsdfgdsf", data)
                saveData('Announcement', data?.id, data).then(res => {
                    console.log("res", res)
                    setTitle('')
                    setDescription('')
                    props.navigation.goBack()
                }
                )
            } catch (error) {
                console.log("erroroor", error)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    {previousData?.title ? 'Edit Announcement' : 'Add Announcement'}
                </Text>

                <View style={{ marginTop: 20 }} />
                <TextBar placeHolder={'Announcement Title'}
                    value={title} onChangeText={(s) => setTitle(s)} />
                <View style={{ marginTop: 20 }} />
                <TextBar
                    placeHolder={'Description'}
                    multiline={true}
                    inputStyles={styles.inputStyles}
                    value={description}
                    onChangeText={(s) => setDescription(s)}
                />
            </View>

            <CustomButton buttonText={previousData?.title ? 'Edit Announcement' : 'Add Announcement'} onPress={() => {
                if (previousData?.title) {
                    editAnnoucement()
                } else {
                    addAnnoucement()
                }
            }} />
        </View>
    )
}

export default AddAnnouncement

const styles = StyleSheet.create({
    heading: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputStyles: {
        height: 150,
        textAlignVertical: 'top'
    },
})