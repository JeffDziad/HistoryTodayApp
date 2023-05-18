import {StyleSheet, Text, View, Image} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {TapGestureHandler, State} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

export default function HistoryItem(props) {
    const navigation = useNavigation();

    let image;
    if(props.eventData.pages[0].thumbnail) {
        image = <Image
            style={styles.cardThumbnail}
            source={{ uri: props.eventData.pages[0].thumbnail.source}}
        />
    } else {
        image = null;
    }

    const onTap = (event) => {
        if(event.nativeEvent.state === State.ACTIVE) {
            navigation.navigate("Event Details", {eventData: props.eventData, currentDateStr: props.currentDateStr, isSaved: props.isSaved, returnTo: props.returnTo});
        }
    };

    return (
        <>
            <TapGestureHandler onHandlerStateChange={onTap}>
                <View style={styles.card}>
                    <View style={styles.cardDate}>
                        <Text style={styles.cardDateText}>{props.eventData.year}</Text>
                    </View>
                    <LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.1)', '#fff']}>
                        <View style={styles.cardContents}>
                            {image}
                            <View style={styles.cardContentTextContainer}>
                                <Text style={styles.cardContentText}>{props.eventData.text}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </TapGestureHandler>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingBottom: 5,
    },
    cardDate: {
        backgroundColor: "black",
        paddingVertical: 5,
    },
    cardDateText: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },
    cardContents: {
        flexDirection: "row",
        borderBottomStyle: "solid",
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    cardContentTextContainer: {
        flex: 1,
        padding: 5
    },
    cardContentText: {
        fontSize: 18,
    },
    cardThumbnail: {
        width: 150,
        height: 150
    }
});