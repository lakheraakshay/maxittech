import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Icon from "@expo/vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import ProfileMessage from "../components/ProfileMessage";
import Messages from "../components/Messages";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dimensions } from "react-native";

const {width, height} = Dimensions.get("window");

const MessageScreen = (props) => {
  const [globalState, setglobalState] = useState()
  // useEffect(()=>{ (async()=>{
  //   const usre=await AsyncStorage.getItem("quinkUser")
  //   setglobalState(JSON.parse(usre))
  //   // console.log(globalState,"******************")
  // })() },[])

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const pan = useRef(new Animated.ValueXY()).current;
  const list = useRef(new Animated.ValueXY()).current;

  useEffect(function () {
    {
      (async () => {

        try {
          const usre = await AsyncStorage.getItem("quinkUser")
          setglobalState(JSON.parse(usre))
          const parsedUser = JSON.parse(usre)
          const result = await axios.post(
            `${BACKEND}/personalChat/getPartner`,
            {
              userId: parsedUser._id,
            }
          );
          console.log(result.data, "this is**************************");
          setData(result.data.userChats);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      })();
    }

    // const getData = async () => {
    //     const resp = await fetch(URL);
    //     const data = await resp.json();
    //     setData(data);
    //     setLoading(false);
    // };
    // getData();

    Animated.timing(pan, {
      toValue: { x: -400, y: 0 },
      delay: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(list, {
      toValue: { x: 0, y: -300 },
      delay: 2000,
      useNativeDriver: false,
    }).start();
  }, []);
  const userName = (partner) => {
    if (partner.user1._id == globalState._id) {
      {
        /* console.log(partner.user2.userName) */
      }
      return { avatar: partner.user2.avatar, userName: partner.user2.userName };
    } else {
      {
        /* console.log(partner.user1.userName) */
      }
      return { avatar: partner.user1.avatar, userName: partner.user1.userName };

    }
  };

  // console.log(data?.user1, "jkjkjk")

  return (
    <LinearGradient
      colors={["#f7f7f7", "#a8c0ff", "#667db6"]}
      style={styles.gradient}
    >
      <StatusBar backgroundColor={'#f7f7f7'} barStyle='light-content' />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Share Content</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("SearchScreen")}
        >
          <Icon name="add" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        style={styles.proContainer}
        showsHorizontalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Animated.View style={[pan.getLayout(), styles.card]}>
            {(() => {
              return data.map((partner) => {
                {
                  /* console.log(partner.user2.userName) */
                }
                return (
                  <ProfileMessage
                    // key=item._id
                    userName={() => {
                      userName();
                    }}
                    uri={partner?.user2?.avatar}
                  />
                );
              });
            })()}
          </Animated.View>
        )}
      </ScrollView>
      <View style={styles.ops}>
        <View style={styles.col}>
          <Text style={styles.day}>Messages</Text>
          <Entypo name="dots-three-horizontal" color="#000119" size={30} />
        </View>
        <ScrollView>
          {loading ? (
            <View style={{ marginTop: 50 }}>
              <ActivityIndicator size="large" color="#283c86" />
            </View>
          ) : (
            <Animated.View style={[list.getLayout(), styles.list]}>
              {(() => {
                return data.map((partner) => {
                  // console.log(partner.user1.userName, partner.user2.userName);


                  return (
                    <Messages
                      key={partner._id}
                      username={userName(partner).userName}
                      uri={userName(partner).avatar}
                      count={Math.floor(Math.random() * 3)}
                      onPress={() => {
                        props.navigation.navigate("MessageDetailScreen", {
                          user1: globalState._id,
                          user2: partner.user2._id,
                          chatId: partner._id,
                          useravatar: partner.user2.avatar,
                          userName: userName(partner).userName,
                        });
                      }}
                    />
                  );
                });
              })()}
            </Animated.View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default MessageScreen;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
    marginBottom: -260,
  },
  card: {
    marginLeft: 400,
    // width: 100,
    flexDirection: "row",
  },
  gradient: {
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#333",
    flex: 1,
    fontSize: 24,
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center",
    marginTop: 10
  },
  ops: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: height / 1.32,
    backgroundColor: "#FFF",
    marginHorizontal: -20,
  },
  col: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000119",
    flex: 1,
    fontSize: 20,
  },
});
