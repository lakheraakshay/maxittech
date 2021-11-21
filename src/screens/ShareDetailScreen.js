import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions, Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native-animatable";
import Icon from "@expo/vector-icons/Ionicons";
import Quinkpost from "../../assets/imgs/Quinkpost.jpg";

const { width, height } = Dimensions.get("screen");

function ShareDetailPage({ data, right, navigation }) {
  // console.log(navigation, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
  // console.log(data, "<<<<<<<<<")
  console.log(data, "this is data f?????????????????????????");
  const sharecard = (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ContentDetailScreen", {
          data: data.post,
          navigation: navigation,
        })
      }
    >
      <LinearGradient
        colors={["#a8c0ff", "#667db6", "#283c86"]}
        style={{
          marginVertical: 15,
          backgroundColor: "red",
          paddingVertical: 7,
          elevation: 15,
          width: width / 1.4,
          borderRadius: 15,
        }}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: data?.post?.author?.avatar
                ? data?.post?.author?.avatar
                : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar",
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              margin: 8,
            }}
          />
          <View
            style={{ marginLeft: 10, alignSelf: "flex-start", marginTop: 8 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                color: "#383838",
              }}
            >
              {data?.post?.author?.userName ? data?.post?.author?.userName : "user_name"}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "grey",
                fontWeight: "bold"
              }}
            >
              {data?.post?.author?.firstName ? data?.post?.author?.firstName : "first_name"}
            </Text>
          </View>
          <TouchableOpacity style={{ marginLeft: "auto", marginHorizontal: 5 }}>
            <Icon name="ellipsis-vertical-outline" size={19} />
          </TouchableOpacity>
        </View>
        {(() => {
          if (data?.post?.image) {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ContentDetailScreen", {
                    data: data.post,
                    navigation: navigation,
                  })
                }
              >
                <Image
                  style={{
                    width: width / 1.5,
                    height: height / 4.5,
                    marginHorizontal: 8,
                    marginVertical: 5,
                  }}
                  source={
                    data?.post?.image ? { uri: data?.post?.image } : Quinkpost
                  }
                />
              </TouchableOpacity>
            );
          }
        })()}

        <View
          style={{ backgroundColor: "grey", height: 0.5, marginVertical: 4 }}
        />
        <Text style={{ marginHorizontal: 9, fontSize: 14, color: "#f7f7f7" }}>
          {/* entity management, also known as identity and access management, is a */}
          {data?.post?.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
  if (right) {
    return (
      <View style={{ alignItems: "flex-end", marginHorizontal: 5 }}>
        {sharecard}
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "flex-start", marginHorizontal: 5 }}>
        {sharecard}
      </View>
    );
  }

  return <></>;
}

export default ShareDetailPage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
