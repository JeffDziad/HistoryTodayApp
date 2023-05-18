import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal, Button
} from 'react-native';
import {useEffect, useState} from "react";
import HistoryItemsListView from "../components/HistoryItemsListView";
import axios from "axios";
import Constants from "../Constants";
import {GestureHandlerRootView, State, TapGestureHandler} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";
import {IconButton} from "@react-native-material/core";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function english_ordinal_suffix(dt)
{
    return dt.getDate()+(dt.getDate() % 10 === 1 && dt.getDate() !== 11 ? 'st' : (dt.getDate() % 10 === 2 && dt.getDate() !== 12 ? 'nd' : (dt.getDate() % 10 === 3 && dt.getDate() !== 13 ? 'rd' : 'th')));
}

function constructUrl(month, day) {
    return Constants.ApiBaseUrl + month + "/" + day;
}

export default function HomeScreen() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [todayDate, setTodayDate] = useState(new Date());

    const addDay = () => {
        let tomorrow = new Date(todayDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setTodayDate(tomorrow);
        getTodaysHistoryEvents(tomorrow);
    };
    const subDay = () => {
        let yesterday = new Date(todayDate);
        yesterday.setDate(yesterday.getDate() - 1);
        setTodayDate(yesterday);
        getTodaysHistoryEvents(yesterday);
    };

    const getTodaysHistoryEvents = (date) => {
        setData([]);
        setLoading(true);
        setError(false);
        axios(constructUrl(date.getMonth()+1, date.getDate()))
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getTodaysHistoryEvents(todayDate)
    }, []);

    if(error) return <Text>Error!</Text>;

    return (
        <>
            <GestureHandlerRootView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton onPress={() => subDay()} icon={props => <Ionicons name="chevron-back-outline" style={styles.backBtn} size={30} color="black" />}></IconButton>
                        <TapGestureHandler>
                            <Text style={styles.dateHeader}>{weekday[todayDate.getDay()]}, {monthNames[todayDate.getMonth()]} {english_ordinal_suffix(todayDate)}</Text>
                        </TapGestureHandler>
                        <IconButton onPress={() => addDay()} icon={props => <Ionicons name="chevron-forward-outline" style={styles.backBtn} size={30} color="black" />}></IconButton>
                    </View>

                    {/*{!!loading &&*/}

                    {/*}*/}

                    {!loading && <ScrollView style={styles.scrollArea}>
                        <HistoryItemsListView isSaved={false} returnTo="Home" currentDateStr={todayDate.toString()} events={data.selected}></HistoryItemsListView>
                    </ScrollView>}


                </View>
            </GestureHandlerRootView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    header: {
      flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    dateHeader: {
        fontSize: 32,
        fontWeight: "bold",
    },
    scrollArea: {
        marginBottom: "auto",
    },
});