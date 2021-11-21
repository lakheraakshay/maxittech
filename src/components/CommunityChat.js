import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import LastWatch from "../components/LastWatch";
import ReceivedCommunityChat from "../components/ReceivedCommunityChat";
import Sent from "../components/Sent";
import InputMessage from "../components/InputMessage";
import BACKEND from "../constants/BACKEND";
import axios from "axios";
import io from "socket.io-client";
import PORT from "../constants/PORT";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Dimensions } from "react-native";

// const { widht, height } = Dimensions.get("screen");
// window.navigator.userAgent = 'react-native'

const { width, height } = Dimensions.get("screen");

const CommunityChat = (props) => {
  const [user, setuser] = useState();
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(true)

  const scrollViewRef = useRef();
  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("quinkUser");
      setuser(JSON.parse(user));
      // setLoading(false);
    })();
  }, []);
  const [chats, setchats] = useState([]);
  // const [toggle, settoggle] = useState(false)
  // console.log(props)
  const socket = io(`${BACKEND}`);
  // const socket = io(`http://192.168.43.120:5000`);

  useEffect(() => {
    {
      (async () => {
        try {
          // const threeth = await axios.get("http://localhost:3000/chatMessage")
          // console.log(threeth,"ths is from 3000 port")
          // console.log(socket.emit,"this is socket")
          // const result = await axios.get(`${BACKEND}/community/message/all/${props.data}`)
          // console.log(result.data.chat, "this is result")
          // setchats(result.data.chat)
          console.log("yes ");
          socket.emit("fetchMessage", { communityId: props.data });
          console.log("useEffect called");

          // console.log(chats, "this is chats")
          // socket.emit("chatMessage", {
          //   communityId: props.data,
          //   user: user._id,
          //   message: inputMessage
          // })
          // setLoading(false);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  socket.on("message", (msg) => {
    console.log("this is msg")
    // console.log(typeof (msg))

    setchats(msg);

    setLoading(false);
    // console.log("<<This is all message", (msg))
  });
  socket.once("dupdateMessage", (msg) => {
    // console.log(msg, "lll")
    // socket.emit("connectAgain", props.data)
    setchats((prev) => {
      return [...prev, msg];
    });
    setLoading(false);
  });

  const [inputMessage, setMessage] = useState("");
  // const [Data, setData] = useState([
  //   {
  //     id: 1,
  //     message: "What's up! Lorem Ipsum us simply dummy text"
  //   },
  //   {
  //     id: 1,
  //     message: "How are you? How is everyone at your place?",
  //   },
  //   {
  //     id: 1,
  //     message: "What is your name? ",
  //   },
  //   {
  //     id: 1,
  //     message: "Woah! We have wont the match.",
  //   },
  //   {
  //     id: 1,
  //     message: "It was lovely meeting you.",
  //   },
  // ]);

  const send = async () => {
    try {
      const result = await axios.post(`${BACKEND}/community/message`, {
        communityId: props.data,
        user: user._id,
        message: inputMessage,
      });
      // console.log(result.data);
      if (result.data.success) {
        socket.emit("updateMessage", {
          communityId: props.data,
          user: user._id,
          message: inputMessage,
        });
        // console.log(temp, "this istem")
        // settoggle(!toggle)
        setMessage("");
      }
    } catch (e) {
      console.log(e);
    }
    // Data.push({ id: inputMessage, message: inputMessage });
    // setMessage("");
  };

  return (
    <LinearGradient
      colors={["#283c86", "#667db6", "#a8c0ff"]}
      style={styles.container}
    >
      <View style={styles.main}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          showsVerticalScrollIndicator={false}
        >
          {(() => {
            if (!loading) {
              console.log("data fetched")
              return chats.map((chat, key) => {
                console.log(chat.user, "this is user");
                if (chat.user == user._id) {
                  return (
                    <Sent message={chat.message} timeStamp={chat.timeStamp} />
                  );
                } else {
                  console.log("loading ")
                  return (
                    <ReceivedCommunityChat
                      chatUsername={chat?.user?.userName}
                      image={chat?.user?.avatar}
                      message={chat.message}
                      timeStamp={chat.timeStamp}
                    />
                  );
                }
              });

            } else {
              return (<>
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: height / 1.8,
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={55} color="#667db6" />
                </View>
              </>)
            }
          })()}


          {/* {loading ? (
            (() => {
              console.log("here")
              return <View
                style={{
                  backgroundColor: "#fff",
                  height: height / 1.8,
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={55} color="#667db6" />
              </View>
            })()
          ) : (
            (() => {
              console.log("out in data")
              return chats.map((chat, key) => {
                console.log(chat.user, "this is user");
                if (chat.user == user._id) {
                  return (
                    <Sent message={chat.message} timeStamp={chat.timeStamp} />
                  );
                } else {
                  return (
                    <ReceivedCommunityChat
                      chatUsername={chat?.user?.userName}
                      image={chat?.user?.avatar}
                      message={chat.message}
                      timeStamp={chat.timeStamp}
                    />
                  );
                }
              });
            })()
          )} */}

          {/* <LastWatch checkedOn="Yesterday" /> */}
          {/* <ReceivedCommunityChat
            image={require("../../assets/imgs/2.jpeg")}
            message={Data[0].message}
          /> */}
          {/* <Sent message={Data[1].message} /> */}
          {/* <ReceivedCommunityChat
            image={require("../../assets/imgs/2.jpeg")}
            message={Data[2].message}
          />
          <Sent message={Data[3].message} />
          <LastWatch checkedOn="Today" />
          <ReceivedCommunityChat
            image={require("../../assets/imgs/2.jpeg")}
            message={Data[4].message}
          /> */}
          {/* <View>{txt}</View> */}
        </ScrollView>
      </View>
      <View>
        <InputMessage
          inputMessage={inputMessage}
          setMessage={(inputMessage) => setMessage(inputMessage)}
          onSendPress={send}
        />
      </View>
    </LinearGradient>
  );
};
export default CommunityChat;

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    top: 60,
    height: "100%",
    position: "absolute",
  },
  main: {
    backgroundColor: "#FFF",
    height: "78%",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
