import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextBar } from '../../../components/textBar'
import { CustomButton } from '../../../components/button'

const AddAnnouncement = () => {
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
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>Add Announcement</Text>

                <View style={{ marginTop: 20 }} />
                <TextBar placeHolder={'Announcement Title'} />
                <View style={{ marginTop: 20 }} />
                <TextBar
                    placeHolder={'Description'}
                    multiline={true}
                    inputStyles={styles.inputStyles}
                />
            </View>

            <CustomButton buttonText={'Add Announcement'} />
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