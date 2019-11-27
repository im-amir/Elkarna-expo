import React from "react";
import { Spinner } from "native-base";
import { View } from "react-native";

const Loading = () => {
    return (
        <View
            style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Spinner color="green" />
        </View>
    );
};

export default Loading;
