import { StyleSheet, ActivityIndicator } from "react-native";

export default function (props) {
    return (
        <ActivityIndicator style={styles.loading} size="large" {...props} />
    )
}

const styles = StyleSheet.create({
    loading: {
        padding: 20
    }
});