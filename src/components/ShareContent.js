import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
// import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BACKEND from "../constants/BACKEND";
// import io from "socket.io-client"

const socket = io(`${BACKEND}`);

const ShareContent = (props) => {
  // console.log(props, "<<<<<<<<<<<<this is from share data")
  // console.log(props.navigation);
  const data = props.data;
  console.log(data, "<<<<<This is data");

  const [memebers, setmemebers] = useState([]);
  const [user, setuser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // const data = await AsyncStorage.getItem("quinkUser");
        // setuser(await JSON.parse(data));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);


  const send = (user2Id) => {
    // console.log(mem,"this ismem")
    // console.log(user2Id, "this is id");

    socket.emit("OneToOneChat", {
      sender: { _id: user._id },
      user2: user2Id,

      chatId: undefined,
      sharePost: true,
      data: data?._id,
    });
  };

  // const [followings, setfollowings] = useState([])
  useEffect(() => {
    // console.log(user._id)
    (async () => {
      try {
        const data = await AsyncStorage.getItem("quinkUser");
        setuser(await JSON.parse(data));
        const takeThisuser = await JSON.parse(data)
        const result = await axios.get(
          `${BACKEND}/user/follwers/followings/${takeThisuser?._id}`
        );
        console.log(result.data, "<<<<<<This is followers adn following")
        if (result.data.followers) {
          setmemebers((prev) => {
            return [...prev, ...result.data.followers];
          });

        }

        if (result.data.followings) {
          setmemebers((prev) => {
            return [...prev, ...result.data.followings];
          });
        }
        // console.log(memebers)
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // console.log(memebers)

  return (
    <View>
      <LinearGradient
        colors={["#283c86", "#667db6", "#a8c0ff"]}
        style={{
          padding: 5,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          marginBottom: 11,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "white",
            textAlign: "center",
          }}
        >
          Share Content with your friends
        </Text>
      </LinearGradient>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ marginBottom: 10 }}
      >
        {(() => {
          return memebers.map((mem) => {
            return (
              <View style={styles.container}>
                <Image
                  source={{
                    uri: mem?.avatar
                      ? mem?.avatar
                      : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    margin: 8,
                    marginLeft: 14,
                  }}
                />
                <View
                  style={{
                    marginLeft: 10,
                    alignSelf: "flex-start",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 14,
                      color: "#044244",
                    }}
                  >
                    {mem?.userName ? mem?.userName : "user_name"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "grey",
                    }}
                  >
                    {mem?.firstName ? mem?.firstName : "first_name"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                    width: "93%",
                    position: "absolute",
                  }}
                  onPress={() => send(mem._id)}
                >
                  <Icon
                    style={{
                      marginRight: -7,
                      marginTop: 7,
                    }}
                    name="send-sharp"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            );
          });
        })()}
      </ScrollView>
      {/* <View style={styles.container}>
        <Image
          source={require("../../assets/imgs/2.jpeg")}
          style={{
            width: 45,
            height: 45,
            borderRadius: 30,
            margin: 8,
            marginLeft: 14
          }}
        />
        <View
          style={{ marginLeft: 10, alignSelf: "flex-start", marginTop: 10 }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              color: "#044244",
            }}
          >
            {"avi_warikar_29"}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "grey",
            }}
          >
            {"Avigo Warikar"}
          </Text>
        </View>
        <View
          style={{ alignItems: "flex-end", width: "93%", position: "absolute" }}
        >
          <Icon
            style={{
              marginRight: -7,
              marginTop: 7,
            }}
            name="send-sharp"
            size={24}
          />
        </View>
      </View> */}
    </View>
  );
};
export default ShareContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
