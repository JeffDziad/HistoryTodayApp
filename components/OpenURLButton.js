import {Alert, Linking, StyleSheet} from "react-native";
import {useCallback} from "react";
import {Button} from "@react-native-material/core";

const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Button style={styles.button} title={children} onPress={handlePress} />;
};

const styles = StyleSheet.create({
   button: {
       backgroundColor: "black",
       color: "white",
   }
});

export default OpenURLButton;