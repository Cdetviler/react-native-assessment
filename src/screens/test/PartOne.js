import { SafeAreaView, FlatList, Text, View, StyleSheet } from "react-native";
import localData from '../../localPlaceholderData';
import { AntDesign } from "@expo/vector-icons";

export default function () {

    return (
        <SafeAreaView style={styles.view}>
            <FlatList
                data={localData}
                renderItem={
                    ({item}) => (
                        <View style={styles.container}>
                            <AntDesign name="file1" size={24} color="black" />
                            <View style={styles.textContainer}>
                                <Text>{item.title}</Text>
                                <Text>{item.id}</Text>
                            </View>
                            <AntDesign name='right' size={24} color="black" style={styles.iconRight} />
                        </View>
                    )
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        width: '100%',
    },
    list: {
        display: 'flex',
    },
    listItem: {
        display: 'flex',
    },
    container: {
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '50%',
        flexGrow: 0,
    },
    iconRight: {
        marginLeft: 'auto',
    }
});