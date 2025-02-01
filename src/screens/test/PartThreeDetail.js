import { SafeAreaView, FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import useFetch from "../../hooks/useFetch";
import useCommentManagement from "../../hooks/useAsyncStorage";
import LoadingIndicator from "../../components/LoadingIndicator";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function({ route }) {
    
    const { id } = route.params;
    const { data, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const { data: comments, loading: commentsLoading, error: commentsError } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    const { hiddenComments, hideComment, fetching } = useCommentManagement();

    const combinedLoading = loading || commentsLoading || fetching;
    const filteredComments = comments ? comments.filter(comment => !hiddenComments.includes(comment.id)) : [];

    return (
        <SafeAreaView style={styles.parentView}>
            {combinedLoading && <LoadingIndicator />}
            {error && <Text>{error.message}</Text>}
            {data && (
                <View style={styles.container}>
                    <View>
                        <Text style={styles.postTitle}>{data.title}</Text>
                        <Text style={styles.postBody}>{data.body}</Text>
                    </View>
                    <FlatList
                        data={filteredComments}
                        style={styles.commentsList}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.comment}>
                                    <View style={styles.commentContent}>
                                        <Text style={styles.commentEmail}>{item.email}</Text>
                                        <Text>{item.body}</Text>
                                    </View>
                                    <Pressable
                                        style={styles.hideButton}
                                        onPress={() => {
                                            hideComment(item.id);
                                        }}
                                    >
                                        <FontAwesome name="eye-slash" size={18} color="black" />
                                        <Text>Hide</Text>
                                    </Pressable>
                                </View>
                            )
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <Text>No comments exist for this post</Text>
                            )
                        }}
                        ListHeaderComponent={() => {
                            return (
                                <>
                                    <Text style={styles.commentsHeader}>Comments</Text>
                                    {commentsError && (
                                        <Text>{commentsError.message}</Text>
                                    )}
                                </>
                            )
                        }}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    parentView: {
        flex: 1,
    },  
    container: {
        display: 'flex',
        flex: 1,
        height: '100%',
        padding: 10,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    postBody: {
        marginVertical: 10
    },
    commentsList: {
        flex: 1,
    },
    commentsHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    comment: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#dedede',
        boxSizing: 'border-box',
    },
    commentEmail: {
        fontWeight: 'bold',
        marginVertical: 5,
    },
    hideButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFCF45',
        padding: 5,
        marginVertical: 5,
        borderRadius: 5,
        gap: 5,
    }
});