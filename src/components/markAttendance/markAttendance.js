import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { width, height } from 'react-native-dimension'
import { appImages } from '../../constants'
import { appColors } from '../../constants/colos'
import { Wspacer } from '../spacer'
import editTeacher from '../../screens/editTeacher'

export const MarkAttendace = ({ name, attendance, onPressAttendace, onPressView }) => {
    return (
        <View style={styles.iconView}>
            <Text style={styles.Texta}>
                {name}
            </Text>

            <View style={styles.main}>
                <TouchableOpacity onPress={onPressAttendace} style={styles.Texte}>
                    <Text style={styles.Textb}>{attendance}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressView} style={styles.Texte}>
                    <Text style={styles.Textc}>
                        View
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
    },
    Texta: {
        alignSelf: 'center',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',

    },
    Textb: {
        alignSelf: 'right',
        fontSize: 15,
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    Textc: {
        alignSelf: 'center',
        fontSize: 15,
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    Texte: {
        backgroundColor: 'gray',
        borderRadius: 10,
        height: height(5),
        width: width(14),
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width(35),
    },

})
