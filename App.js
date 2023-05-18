import {
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import SafeViewAndroid from "./styling/SafeViewAndroid";
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import HistoryEventDetailScreen from "./screens/HistoryEventDetailScreen";
import SavedHistoryItems from "./components/SavedHistoryItems";


const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <>

            <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>

                <NavigationContainer style={styles.container}>
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={HomeScreen}></Drawer.Screen>
                        <Drawer.Screen name="Event Details" component={HistoryEventDetailScreen} options={{
                            drawerItemStyle: {
                                display: 'none',
                            }
                        }}></Drawer.Screen>
                        <Drawer.Screen name="Saved Items" component={SavedHistoryItems}></Drawer.Screen>
                    </Drawer.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    },
});
