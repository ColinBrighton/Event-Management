import { ActivityIndicator, Alert, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../../../components/CustomText'
import { COLORS, SIZES } from '../../../constants'
import AntDesign from '@expo/vector-icons/AntDesign';
import { FIREBASE_DB } from '../../../utilities/FirebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

export const EventListItem = ({ event, theme, refRBSheet, setSelectedEvent, role, setLoading, getEventsFromFirestore }) => {

    const handleEdit = async (selected) => {
        console.log(selected,'selected');

        setSelectedEvent(selected)
        await refRBSheet?.current.open()
    }

    const handleDelete = (value) => {
        Alert.alert('Confirm Deletion', 'Are you sure you want to delete the event!', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => deleteEvent(value) },
        ]);
    }

    const deleteEvent = async (value) => {
        setLoading(true)
        try {
            const eventRef = doc(FIREBASE_DB, "events", value.item.id);
            await deleteDoc(eventRef)
            if (Platform.OS === 'ios') {
                Alert.alert('Error', 'Event Deleted!');
            } else if (Platform.OS === 'android') {
                ToastAndroid.show('Event Deleted!', ToastAndroid.SHORT);
            }
            setLoading(false)
            getEventsFromFirestore()
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <View style={styles.card(theme)}>
            <CustomText title={`Event : ${event.item.event}`} size={SIZES.normal} color={"#ffffff"} />
            <CustomText title={`Location : ${event.item.place}`} size={SIZES.normal} color={"#ffffff"} />
            <CustomText title={`Date : ${event.item.date}`} size={SIZES.normal} color={"#ffffff"} />
            {
                role == 'admin' &&
                <View style={styles.iconHolder}>
                    <TouchableOpacity style={styles.iconWrap}>
                        <CustomText onPress={() => handleDelete(event)} title={`Delete`} letterSpacing={0.5} font={"FontBold"} size={SIZES.normal} color={"#ffffff"} />
                        <AntDesign name="delete" size={18} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEdit(event)} style={styles.iconWrap}>
                        <CustomText title={`Edit`} letterSpacing={0.5} font={"FontBold"} size={SIZES.normal} color={"#ffffff"} />
                        <AntDesign name="edit" size={18} color="black" />
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    card: (theme) => ({
        marginHorizontal: 20,
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 10
    }),
    iconHolder: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        marginVertical: 10
    },
    iconWrap: {
        display: "flex",
        flexDirection: 'row',
        gap: 3
    }
})