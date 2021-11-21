import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
} from "react-native";
import { Block, Text, theme, Button as GaButton } from "galio-framework";
import Icon from "@expo/vector-icons/Ionicons";
import ArButton from "../components/Button";
import { nowTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import Product from "../components/Product";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
// import ACTION from "../components/Action";
import io from "socket.io-client";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
// import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductNoEditAndDelete from "../components/ProductNoEditAndDelete";

const socket = io(`${BACKEND}`);

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const UserProfileScreen = (props) => {
  const [user, setuser] = useState();
  const STARTED_FOLLOWING = "STARTED_FOLLOWING";
  const [state, setstate] = useState([]);
  const data = props.route.params.data;

  const [followValue, setfollowValue] = useState("loading");
  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("quinkUser");
        setuser(JSON.parse(user));
        const curruser = JSON.parse(user);
        // console.log(user, "after setting user <<<<<<<<<<<")

        const result = await axios.get(`${BACKEND}/post/ofUser/${data._id}`);
        setstate(result.data.posts);

        const checkFollowing = await curruser?.followings?.find(
          (id) => id == data._id
        );
        console.log(checkFollowing, "<<<<<<<<<<<");
        // console.log(checkFollowing.userName, "------------------------")
        // console.log()
        if (checkFollowing) {
          console.log("currently you following him");
          setfollowValue("Unfollow");
        } else {
          setfollowValue("Follow");
          console.log("you are not following him yet");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // socket.on("messageFromOne", function (data) {
  //   console.log("Incoming message:", data);
  // });

  const followThisUser = async () => {
    try {
      if (followValue == "Follow") {
        console.log("going to follow");
        const result = await axios.post(`${BACKEND}/follow`, {
          followerId: user?._id,
          followingToId: data?._id,
        });

        // console.log(result.data, "this is result.data")
        setfollowValue("Unfollow");
        await AsyncStorage.setItem(
          "quinkUser",
          JSON.stringify(result.data.user)
        );
        // console.log(result.data, "this is data on follow 88888888888888888888888888888888888888888888888888888888888888")
        // dispatch({ type: ACTION.USER_LOGGED_IN, payload: result.data.user });
      } else {
        console.log("going to unfollow");
        const result = await axios.post(`${BACKEND}/follow/unfollow`, {
          followerId: user?._id,
          followingToId: data?._id,
        });
        // console.log(result.data)
        const notiToUser = await axios.post(
          `${BACKEND}/notification/startedFollowing/${user?._id}/${user?.userName}/${STARTED_FOLLOWING}/${data?._id}`
        );

        console.log(result.data, "This is result data");
        setfollowValue("Follow");
        await AsyncStorage.setItem(
          "quinkUser",
          JSON.stringify(result.data.user)
        );
        // if (result.data.success) {
        //   // console.log(result.data, "888888888888888888888888888888888888888888 data after unfollow ")
        //   setfollowValue("Follow");
        //   // dispatch({ type: ACTION.USER_LOGGED_IN, payload: result.data.user });
        // }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#283c86"} />
      <ScrollView stickyHeaderIndices={[0]}>
        <View>
          <View>
            <LinearGradient
              style={styles.icons}
              colors={["#283c86", "#667db6", "#a8c0ff"]}
            >
              <Icon
                name="arrow-back-sharp"
                size={27}
                color={"#fff"}
                style={{ marginHorizontal: 7 }}
                onPress={() => props.navigation.goBack()}
              />
              <Text style={styles.navtext}> {data.userName} </Text>
              <Icon
                name="notifications-sharp"
                size={24}
                color={"#fff"}
                style={{
                  marginLeft: "auto",
                  marginHorizontal: 10,
                  alignSelf: "center",
                }}
              />
              <Icon
                name="ellipsis-vertical-sharp"
                size={24}
                color={"#fff"}
                style={{ marginRight: 5, alignSelf: "center" }}
              />
            </LinearGradient>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Block flex={0.6}>
            <ImageBackground
              source={require("../../assets/imgs/bg5.png")}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <Block flex style={styles.profileCard}>
                <View
                  style={{
                    width: width,
                    zIndex: 5,
                    justifyContent: "space-around",
                    paddingHorizontal: 20,
                  }}
                >
                <Block middle style={{ top: height * 0.14, marginBottom: 25 }}>
                    <View style={{ top: 28, elevation: 1 }}>
                      <LinearGradient
                        colors={["#43C6AC", "#191654"]}
                        style={{
                          width: 120,
                          padding: 10,
                          paddingLeft: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          // backgroundColor: "red",
                          height: 40,
                          borderTopRightRadius: 3,
                          borderBottomRightRadius: 3,
                        }}
                      >
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                          {data?.userName == "Quink Post Admin"
                            ? "Admin"
                            : data?.post?.length < 5
                              ? "Amatuer"
                              : data?.post?.length < 20
                                ? "Creative"
                                : "Master"}
                        </Text>
                      </LinearGradient>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            width: 0,
                            height: 0,
                            backgroundColor: "transparent",
                            borderStyle: "solid",
                            borderRightWidth: 20,
                            borderTopWidth: 20,
                            borderRightColor: "transparent",
                            borderTopColor: "#191654",
                            transform: [{ rotate: "90deg" }],
                          }}
                        />
                        <View
                          style={{
                            width: 0,
                            height: 0,
                            marginLeft: "auto",
                            backgroundColor: "transparent",
                            borderStyle: "solid",
                            borderLeftWidth: 20,
                            borderTopWidth: 20,
                            borderRightColor: "transparent",
                            borderLeftColor: "transparent",
                            borderTopColor: "#191654",
                            transform: [{ rotate: "270deg" }],
                          }}
                        />
                      </View>
                    </View>

                    <Image
                      source={{
                        uri: data?.avatar
                          ? data?.avatar
                          : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar",
                      }}
                      style={styles.avatar}
                    />
                  </Block>
                  <Block style={{ top: height * 0.19, marginTop: 30 }}>
                    <Block middle>
                      <Text
                        style={{
                          fontFamily: "Montserrat_700Bold",
                          marginBottom: theme.SIZES.BASE / 2,
                          fontWeight: "900",
                          fontSize: 26,
                        }}
                        color="#ffffff"
                      >
                        {data?.userName}
                      </Text>

                      <Text
                        size={16}
                        color="white"
                        style={{
                          marginTop: 5,
                          fontFamily: "Montserrat_700Bold",
                          lineHeight: 20,
                          fontWeight: "bold",
                          fontSize: 18,
                          opacity: 0.8,
                        }}
                      >
                        Content Creator
                      </Text>
                    </Block>
                    <Block style={styles.info}>
                      <Block row space="around">
                        <Block middle>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate(
                                "UserProfileFollowerScreen",
                                {
                                  followerData: data._id,
                                  navigation: props.navigation,
                                }
                              )
                            }
                          >
                            <Text
                              size={18}
                              color="white"
                              style={{
                                marginBottom: 4,
                                textAlign: "center",
                                fontFamily: "Montserrat_700Bold",
                              }}
                            >
                              {data?.followers?.length}
                            </Text>
                            <Text
                              style={{ fontFamily: "Montserrat_400Regular" }}
                              size={14}
                              color="white"
                            >
                              followers
                            </Text>
                          </TouchableOpacity>
                        </Block>

                        <Block middle>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate(
                                "UserProfileFollowerScreen",
                                {
                                  followerData: data._id,
                                  navigation: props.navigation,
                                }
                              )
                            }
                          >
                            <Text
                              color="white"
                              size={18}
                              style={{
                                marginBottom: 4,
                                textAlign: "center",
                                fontFamily: "Montserrat_700Bold",
                              }}
                            >
                              {data?.followings?.length}
                            </Text>
                            <Text
                              style={{ fontFamily: "Montserrat_400Regular" }}
                              size={14}
                              color="white"
                            >
                              followings
                            </Text>
                          </TouchableOpacity>
                        </Block>

                        <Block middle>
                          <Text
                            color="white"
                            size={18}
                            style={{
                              marginBottom: 4,
                              fontFamily: "Montserrat_700Bold",
                            }}
                          >
                            {data?.post?.length}
                          </Text>
                          <Text
                            style={{ fontFamily: "Montserrat_400Regular" }}
                            size={14}
                            color="white"
                          >
                            posts
                          </Text>
                        </Block>
                      </Block>
                      <Block style={styles.socialicons}>
                        <GaButton
                          round
                          onlyIcon
                          shadowless
                          icon="twitter"
                          iconFamily="Font-Awesome"
                          iconColor={nowTheme.COLORS.WHITE}
                          iconSize={nowTheme.SIZES.BASE * 1.375}
                          color={"#888888"}
                          style={[styles.social, styles.shadow]}
                        />
                        <GaButton
                          round
                          onlyIcon
                          shadowless
                          icon="pinterest"
                          iconFamily="Font-Awesome"
                          iconColor={nowTheme.COLORS.WHITE}
                          iconSize={nowTheme.SIZES.BASE * 1.375}
                          color={"#888888"}
                          style={[styles.social, styles.shadow]}
                        />
                        <GaButton
                          round
                          onlyIcon
                          shadowless
                          icon="facebook"
                          iconFamily="Font-Awesome"
                          iconColor={nowTheme.COLORS.WHITE}
                          iconSize={nowTheme.SIZES.BASE * 1.375}
                          color={"#888888"}
                          style={[styles.social, styles.shadow]}
                        />
                        <GaButton
                          round
                          onlyIcon
                          shadowless
                          icon="instagram"
                          iconFamily="Font-Awesome"
                          iconColor={nowTheme.COLORS.WHITE}
                          iconSize={nowTheme.SIZES.BASE * 1.375}
                          color={"#888888"}
                          style={[styles.social, styles.shadow]}
                        />
                      </Block>
                    </Block>
                  </Block>
                </View>

                <Block
                  middle
                  row
                  style={{
                    position: "absolute",
                    width: width,
                    top: height * 0.535,
                    marginVertical: 30,
                    zIndex: 99,
                  }}
                >
                  <ArButton
                    style={{
                      width: 114,
                      height: 44,
                      marginHorizontal: 5,
                      elevation: 0,
                    }}
                    onPress={followThisUser}
                    textStyle={{ fontSize: 16 }}
                    round
                  >
                    {followValue}
                  </ArButton>
                  <ArButton
                    style={{
                      width: 114,
                      height: 44,
                      marginHorizontal: 5,
                      elevation: 0,
                    }}
                    textStyle={{ fontSize: 16 }}
                    round
                    onPress={() => {
                      props.navigation.navigate("MessageDetailScreen", {
                        user1: user._id,
                        user2: data._id,
                        userName: data.userName,
                      });
                    }}
                  >
                    Message
                  </ArButton>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
          <Block />
          <Block
            flex={0.4}
            style={{
              padding: theme.SIZES.BASE,
              marginTop: -310,
              backgroundColor: "#fff",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Block flex style={{ marginTop: 0 }}>
                <Block middle>
                  <Text
                    style={{
                      color: "#2c2c2c",
                      fontWeight: "bold",
                      fontSize: 19,
                      fontFamily: "Montserrat_700Bold",
                      marginTop: 5,
                      marginBottom: 15,
                      zIndex: 2,
                    }}
                  >
                    About me
                  </Text>
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat_400Regular",
                      zIndex: 2,
                      lineHeight: 25,
                      color: "#9A9A9A",
                      paddingHorizontal: 15,
                    }}
                  >
                    {(() => {
                      if (data.bio) {
                        return data.bio;
                      } else {
                        return "empty";
                      }
                    })()}
                  </Text>
                </Block>
                <Block
                  row
                  style={{ paddingVertical: 19, paddingHorizontal: 15 }}
                  space="between"
                >
                  <Text
                    bold
                    size={16}
                    color="#2c2c2c"
                    style={{ textAlignVertical: "center" }}
                  >
                    Content Created
                  </Text>
                  <ArButton
                    small
                    color="transparent"
                    textStyle={{
                      color: nowTheme.COLORS.PRIMARY,
                      fontSize: 14,
                    }}
                  >
                    View all
                  </ArButton>
                </Block>

                <Block
                  style={{
                    paddingBottom: -HeaderHeight * 2,
                    paddingHorizontal: 0,
                  }}
                >
                  <Block flex style={styles.group}>
                    <Block flex>
                      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block flex column>
                          {(() => {
                            return state.map((post) => {
                              return (
                                <ProductNoEditAndDelete
                                  product={post}
                                  data={{
                                    ...post,
                                    author: { userName: data.userName },
                                  }}
                                  style={{ marginRight: theme.SIZES.BASE }}
                                  navigation={props.navigation}
                                />
                              );
                            });
                          })()}
                          {/* <Product
                          product={UserContent[1]}
                          navigation={props.navigation}
                        /> */}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </Block>
        </View>
      </ScrollView>
    </>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
  },
  socialicons: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },
  icons: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  navtext: {
    fontWeight: "bold",
    fontSize: 19,
    marginHorizontal: 10,
    color: "#fff",
  },
  info: {
    marginTop: 20,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 1.25,
    marginBottom: 10,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 2.5,
    height: nowTheme.SIZES.BASE * 2.5,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: "center",
    zIndex: 99,
    marginBottom: 5,
  },
});
