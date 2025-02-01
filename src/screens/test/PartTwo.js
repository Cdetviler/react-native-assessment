import { useState } from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import useFetch from "../../hooks/useFetch";
import { AntDesign } from "@expo/vector-icons";

export default function () {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
    const [searchString, setSearchString] = useState('');

    const onSearchChange = (text) => {
        setSearchString(text);
    }

    const filterPosts = (posts) => {
        if (searchString === '' || posts === null) {
            return posts || [];
        }
        return posts.filter(post => {
            const caseInsensitiveTitle = post.title.toLowerCase();
            const caseInsensitiveSearchString = searchString.toLowerCase();
            
            return caseInsensitiveTitle.includes(caseInsensitiveSearchString)
        });
    }

    return (
        <SafeAreaView style={styles.view}>
            {error && <Text>{error.message}</Text>}
            {!loading && !error && <TextInput placeholder="Search..." onChangeText={onSearchChange} value={searchString} />}
            <FlatList
                data={filterPosts(data)}
                renderItem={({item}) => (
                    <View style={styles.container}>
                            <AntDesign name="file1" size={24} color="black" />
                            <View style={styles.textContainer}>
                                <Text>{item.title}</Text>
                                <Text>{item.id}</Text>
                            </View>
                            <AntDesign name='right' size={24} color="black" style={styles.iconRight} />
                    </View>
                )}
                ListHeaderComponent={() => {
                    if (loading) {
                        return <ActivityIndicator style={styles.loadingIndicator} size="large" />
                    }
                    return null;
                }}
                ListEmptyComponent={() => {
                    if (loading) {
                        return null;
                    }
                    return (
                        <Text>No Results</Text>
                    )
                }}
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
    loadingIndicator: {
        padding: 20
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