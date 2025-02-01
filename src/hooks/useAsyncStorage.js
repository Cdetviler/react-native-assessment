import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const useCommentManagement = (postId) => {
    const [hiddenComments, setHiddenComments] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        // get hidden comments from storage when hook is first mounted
        getHiddenCommentsFromStorage();
    }, [postId]);
    
    const getHiddenCommentsFromStorage = async () => {
        setFetching(true);
        const comments = await AsyncStorage.getItem(`hiddenComments-${postId}`);
        setHiddenComments(comments ? JSON.parse(comments) : []);
        setFetching(false);
    }

    const hideComment = (commentId) => {
        // immediately update hidden comments so that UI is not blocked by async storage call below
        setHiddenComments([...hiddenComments, commentId]);
        // persist the hidden comment in app storage
        AsyncStorage.setItem(`hiddenComments-${postId}`, JSON.stringify([...hiddenComments, commentId]));
    }

    return { hiddenComments, hideComment, getHiddenCommentsFromStorage, fetching };
}

export default useCommentManagement;