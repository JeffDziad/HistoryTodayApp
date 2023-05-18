import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {IconButton, Button} from "@react-native-material/core"
import OpenURLButton from '../components/OpenURLButton';
import AStorage from "../storage/LocalStorageSave";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function formattedDateString(date, year) {
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${year}`;
}

export default function HistoryEventDetailScreen({route, navigation}) {
    const {eventData, currentDateStr, isSaved, returnTo} = route.params;
    let image;
    if(eventData.pages[0].originalimage) {
        image = <Image
            style={styles.mainImage}
            source={{ uri: eventData.pages[0].originalimage.source}}
        />
    } else {
        image = null;
    }

    let wikiUrl;
    if(eventData.pages[0].content_urls.mobile) {
        wikiUrl = <OpenURLButton url={eventData.pages[0].content_urls.mobile.page}>Read More</OpenURLButton>
    } else wikiUrl = null;

    const onBackTap = () => {
        navigation.navigate(returnTo);
    };

    const saveItem = () => {
        eventData.currentDateStr = currentDateStr;
        AStorage.addToSaved(eventData);
    }

    const unsaveItem = () => {
        AStorage.removeFromSaved(eventData);
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <IconButton onPress={() => onBackTap()} icon={props => <Ionicons name="return-down-back-outline" style={styles.backBtn} size={48} color="white" />}></IconButton>
                    {!isSaved && <Text style={styles.headerDate}>{formattedDateString(new Date(currentDateStr), eventData.year)}</Text>}
                    {!!isSaved && <Text style={styles.headerDate}>{formattedDateString(new Date(eventData.currentDateStr), eventData.year)}</Text>}
                </View>
                <ScrollView>
                    <View styles={styles.imageView}>
                        {image}
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.mainText}>{eventData.text}</Text>
                    </View>

                    <View styles={styles.options}>
                        {!isSaved && <Button onPress={saveItem} style={styles.optionBtn} title="Save"></Button>}
                        {!!isSaved && <Button onPress={unsaveItem} style={styles.optionBtn} title="Unsave"></Button>}
                        {wikiUrl}
                    </View>
                </ScrollView>
            </View>


        </>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        backgroundColor: "black",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    headerDate: {
        color: "white",
        fontSize: 28
    },
    details: {
        paddingHorizontal: 5,
    },
    backBtn: {

    },
    imageView: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    mainImage: {
        width: '100%',
        height: 500,
    },
    mainText: {
        padding: 5,
      fontSize: 20,
    },
    options: {

    },
    optionBtn: {
        marginBottom: 5,
        backgroundColor: "black",
        color: "white",
    }
});