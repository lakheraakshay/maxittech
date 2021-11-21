import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Block, Text, theme, Button as GaButton } from "galio-framework";
import Icon from "@expo/vector-icons/Ionicons";
import Icon2 from "@expo/vector-icons/Feather";
import { nowTheme } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderHeight } from "../constants/utils";
import Product from "../components/Product";
import { Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import ProfileSettingModalContent from "../components/ProfileSettingModalContent";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
import ProductNoEditAndDelete from "../components/ProductNoEditAndDelete";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

function ProfileScreen(props) {
  // var user={name:"akshay"}
  const [getPost, setgetPost] = useState([]);
  const [getPostSave, setgetPostSave] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [popularSelected, setpopularSelected] = useState(true);

  const [Loading, setLoading] = useState(false);
  // const [Refreshing, setRefreshing] = useState(false);
  const toggleProfileScreen = async () =>
    JSON.parse(await AsyncStorage.getItem("toggleProfileScreen"));
  const [user, setuser] = useState();
  useEffect(() => {
    try {
      (async () => {
        const data = await AsyncStorage.getItem("quinkUser");
        const temptUser = await JSON.parse(data);

        setgetPost(await temptUser?.post);
        setgetPostSave(await tempUser?.savedPost)
        setuser(await JSON.parse(data));
      })();
    } catch (E) {
      console.log(E);
    }
  }, []);
  // console.log(getPost, "<<<<<");
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem("quinkUser");
        // const temptUser = await JSON.parse(data)
        setuser(await JSON.parse(data));
        // const postOfUser = await axios.get(`${BACKEND}/post/ofUser/${temptUser._id}`)
        // console.log("useEffect called in profile screen");
        console.log("refreshi called");
        const temp = await JSON.parse(data);
        const getUserPost = await axios.get(
          `${BACKEND}/post/ofUser/${temp._id}`
        );

        setgetPost(getUserPost.data.posts);
        const getUserPostSave = await axios?.get(`${BACKEND}/post/save/ofUser/${temp?._id}`);
        console.log(getUserPostSave, "ok ok ")
        setgetPostSave(getUserPostSave.data.posts)

        setRefreshing(false);
        // console.log(JSON.parse(data))
        // user=await JSON.parse(data)
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  // console.log(user, "this i suser>>>>");
  // console.log(globalState,"this is user")
  // console.log(user, "this is user")

  const [isModalVisible, setModalVisible] = useState(false);
  // const [save, setsave] = useState([])
  // const [post, setpost] = useState([])
  // const [UserContent, setUserContent] = useState([
  //   {
  //     title: "Hardly Anything Takes More Coura...",
  //     image: "https://source.unsplash.com/dS2hi__ZZMk/840x840",
  //     price: 180,
  //     horizontal: true,
  //   },
  //   {
  //     title: "Internet of Things (IoT) is Here to Stay",
  //     image: "https://source.unsplash.com/I7BSOoPa5hM/840x840",
  //     price: 188,
  //     horizontal: true,
  //   },
  // ]);

  // useEffect(() => {
  //   (async () => {
  //     try {

  //       const post = await axios.get(`${BACKEND}/post/ofUser/:userId`)
  //       setpost(post.data)
  //       // console.log("inside useEffect")
  //       // const post = await axios.get(`http://192.168.43.120:5000/user/savedPost/${user?._id}`)
  //       // console.log(post.data, "this is savedPost")
  //       // setsave(post.data)
  //     } catch (e) { console.log(e) }
  //   })()

  // }, [])

  const onTabPressed = (value) => {
    // console.log(value, "<<<value");
    setpopularSelected(value);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const savedPost = () => {
    if (popularSelected == true) {
      return getPost.map((post, key) => {
        // console.log()
        if (key == 1) {
          console.log(post, "this is to see<<<<<<<<<<<")
        }
        // console.log(post, "props data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        return (
          <Product
            data={post}
            key={key}
            // product={UserContent[0]}
            navigation={props?.navigation}
          />
        );
      });
    } else {
      // console.log(savedPosts, ">>>>>>>>>>>>>>> tgis djkf")
      return getPostSave.map((obj, key) => {
        // console.log(obj, "this is one post");
        return (
          <ProductNoEditAndDelete
            data={obj}
            key={key}
            // product={UserContent[0]}
            navigation={props?.navigation}
          />
        );
      });
    }
  };

  const onRefresh = useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    (async () => {
      try {
        const data = await AsyncStorage.getItem("quinkUser");
        // const temptUser = await JSON.parse(data)
        // setuser(await JSON.parse(data));
        // const postOfUser = await axios.get(`${BACKEND}/post/ofUser/${temptUser._id}`)
        // console.log("useEffect called in profile screen");
        console.log("refreshi called");
        const temp = await JSON.parse(data);
        const getUserPost = await axios.get(
          `${BACKEND}/post/ofUser/${temp._id}`
        );
        console.log(
          getUserPost.data.success,
          getUserPost.data.posts.length,
          "<<<<<<<success"
        );
        setgetPost(getUserPost.data.posts);
        // setRefreshing(false);
        // console.log(JSON.parse(data))
        // user=await JSON.parse(data)
      } catch (e) {
        console.log(e);
      }
    })();

    wait(2000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, []);
  // console.log(user)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Block flex={0.6}>
          <ImageBackground
            source={require("../../assets/imgs/bg5.png")}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <Block flex>
              <Icon
                name="pencil-sharp"
                size={24}
                style={{
                  top: 25,
                  left: 15,
                  color: "#fff",
                  position: "absolute",
                }}
                onPress={() =>
                  props.navigation.navigate("EditProfileScreen", { data: user })
                }
              />
              <Icon
                name="notifications-outline"
                size={24}
                style={{
                  right: 50,
                  top: 25,
                  marginLeft: "auto",
                  color: "#fff",
                }}
                onPress={() =>
                  props.navigation.navigate("NotificationScreen", {
                    navigation: props.navigation,
                  })
                }
              />
              <Badge
                status="primary"
                value={user?.notification}
                onPress={() =>
                  props.navigation.navigate("NotificationScreen", {
                    navigation: props.navigation,
                  })
                }
                containerStyle={{ position: "absolute", top: 19, right: 45 }}
              />
              <Icon
                name="ellipsis-vertical-outline"
                size={24}
                style={{
                  right: 12,
                  // bottom: 27,
                  marginLeft: "auto",
                  color: "#fff",
                }}
                onPress={toggleModal}
              />
              <View
                style={{
                  width: width,
                  zIndex: 5,
                  justifyContent: "space-around",
                  paddingHorizontal: 20,
                }}
              >
                <Block middle style={{ top: height * 0.195, marginBottom: 25 }}>
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
                        {user?.userName == "Quink Post Admin"
                          ? "Admin"
                          : user?.post?.length < 5
                            ? "Amatuer"
                            : user?.post?.length < 20
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

                  <Image source={{ uri: user?.avatar }} style={styles.avatar} />
                </Block>
                <Block style={{ top: height * 0.48, marginTop: 30 }}>
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
                      {user?.userName}
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
                            props.navigation.navigate("FollowerDetailScreen", {
                              navigation: props.navigation,
                            })
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
                            {user?.followers?.length}
                          </Text>
                          <Text
                            style={{ fontFamily: "Montserrat_400Regular" }}
                            size={14}
                            color="white"
                          >
                            follower
                          </Text>
                        </TouchableOpacity>
                      </Block>

                      <Block middle>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("FollowerDetailScreen", {
                              navigation: props.navigation,
                            })
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
                            {user?.followings?.length}
                          </Text>
                          <Text
                            style={{ fontFamily: "Montserrat_400Regular" }}
                            size={14}
                            color="white"
                          >
                            following
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
                          {user?.post?.length}
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
                  </Block>
                </Block>
              </View>

              <Block
                middle
                row
                style={{
                  position: "absolute",
                  width: width,
                  top: height * 0.6 - 30,
                  zIndex: 99,
                }}
              >
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
                <LinearGradient
                  colors={["#7F7FD5", "#86A8E7", "#91EAE4"]}
                  style={{
                    backgroundColor: "#000",
                    height: 50,
                    elevation: 30,
                    width: 50,
                    marginHorizontal: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 25,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("InsightScreen")}
                  >
                    <Icon2 name="dollar-sign" size={27} color="#fff" />
                  </TouchableOpacity>
                </LinearGradient>
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
              </Block>
            </Block>
          </ImageBackground>
        </Block>
        <Block flex={0.4}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          // style={{ padding: theme.SIZES.BASE, bottom: 140 }}
          >
            <Block flex style={{ marginTop: 10 }}>
              <Block middle>
                <Text
                  style={{
                    color: "#2c2c2c",
                    fontWeight: "bold",
                    fontSize: 19,
                    fontFamily: "Montserrat_700Bold",
                    marginTop: 15,
                    marginBottom: 10,
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
                    if (user?.bio == null) {
                      return "No Bio yet";
                    } else {
                      return user?.bio;
                    }
                  })()}
                </Text>
              </Block>
              {/* <Block
                row
                style={{
                  paddingBottom: 14,
                  paddingHorizontal: 15,
                  paddingTop: 20,
                }}
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
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("BookmarkedScreen")}
                >
                  <Text
                    color="grey"
                    style={{
                      fontWeight: "bold",
                      borderWidth: 2,
                      borderColor: "lightgrey",
                      paddingHorizontal: 5,
                      paddingVertical: 1,
                      textAlignVertical: "center",
                      textAlign: "center",
                    }}
                  >
                    Bookmarked
                  </Text>
                </TouchableOpacity>
              </Block> */}

              <LinearGradient
                colors={["#283c86", "#667db6", "#a8c0ff"]}
                style={{
                  // backgroundColor: "#FFF",
                  // marginHorizontal: width / 8,
                  // borderRadius: 50,
                  marginTop: 35,
                  marginHorizontal: width / 12,
                  borderRadius: 8,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 3,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => onTabPressed(true)}
                      style={{
                        borderBottomColor: popularSelected
                          ? "#fff"
                          : "transparent",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                        borderRadius: 10,
                        marginBottom: 9,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: popularSelected
                            ? "#fff"
                            : "rgba(255,255,255,0.6)",
                        }}
                      >
                        CONTENT CREATED
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => onTabPressed(false)}
                      style={{
                        borderBottomColor: popularSelected
                          ? "transparent"
                          : "#fff",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                        marginLeft: 37,
                        borderRadius: 10,
                        marginBottom: 9,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: popularSelected
                            ? "rgba(255,255,255,0.6)"
                            : "#fff",
                        }}
                      >
                        SAVED CONTENT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </LinearGradient>

              {Loading ? (
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: height / 1.5,
                    justifyContent: "center",
                    paddingBottom: 25,
                  }}
                >
                  <ActivityIndicator size={55} color="#667db6" />
                </View>
              ) : (
                <Block
                  style={{
                    paddingBottom: -HeaderHeight * 2,
                    paddingHorizontal: 15,
                  }}
                >
                  <Block flex style={styles.group}>
                    <Block flex>
                      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block>
                          {savedPost()}
                          {/* {(() => {
                            return user?.savedPost?.map((post) => {
                              return (
                                <ProductNoEditAndDelete
                                  data={post}
                                  product={post}
                                  navigation={props.navigation}
                                />
                              );
                            });
                          })()} */}
                          {/* <Product
                          product={UserContent[0]}
                          style={{ marginRight: theme.SIZES.BASE }}
                          navigation={props.navigation}
                        /> */}
                          {/* <Product
                          product={UserContent[1]}
                          navigation={props.navigation}
                        /> */}
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              )}
            </Block>
          </ScrollView>
        </Block>
      </View>

      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
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
            height: 300,
          }}
        >
          <ProfileSettingModalContent
            navigation={props?.navigation}
            modalShow={toggleModal}
          />
        </View>
      </Modal>
    </ScrollView>

    // <></>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height: height / 1.55,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
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
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: "center",
    zIndex: 99,
    marginHorizontal: 5,
  },
});
