import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';

const PostListItem = ({item}) => {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => {
                navigation.navigate('part-three-detail', { id: item.id });
            }}
            style={styles.container}
        >
            <AntDesign name="file1" size={24} color="black" />
            <View style={styles.textContainer}>
                <Text>{item.title}</Text>
                <Text>{item.id}</Text>
            </View>
            <AntDesign name='right' size={24} color="black" style={styles.iconRight} />
        </Pressable>
    );
}

export default PostListItem;

const styles = StyleSheet.create({
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