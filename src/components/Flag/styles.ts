import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.red,
        borderRadius: 4
    },
    caption: {
        color: '#FFF'
    }
})