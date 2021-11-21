import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import LastWatch from "../components/LastWatch";
import ReceivedCommunityChat from "../components/ReceivedCommunityChat";
import Sent from "../components/Sent";
import InputMessage from "../components/InputMessage";
import BACKEND from "../constants/BACKEND";
import axios from "axios";
// import { useSelector } from "react-redux";

const OneToOneChat = (props) => {

  const [inputMessage, setMessage] = useState("");
  const [Data, setData] = useState([
    {
      id: 1,
      message: "What's up! Lorem Ipsum us simply dummy text",
    },
    {
      id: 1,
      message: "How are you? How is everyone at your place?",
    },
    {
      id: 1,
      message: "What is your name? ",
    },
    {
      id: 1,
      message: "Woah! We have wont the match.",
    },
    {
      id: 1,
      message: "It was lovely meeting you.",
    },
  ]);

  const send = async () => {
    try {
     
      
    } catch (e) { console.log(e) }
    // Data.push({ id: inputMessage, message: inputMessage });
    // setMessage("");
  };


  return (
    <LinearGradient
      colors={["#f26a50", "#f26a50", "#f20045"]}
      style={styles.container}
    >
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
         

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
export default OneToOneChat;

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
