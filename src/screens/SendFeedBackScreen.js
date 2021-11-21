import React from "react";
import { Makiko } from "react-native-textinput-effects";
import Ionicon from "@expo/vector-icons/Ionicons";
import { View, Text, ToastAndroid } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const sendfeedback = () => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        "Feedback Sent",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      AlertIOS.alert("Feedback Sent");
    }
  }

function SendFeedbackScreen() {
    return (
        <View style={{ backgroundColor: "#f2f2f2", height: height }}>
            <LinearGradient
                colors={["#283c86", "#667db6", "#a8c0ff"]}
                style={{
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    width: width,
                }}
            >
                <View>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            margin: 10,
                            marginHorizontal: 25,
                            color: "#f0f0f0",
                            textAlign: "center",
                        }}
                    >
                        Feedback
          </Text>
                </View>
            </LinearGradient>
            <View
                style={{
                    marginTop: height / 4.5,
                    marginBottom: 25,
                    marginHorizontal: 8,
                }}
            >
                <Makiko
                    label={"Email"}
                    style={{ backgroundColor: "#667db6", elevation: 8, borderRadius: 6 }}
                    labelStyle={{ fontSize: 18 }}
                    iconClass={Ionicon}
                    iconName={"laptop"}
                    iconColor={"white"}
                    inputPadding={16}
                    inputStyle={{ color: "black" }}
                />
            </View>
            <View style={{ marginHorizontal: 8 }}>
                <Makiko
                    label={"Comment"}
                    style={{ backgroundColor: "#667db6", elevation: 8, borderRadius: 6 }}
                    labelStyle={{ fontSize: 18 }}
                    iconClass={Ionicon}
                    iconName={"chatbubble-sharp"}
                    iconColor={"white"}
                    inputPadding={16}
                    inputStyle={{ color: "black" }}
                />
            </View>
            <LinearGradient
                colors={["#283c86", "#667db6", "#a8c0ff"]}
                style={{
                    alignSelf: "center",
                    marginVertical: 60,
                    paddingHorizontal: 60,
                    paddingVertical: 10,
                    borderRadius: 15,
                }}
            >
                <Text style={{ fontSize: 19, fontWeight: "bold", color: "#f2f2f2" }} onPress={sendfeedback}>
                    Send
        </Text>
            </LinearGradient>
        </View>
    );
}

export default SendFeedbackScreen;