import {Text, View, ScrollView, StyleSheet} from "react-native";
import AStorage from "../storage/LocalStorageSave";
import {Button} from "@react-native-material/core";
import {useEffect, useState} from "react";
import HistoryItemsListView from "./HistoryItemsListView";

export default function SavedHistoryItems() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const getItemsFromStorage = () => {
        let i = AStorage.getItems();
        i.then((data) => {
            let arr = JSON.parse(data);
            arr.sort(sortByYear);
            setItems(arr);
            setLoading(false);
        }).catch((err) => {
            setItems([]);
            setLoading(false);
        });
    }

    function sortByYear( a, b ) {
        if ( a.year < b.year ){
            return 1;
        }
        if ( a.year > b.year ){
            return -1;
        }
        return 0;
    }

    const refreshItems = () => {
        getItemsFromStorage();
    }

    useEffect(() => {
       getItemsFromStorage();
    }, []);

    return (
        <ScrollView>
            <View>
                <Button title="Refresh" style={styles.refreshBtn} onPress={refreshItems}></Button>
            </View>
            {!loading && <HistoryItemsListView isSaved={true} returnTo="Saved Items" currentDateStr={new Date().toString()} events={items}></HistoryItemsListView>}
        </ScrollView>

    )
}

const styles = StyleSheet.create({
   refreshBtn: {
       backgroundColor: "grey",
       color: "white",
       borderRadius: 0,
   }
});

