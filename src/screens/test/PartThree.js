import { useState } from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet, TextInput } from "react-native";
import PostListItem from "../../components/PostListItem";
import useFetch from "../../hooks/useFetch";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function () {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
    const [searchString, setSearchString] = useState('');


    const onSearchChange = (text) => {
        setSearchString(text);
    }

    const filterPosts = (posts, searchValue) => {
        if (searchValue === '' || posts === null) {
            return posts || [];
        }
        return posts.filter(post => {
            const caseInsensitiveTitle = post.title.toLowerCase();
            const caseInsensitiveSearchString = searchValue.toLowerCase();
            
            return caseInsensitiveTitle.includes(caseInsensitiveSearchString)
        });
    }

    return (
        <SafeAreaView style={styles.view}>
            {error && <Text>{error.message}</Text>}
            {!loading && !error && <TextInput placeholder="Search..." onChangeText={onSearchChange} value={searchString} />}
            <FlatList
                data={filterPosts(data, searchString)}
                renderItem={({item}) => <PostListItem item={item} />}
                ListHeaderComponent={() => {
                    if (loading) {
                        return <LoadingIndicator style={styles.loadingIndicator} size="large" />
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
    }
});