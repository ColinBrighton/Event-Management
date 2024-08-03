import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FIREBASE_DB } from '../../../utilities/FirebaseConfig'
import { COLORS, SIZES } from '../../../constants'
import { collection, getDocs, } from 'firebase/firestore'
import { EventListItem } from './EventListItem'
import RBSheet from 'react-native-raw-bottom-sheet';
import AddEvents from '../../Admin/AddEvents'
import { useSelector } from 'react-redux'
import CustomText from '../../../components/CustomText'

export const EventsList = ({ loading, setLoading, theme }) => {

    const refRBSheet = useRef();
    const [data, setData] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({})
    const { role } = useSelector(state => state.user)

    useEffect(() => {
        getEventsFromFirestore()
    }, [])

    const getEventsFromFirestore = async () => {
        setLoading(true)
        try {
            const querySnapshot = await getDocs(collection(FIREBASE_DB, "events"));
            let data = [];
            querySnapshot.forEach((doc) => {
                if (doc?.id) {
                    data.push({
                        ...doc.data(),
                        id: doc.id
                    })
                }
            });
            setData(data)
            setLoading(false)
        } catch (error) {
            console.log(error, 'FETCHINGERROR----');

            setLoading(false)
        }
    }

    if (loading) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
    }
// console.log(data,'ALL_EVENTS');


    return (
        <View >
            <RBSheet
                ref={refRBSheet}
                height={500}
                draggable={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: '#f2f2f250',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                }}
                customModalProps={{
                    animationType: 'fade',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: true,
                }}>
                <AddEvents refRBSheet={refRBSheet} selectedEvent={selectedEvent} getEventsFromFirestore={getEventsFromFirestore} />
            </RBSheet>
            <FlatList
                data={data}
                renderItem={(event) => <EventListItem setLoading={setLoading} role={role} setSelectedEvent={setSelectedEvent} getEventsFromFirestore={getEventsFromFirestore} refRBSheet={refRBSheet} event={event} theme={theme} />}
                contentContainerStyle={styles.contentContainerStyle}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <CustomText title={'No events Added'} size={SIZES.medium} color={theme === 'dark' ? '#ffffff' : '#000000'} />
                    </View>
                )}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    contentContainerStyle: {
        gap: 20,
        paddingTop: 10,
        paddingBottom: 100,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'50%'
    }
})