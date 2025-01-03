import React from "react";
import { styles }  from "./styles";
import {Ionicons} from '@expo/vector-icons';
import { Text, View,Alert,TouchableOpacity } from "react-native";
import { useNavigation,NavigationProp  } from '@react-navigation/native';

export default function User() {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogout = () => {
        Alert.alert("Logout", "Você saiu da conta.");
        return navigation.reset({routes:[{name :'Login'}]});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>Luiz</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons 
                    name="exit"  
                    style={{color:'gray'}}
                    size={40}
                />
            </TouchableOpacity>
        </View>
    );
}