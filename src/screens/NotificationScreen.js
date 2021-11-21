import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BACKEND from "../constants/BACKEND";
import { ActivityIndicator, Dimensions } from "react-native";
// import PushNotification from "../components/PushNotification";

const {width, height} = Dimensions.get("screen");

function NotificationScreen(props) {
  const [user, setuser] = useState({});
  const [notiLength, setnotiLength] = useState();
  const [NotiItem, setNotiItem] = useState([]);
  const [showShade, setshowShade] = useState();
  const [showLoader, setshowLoader] = useState(false);
  // const navigation = props.route.params.navigation
  console.log(props?.route?.params?.navigation);
  const navigation = props?.route?.params?.navigation;

  const STARTED_FOLLOWING_NOTI = "STARTED_FOLLOWING";
  const NEW_POST_NOTI = "NEW_POST";
  const LikedYourPost = "LikedYourPost";

  useEffect(() => {
    (async () => {
      setshowLoader(true);
      const data = await AsyncStorage.getItem("quinkUser");
      setuser(await JSON.parse(data));
      const tempUserId = await JSON.parse(data);
      console.log("sending requ to fetch notification");
      const getNoti = await axios.get(
        `${BACKEND}/notification/all/${tempUserId._id}`
      );
      const notifications = getNoti.data.NotiFilter;
      // console.log(notifications, "%%%");
      const tem = user.notification ? user?.notification : 0;
      const intprevnoti = parseInt(tem);
      const intCurrentNoi = parseInt(notifications.length);
      const popupValue = intCurrentNoi - intprevnoti;
      // await axios.patch(`${BACKEND}/user/updateNoti/${user?._id}/${notifications?.length}`)

      setnotiLength(popupValue);
      setshowShade(popupValue);
      console.log(popupValue, "this is popup <<<<<<");
      setNotiItem(notifications.reverse());
      setshowLoader(false);
    })();
  }, []);

  const Item = ({ noti }) => {
    // const temp = NotiItem.length - user?.notification
    var inc = 1;
    // var checkval = 1;
    // console.log(noti, "<<<<<<")
    const timeStamp = new Date(noti?.timeStamp);
    const months = [
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
    ];

    const getDate = {
      month: months[timeStamp.getMonth() - 1],
      date: timeStamp.getDate(),
      hour: timeStamp.getHours(),
      minute: timeStamp.getMinutes(),
    };

    if (noti.Type == STARTED_FOLLOWING_NOTI) {
      inc += 1;
      return (
        <View>
          <View style={styles.listItem}>
            <Image
              source={{ uri: noti?.following?.followingId?.avatar }}
              style={{ width: 50, height: 50, borderRadius: 30 }}
            />
            <View
              style={{
                alignItems: "center",
                flex: 1,
                alignSelf: "center",
                marginLeft: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {noti?.following?.followingId?.userName} started following you
              </Text>
            </View>
            {(() => {
              if (noti < notiLength) {
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon name="eye-outline" color="grey" size={22} />
                </TouchableOpacity>;
              }
            })()}
            <Text style={{ fontSize: 11, alignSelf: "center" }}>
              {getDate.hour}:{getDate.minute} | {getDate.date} {getDate.month}
            </Text>
          </View>
        </View>
      );
    }
    if (noti.Type === LikedYourPost) {
      //   await sendPushNotification({ expoPushToken, notifi });
      // };
      // async () => {
      // };
      inc += 1;
      return (
        <>
          {/* <PushNotification
            notifi={`${noti?.LikedBy?.LikedByUser?.userName} liked your post ${noti?.LikedBy?.postId?.title}`}
            notival={true}
          /> */}
          <View
            onPress={() =>
              navigation?.navigate("ContentDetailScreen", {
                data: noti?.LikedBy?.postId,
              })
            }
          >
            <View style={styles.listItem}>
              <Image
                source={{ uri: noti?.LikedBy?.LikedByUser?.avatar }}
                style={{ width: 50, height: 50, borderRadius: 30 }}
              />
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {noti?.LikedBy?.LikedByUser?.userName} {"liked your post "}
                  {noti?.LikedBy?.postId?.title}
                </Text>
              </View>
              {(() => {
                if (noti < notiLength) {
                  <TouchableOpacity
                    style={{
                      height: 50,
                      width: 50,
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon name="eye-outline" color="grey" size={22} />
                  </TouchableOpacity>;
                }
              })()}
              <Text style={{ fontSize: 11, alignSelf: "center" }}>
                {getDate.hour}:{getDate.minute} | {getDate.date} {getDate.month}
              </Text>
            </View>
          </View>
        </>
      );
    } else {
      return null;
    }
  };
  // return (
  //   <View style={styles.listItem}>
  //     <Image source={{ uri: noti.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} />
  //     <View style={{ alignItems: "center", flex: 1, alignSelf: 'center' }}>
  //       <Text style={{ fontWeight: "bold", marginLeft: 10 }}>{noti.name}</Text>
  //     </View>
  //     <TouchableOpacity style={{ height: 50, width: 50, alignSelf: 'center', justifyContent: "center", alignItems: "center" }}>
  //       <Icon name='eye-outline' color='grey' size={22} />
  //     </TouchableOpacity>
  //   </View>
  // );
  // }

  return (
    <>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#283c86" />
        <LinearGradient colors={["#283c86", "#667db6", "#a8c0ff"]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              marginHorizontal: 10,
              paddingBottom: 8,
            }}
          >
            <View style={{ width: "10%" }}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon name="arrow-back-sharp" color={"#fff"} size={24} />
              </TouchableOpacity>
            </View>
            <View style={{ width: "80%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  NOTIFICATION
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "10%",
                marginLeft: "3%",
              }}
            >
              <Icon name="ios-reader-outline" color="#fff" size={24} />
            </View>
          </View>
        </LinearGradient>
        <SafeAreaView style={styles.container}>
          {(() => {
            if (!showLoader) {
              return (
                <FlatList
                  style={{ marginBottom: 70 }}
                  data={NotiItem}
                  renderItem={({ item }) => <Item noti={item} />}
                  keyExtractor={(item) => item.email}
                  showsVerticalScrollIndicator={false}
                />
              );
            } else {
              return (
                <>
                  <View
                    style={{
                      backgroundColor: "transparent",
                      height: height / 1.27,
                      justifyContent: "center",
                      alignSelf: "center",
                      marginTop: 10,
                    }}
                  >
                    <ActivityIndicator size={55} color="#667db6" />
                  </View>
                </>
              );
            }
          })()}
        </SafeAreaView>
      </View>
    </>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  listItem: {
    margin: 7,
    elevation: 4,
    padding: 7,
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
});
