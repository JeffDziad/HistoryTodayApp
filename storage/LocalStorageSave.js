import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "../Constants";
import {Alert} from "react-native";

class AStorage {

    static async addToSaved(eventData) {
        try {
            const jsonVal = await AsyncStorage.getItem(Constants.SavedItemsKey);
            if(jsonVal !== null) {
                // add
                try {
                    let duplicateFound = false;
                    const arr = JSON.parse(jsonVal);
                    for(let i = 0; i < arr.length; i++) {
                        if(arr[i].text === eventData.text) {
                            duplicateFound = true;
                        }
                    }
                    if(!duplicateFound) {
                        arr.push(eventData);
                        await AsyncStorage.setItem(Constants.SavedItemsKey, JSON.stringify(arr));
                    } else {
                        Alert.alert("Duplicate Event", "This item is already in your saved items!");
                    }
                } catch (e) {
                    console.log("There was an error saving this item to the existing array.");
                }
            } else {
                // initalize and add
                try {
                    let arr = [];
                    arr.push(eventData);
                    await AsyncStorage.setItem(Constants.SavedItemsKey, JSON.stringify(arr));
                } catch (e) {
                    console.log("There was an error while initializing and adding this item.");
                }
            }
        } catch (e) {
            console.log("There was an error reading the existing items.");
        }
    }

    static async getItems() {
        try {
            return await AsyncStorage.getItem(Constants.SavedItemsKey);
        } catch (e) {
            console.log("There was an error getting the saved items.");
        }
    }

    static async removeFromSaved(eventData) {
        try {
            const jsonVal = await AsyncStorage.getItem(Constants.SavedItemsKey);
            if(jsonVal !== null) {
                let arr = JSON.parse(jsonVal);
                for(let i = 0; i < arr.length; i++) {
                    console.log(arr[i].text);
                    if(arr[i].text === eventData.text) {
                        arr.splice(i, 1);
                        break;
                    }
                }
                try {
                    await AsyncStorage.setItem(Constants.SavedItemsKey, JSON.stringify(arr));
                } catch (e) {
                    console.log("There was a problem removing the item after finding.");
                }
            }
        } catch (e) {
            console.log("There was a problem getting the saved items");
        }
    }
}



export default AStorage;