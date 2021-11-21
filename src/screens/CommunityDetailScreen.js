import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import CommunityQuestionaire from "../components/CommunityQuestionaire";
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import CommunityPost from "../components/CommunityPost";
import CommunityChat from "../components/CommunityChat";
import CommunityFeedPost from "../components/CommunityFeedPost";
import CommunitySetting from "../components/CommunitySetting";
import { StatusBar } from "react-native";

const { width, height } = Dimensions.get("screen");

export default function CommunityDetailScreen(props) {
  const data = props.route.params.data;
  // console.log(data);
  // console.log(props.data,">>>>>>>>>>>>>>>>>>>>>>>>")
  // console.log(props.route.params.data.question, "detail screen")
  const [popularSelected, setpopularSelected] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSettingVisible, setSettingVisible] = useState(false);
  const [currTap, setcurrTap] = useState("question");
  const [toggleMenu, settoggleMenu] = useState({
    question: true,
    feed: false,
    chat: false,
  });
  const changeToggle = (tapped) => {
    setcurrTap(`${tapped}`);
    settoggleMenu((prev) => {
      return { question: false, chat: false, feed: false };
    });
    settoggleMenu((prev) => {
      return { ...prev, [tapped]: true };
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSetting = () => {
    setSettingVisible(!isSettingVisible);
  };

  // const handleclick = () => {
  //   if (popularSelected === false) {
  //     setpopularSelected(true);
  //   }
  //   if (popularSelected === true) {
  //     setpopularSelected(false);
  //   }
  //   if (popularSelected === null) {
  //     setpopularSelected(false);
  //   }
  // };

  // const onChatTap = () => {
  //   setpopularSelected(null);
  // };

  const tabSwitch = () => {
    if (popularSelected === true) {
      return (
        <>
          <CommunityQuestionaire data={data.question} />
          <View style={styles.container2}>
            <Ionicons name="attach-outline" color="#FFF" size={20} />
            <TextInput placeholder="Some text" style={styles.input} />
            <TouchableOpacity>
              <Ionicons name="ios-send" color="#FFF" size={20} />
            </TouchableOpacity>
          </View>
        </>
      );
    }
    if (popularSelected === null) {
      return (
        <>
          <CommunityChat />
        </>
      );
    }
    if (popularSelected === false) {
      return (
        <>
          <CommunityPost
            cardText={
              "Here is a new challenge for you all. Entrepreneur Community is one of Quink Post original community."
            }
          />
        </>
      );
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#283c86"} />
      <View
        showsVerticalScrollIndicator={false}
        style={{
          height: "100%",
          backgroundColor: "#283c86",
          position: "absolute",
          height: "100%",
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            marginTop: 20,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={22}
              color="#d2d2d2"
              style={{ marginRight: "auto", marginTop: 4 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "#FFF",
              alignSelf: "center",
              marginHorizontal: 11,
            }}
          >
            {/* {data.question} */}
            {data.title}
          </Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("CommunitySendPostScreen", {
                communityDetail: data,
              })
            }
            style={{
              borderWidth: 0.5,
              borderRadius: 6,
              marginLeft: "auto",
              marginTop: 4,
              marginHorizontal: 13,
              borderColor: "white",
              alignSelf: "center",
            }}
          >
            <Ionicons
              name="add-sharp"
              size={18}
              color="#d2d2d2"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSetting} style={{ marginTop: 6 }}>
            <Ionicons name="options-outline" size={24} color="#d2d2d2" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            height: "100%",
            paddingHorizontal: 15,
            marginTop: 15,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              // onPress={handleclick}
              onPress={() => changeToggle("question")}
              style={{
                // borderBottomColor: popularSelected ? "#044244" : "#FFF",
                borderBottomColor: toggleMenu.question ? "#667db6" : "#FFF",
                borderBottomWidth: 4,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  // color: popularSelected ? "#667db6" : "#9ca1a2",
                  color: toggleMenu.question ? "#667db6" : "#9ca1a2",
                }}
              >
                QUESTIONNAIRE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => changeToggle("feed")}
              style={{
                // borderBottomColor: popularSelected ? "#FFF" : "#044244",
                borderBottomColor: toggleMenu.feed ? "#667db6" : "#FFF",
                borderBottomWidth: 4,
                paddingVertical: 6,
                marginLeft: 30,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: toggleMenu.feed ? "#667db6" : "#9ca1a2",
                }}
              >
                FEED
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => changeToggle("chat")}
              style={{
                borderBottomColor: toggleMenu.chat ? "#667db6" : "#FFF",
                borderBottomWidth: 4,
                paddingVertical: 6,
                marginLeft: 30,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: toggleMenu.chat ? "#667db6" : "#9ca1a2",
                }}
              >
                CONNECT
              </Text>
            </TouchableOpacity>
          </View>
          {/* {tabSwitch()} */}
          {(() => {
            switch (currTap) {
              case "question":
                {
                  {
                    /* console.log(data.question, "ddd") */
                  }
                  return (
                    <>
                      <CommunityQuestionaire
                        data={data.question}
                        id={data._id}
                        navigation={props.navigation}
                      />
                      <View style={styles.container2}>
                        <Ionicons
                          name="attach-outline"
                          color="#FFF"
                          size={20}
                        />
                        <TextInput
                          placeholder="Some text"
                          style={styles.input}
                        />
                        <TouchableOpacity>
                          <Ionicons name="ios-send" color="#FFF" size={20} />
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                }
                break;
              case "feed":
                {
                  return (
                    <>
                      <CommunityPost
                        data={data.post}
                        cardText={
                          "Here is a new challenge for you all. Entrepreneur Community is one of Quink Post original community."
                        }
                      />
                    </>
                  );
                }
                break;
              case "chat": {
                return (
                  <>
                    <CommunityChat data={data._id} />
                  </>
                );
              }
            }
          })()}
          <Modal
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            onBackdropPress={toggleModal}
            isVisible={isModalVisible}
            onBackButtonPress={toggleModal}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                height: 250,
              }}
            >
              <CommunityFeedPost navigation={props.navigation} />
            </View>
          </Modal>
          <Modal
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            onBackdropPress={toggleSetting}
            isVisible={isSettingVisible}
            onBackButtonPress={toggleSetting}
            onTouchMove={toggleSetting}
            style={{
              justifyContent: "flex-end",
              top: height / 40,
              width: width,
              marginLeft: "auto",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: 250,
              }}
            >
              <CommunitySetting navigation={props.navigation} />
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container2: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#rgba(0,0,0,0.2)",
    elevation: 0,
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  input: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
    color: "#fff",
    paddingHorizontal: 10,
    flex: 1,
  },
});
