import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/AntDesign";
import ShareDetailScreen from "../screens/ShareDetailScreen";
import LastWatch from "../components/LastWatch";
import Received from "../components/Received";
import Sent from "../components/Sent";
import InputMessage from "../components/InputMessage";
import io from "socket.io-client";
import PORT from "../constants/PORT";
import TextInCard from "../components/TextInCard";
import BACKEND from "../constants/BACKEND";
import AsyncStorage from "@react-native-async-storage/async-storage";

const socket = io(`${BACKEND}`);
const MessageDetailScreen = (props) => {
  // console.log(route.params.data)

  const data = props.route.params;

  const scrollViewRef = useRef();

  const [user, setuser] = useState();
  useEffect(() => {
    (async () => {
      const usre = await AsyncStorage.getItem("quinkUser");
      setuser(JSON.parse(usre));
    })();
  }, []);
  // console.log(data, "sdsd")

  const { itemName, itemPic } = props.route.params;
  const [inputMessage, setMessage] = useState("");
  const [ChatMessage, setChatMessage] = useState([]);
  // socket.use({limit: '50mb'})
  useEffect(() => {
    socket.emit("getPrivatePreviousChat", {
      chatId: data.chatId,
      sender: data.user1,
      user2: data.user2,
    });
    // socket.emit("PrivateChat", {
    //   sender: data.user1,
    //   user2: data.user2,
    //   chatId: data.chatId
    // })
  }, []);

  socket.on("initialMessage", (data) => {
    // console.log("initialMessage");
    setChatMessage(data);
  });

  socket.on("messageFromOne", (data) => {
    // console.log("new message >>>>>>>>>>", data.message.message, ">>>>>>>>>>>>>", socket.id)
    // console.log('Incoming message:', data)
    // console.log(data, "this is messages");

    setChatMessage([...ChatMessage, data.message]);
  });

  // console.log(ChatMessage, "dsd")
  const send = () => {
    socket.emit("OneToOneChat", {
      sender: { _id: user._id },
      user2: data.user2,
      chatId: data.chatId,
      message: inputMessage,
    });
    setMessage("")
  };

  var txt = [];
  socket.on("checking", "this is checking frontend");

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#283c86" />
      <LinearGradient
        colors={["#283c86", "#a8c0ff", "#667db6"]}
        style={styles.container}
      >
        <View style={styles.main}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon name="left" color="#000119" size={24} />
            </TouchableOpacity>
            <Text style={styles.username}>{data?.userName}</Text>
            <Image
              source={{
                uri: data?.useravatar ? data?.useravatar : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar",
              }}
              style={styles.avatar}
            />
          </View>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
            showsVerticalScrollIndicator={false}
          >
            {(() => {
              // return ChatMessage.map(message => {
              return ChatMessage.map((message) => {
                console.log(message, "++++")
                // console.log(message);
                if (!message?.post) {
                  if (message?.sender?._id == user._id) {
                    return (
                      <>
                      <Sent
                        message={message?.message}
                        timeStamp={message?.timeStamp}
                      />
                      {/* <Received
                        image={data?.useravatar}
                        message={'I am good'}
                        timeStamp={message.timeStamp}
                      /> */}
                      </>
                    );
                  } else {
                    return (
                      <Received
                        image={data?.useravatar}
                        message={message.message}
                        timeStamp={message.timeStamp}
                      />
                    );
                  }
                } else {
                  // console.log(message, "<<<<<<<<$$$")
                  if (message?.sender?._id == user._id) {
                    return <ShareDetailScreen navigation={props.navigation} right={true} data={message} />;
                  } else {
                    return <ShareDetailScreen navigation={props.navigation} right={false} data={message} />;
                  }
                }
              });
            })()}
          </ScrollView>
        </View>
        <InputMessage
          inputMessage={inputMessage}
          setMessage={(inputMessage) => setMessage(inputMessage)}
          onSendPress={send}
        />
      </LinearGradient>
    </>
  );
};
export default MessageDetailScreen;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  main: {
    backgroundColor: "#FFF",
    height: "88%",
    paddingHorizontal: 10,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 10,
    paddingBottom: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
});
