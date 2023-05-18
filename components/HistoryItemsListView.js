import {StyleSheet, Text, View} from "react-native";
import HistoryItem from "./HistoryItem";

export default function HistoryItemsListView(props) {
    return (
        <>
            <View style={styles.container}>

                {props.events.map((d, i) => {
                    return (<HistoryItem key={i} returnTo={props.returnTo} isSaved={props.isSaved} eventData={d} currentDateStr={props.currentDateStr}></HistoryItem>);
                })}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    }
});