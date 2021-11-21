import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
const { statusBarHeight } = Constants;
import { Block, Card, Text } from "galio-framework";
import theme from "../constants/Theme";
import Icon2 from "@expo/vector-icons/Ionicons";
import getTimeToShow from "../components/GetTimeToShow";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
import { AdMobBanner } from "expo-ads-admob";
import bgImage from "../../assets/imgs/Quinkpost.jpg";
import { LinearGradient } from "expo-linear-gradient";
import HTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Share } from "react-native";
import Deck from "../components/Deck";
import { Button } from "react-native";
const { width, height } = Dimensions.get("screen");

function ContentDetailScreen(props) {
  // console.log(props.route.params.CARDS.image)
  const backImage = props.route.params.data.image;
  // const dispatch = useDispatch();
  const data = props.route.params.data;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentText, setcommentText] = useState("");
  const [commentOpen, setcommentOpen] = useState(false);
  const [likeComment, setlikeComment] = useState({});
  const [totalLikedPost, settotalLikedPost] = useState(0);
  const [totalComment, settotalComment] = useState(0);
  const [suggestion, setsuggestion] = useState([]);
  const [changeStateOnSendComment, setchangeStateOnSendComment] =
    useState(true);
  const [changeStateOnlike, setchangeStateOnlike] = useState(false);
  const [commentInPost, setcommentInPost] = useState([]);
  const postCreatedOn = data.createdOn;

  // const [totalComment, settotalComment] = useState(0)
  // console.log(globalUser)
  const [globalUser, setglobalState] = useState();

  const contentWidth = useWindowDimensions().width;

  const htmlContent = `${data?.body}`;
  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == "img") {
      const { src, height } = node.attribs;
      // const {screenWidth, screenHeight} = Dimensions.get("window")
      return (
        <Image
          key={index}
          style={{ width: 320, height: 600, alignSelf: "center" }}
          resizeMode="contain"
          source={{ uri: src }}
        />
      );
    }
  };

  useEffect(() => {
    (async () => {
      const sugg = await axios.post(`${BACKEND}/suggestion`, {
        tags: data.tags,
        type: data.type,
      });
      if (sugg.data.success) {
        setsuggestion(sugg.data.suggestion);
        console.log(sugg?.data?.suggestion, "suggestion");
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const usre = await AsyncStorage.getItem("quinkUser");
      setglobalState(JSON.parse(usre));
    })();
  }, []);
  useEffect(() => {
    const unsubscribe = props?.navigation.addListener("focus", () => {
      console.log("Refreshed!");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // (async () => {
    //   const usre = await AsyncStorage.getItem("quinkUser")
    //   setglobalState(JSON.parse(usre))
    // })()
    (async () => {
      try {
        const usre = await AsyncStorage.getItem("quinkUser");
        const userId = JSON.parse(usre);
        const result = await axios.post(`${BACKEND}/save/checkIsSaved`, {
          userId: userId,
          postId: data._id,
        });
        if (result.data.success) {
          setSaved(true);
        }
        console.log(result.data, "<<<<<<<< in use effect detail screen");
        data.comment.map((comment) => {
          return setlikeComment((prev) => {
            return { ...prev, [comment._id]: comment.likedBy };
          });
        });
      } catch (e) {
        console.log("error >>>>", e);
      }
    })();
  }, [changeStateOnlike]);

  useEffect(() => {
    (async () => {
      const usre = await AsyncStorage.getItem("quinkUser");
      const temusre = JSON.parse(usre);
      try {
        console.log("called like");
        const resultLikedPost = await axios.post(
          `${BACKEND}/like/checkIsLiked`,
          {
            userId: temusre._id,
            postId: data._id,
          }
        );
        if (resultLikedPost.data.success) {
          // await axios.post(
          //   `${BACKEND}/notification/likedBy/${temusre?._id}/${data._id}/LikedYourPost`
          // );

          setLiked(resultLikedPost.data.islikedBy);
          settotalLikedPost(resultLikedPost.data.length);
        } else {
          settotalLikedPost(resultLikedPost.data.length);
        }
      } catch (e) {
        console.log(e, "error");
      }
    })();
  }, [liked]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND}/comment/inPost/${data._id}`);
        setcommentInPost(result.data.comments);
        result.data.comments.map((comment) => {
          return setlikeComment((prev) => {
            return { ...prev, [comment._id]: comment.likedBy };
          });
        });
        settotalComment(result.data.comments.length);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [changeStateOnSendComment]);

  const renderCard = (item) => {
    console.log(item._doc.image, "imagerecom");
    if (true) {
      return (
        <View key={item?._doc?._id} style={styles.cardContainer}>
          <View style={styles.card}>
            <View>
              <Text style={styles.title2}>{item?._doc?.title}</Text>
              <Icon2
                name="ios-remove"
                size={40}
                color="red"
                style={{ marginTop: 0 }}
              />
              <Text style={styles.number}>{item?._doc?.author?.userName}</Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              paddingBottom: 20,
              paddingRight: 10,
            }}
          >
            {/* <Icon2 name="md-options" size={24} color="#FFF" />
            <Text style={styles.textCovid}>COVID-19</Text> */}
            <TouchableOpacity
              onPress={() =>
                props?.navigation?.navigate("ContentDetailScreen", {
                  data: item?._doc,
                  navigation: props?.navigation,
                })
              }
            >
              <Image
                style={{ width: 130, height: 110, borderRadius: 10 }}
                source={
                  item._doc.image
                    ? { uri: item._doc.image }
                    : require("../../assets/imgs/Quinkpost.jpg")
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const renderNoMoreCards = () => {
    return (
      <View title="All Done!">
        <Button backgroundColor="#03A9F4" title="No more recommendations!" />
      </View>
    );
  };

  const onLike = async () => {
    try {
      if (liked) {
        const result = await axios.patch(`${BACKEND}/like/dislike`, {
          userId: globalUser._id,
          postId: data._id,
        });
        if (result.data.success) {
          setLiked(false);
        }
      } else {
        const result = await axios.patch(`${BACKEND}/like`, {
          userId: globalUser._id,
          postId: data._id,
        });
        if (result.data.success) {
          setLiked(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSocialShare = async () => {
    try {
      const userNameString = `${data?.author?.userName}`.replace(" ", "-");
      const userNameString2 = userNameString.replace(" ", "-");
      const userNameString3 = userNameString2.replace(" ", "-");
      const userNameString4 = userNameString3.replace(" ", "-");
      const titleString = `${data?.title}`.replace(" ", "-");
      const titleString3 = titleString.replace(" ", "-");
      const titleString4 = titleString3.replace(" ", "-");
      const titleString5 = titleString4.replace(" ", "-");
      const titleString6 = titleString5.replace(" ", "-");
      const titleString7 = titleString6.replace(" ", "-");
      const titleString8 = titleString7.replace(" ", "-");
      const titleString9 = titleString8.replace(" ", "-");
      const titleString11 = titleString9.replace(" ", "-");
      const titleString12 = titleString11.replace(" ", "-");
      const titleString13 = titleString12.replace(" ", "-");
      const titleString14 = titleString13.replace(" ", "-");
      const titleString15 = titleString14.replace(" ", "-");
      const titleString16 = titleString15.replace(" ", "-");
      const titleString17 = titleString16.replace(" ", "-");
      const titleString18 = titleString17.replace(" ", "-");
      const titleString19 = titleString18.replace(" ", "-");
      const titleString20 = titleString19.replace(" ", "-");
      const titleString21 = titleString20.replace(" ", "-");
      const titleString22 = titleString21.replace(" ", "-");
      const titleString23 = titleString22.replace(" ", "-");

      const str =
        `https://www.quinkpost.com/user/${userNameString4}/${titleString13}/${data?._id}`.trim();
      // const str2 = encodeURIComponent(str)
      //  const
      // const linkString1 = str.replace("", "%20");
      // const linkString2 = linkString1.replace(" ", "%20");
      // const linkString3 = linkString2.replace("  ", "%20");
      // console.log(linkString)
      const result = await Share.share({
        message: `Please have a look at the shared content named ${data?.title}  - ${str}. Quink Post is an infotainment platform with content creation.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onSave = async () => {
    try {
      console.log("save called");
      if (saved) {
        const result = await axios.patch(`${BACKEND}/save/unsave`, {
          userId: globalUser._id,
          postId: data._id,
        });
        if (result.data.success) {
          // console.lgo(result.data)
          await AsyncStorage.setItem(
            "quinkUser",
            JSON.stringify(result.data.user)
          );
          const getToggleProfile = JSON.parse(
            await AsyncStorage.getItem("toggleProfileScreen")
          );
          await AsyncStorage.setItem(
            "toggleProfileScreen",
            JSON.stringify(!getToggleProfile)
          );
          // dispatch({ type: ACTION.USER_LOGGED_IN, payload: result.data.user });
          setSaved(false);
        }
      } else {
        const result = await axios.patch(`${BACKEND}/save`, {
          userId: globalUser._id,
          postId: data._id,
        });

        if (result.data.success) {
          // console.log(result.data.user)

          await AsyncStorage.setItem(
            "quinkUser",
            JSON.stringify(result.data.user)
          );
          const getToggleProfile = JSON.parse(
            await AsyncStorage.getItem("toggleProfileScreen")
          );
          await AsyncStorage.setItem(
            "toggleProfileScreen",
            JSON.stringify(!getToggleProfile)
          );
          // dispatch({ type: ACTION.USER_LOGGED_IN, payload: result.data.user });
          setSaved(true);
        }
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handleCommentField = (val) => {
    setcommentText(val);
  };
  const openComment = () => {
    if (commentOpen === false) {
      setcommentOpen(true);
    } else {
      setcommentOpen(false);
    }
  };

  const checkIsUserLiked = (commentId) => {
    const value = likeComment[commentId].find((id) => id == globalUser._id);
    if (value) {
      return true;
    } else return false;
  };
  const likeThisComment = async (comment) => {
    try {
      // console.log(comment._id)
      if (checkIsUserLiked(comment._id)) {
        const result = await axios.patch(`${BACKEND}/comment/dislike`, {
          commentId: comment._id,
          userId: globalUser._id,
        });
        if (result.data.success) {
          setlikeComment((prev) => {
            return {
              ...prev,
              [comment._id]: prev[comment._id].filter(
                (id) => id != globalUser._id
              ),
            };
          });
        }
      } else {
        const result = await axios.patch(`${BACKEND}/comment/like`, {
          commentId: comment._id,
          userId: globalUser._id,
        });
        if (result.data.success) {
          setlikeComment((prev) => {
            return {
              ...prev,
              [comment._id]: [...prev[comment._id], globalUser._id],
            };
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendComment = async () => {
    console.log("set comment");
    try {
      const result = await axios.post(`${BACKEND}/comment`, {
        text: commentText,
        author: globalUser._id,
        post: data._id,
      });
      if (result.data.success) {
        console.log(result.data.comment);
        setcommentText(" ");
        setlikeComment((prev) => {
          return { ...prev, [result.data.comment._id]: [] };
        });
        setchangeStateOnSendComment(!changeStateOnSendComment);
      }
      // console.log(result.data)
    } catch (e) {
      console.log(e, "error while commenting");
    }
  };

  let body;
  if (commentOpen === false) {
    body = <View></View>;
  } else {
    body = (
      <>
        <View style={{ flex: 1 }}>
          {(() => {
            {
              /* console.log(data.comment) */
            }
            {
              /* return data.comment.map(comment => { */
            }
            return commentInPost.map((comment) => {
              const commentCreatedTime = comment.time;
              {
                console.log(comment, "this is muk");
              }
              return (
                <Card
                  style={styles.stats2}
                  title={comment?.author?.userName}
                  caption={comment.text}
                  avatar={comment?.author?.avatar}
                  captionColor="#666666"
                  location={
                    <Block row right>
                      <Block
                        row
                        middle
                        style={{
                          position: "absolute",
                          top: -theme.SIZES.BASE * 1.3,
                          right: 5,
                        }}
                      >
                        <Icon2
                          name="time-outline"
                          family="font-awesome"
                          color={theme.COLORS.BLACK}
                          size={theme.SIZES.FONT * 0.875}
                        />
                        <Text
                          p
                          color={theme.COLORS.BLACK}
                          size={theme.SIZES.FONT * 0.875}
                          style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                        >
                          {`${getTimeToShow(commentCreatedTime)?.time} ${
                            getTimeToShow(commentCreatedTime)?.value
                          } ago`}
                        </Text>
                      </Block>
                    </Block>
                  }
                >
                  <Block
                    style={{
                      width: "67%",
                      alignSelf: "center",
                      flexDirection: "row",
                      marginBottom: 12,
                    }}
                  >
                    <TouchableOpacity>
                      <Icon2
                        name={
                          checkIsUserLiked(comment._id) === true
                            ? "heart"
                            : "heart-outline"
                        }
                        color={
                          checkIsUserLiked(comment._id) === true
                            ? "red"
                            : "#044244"
                        }
                        size={20}
                        style={{ marginLeft: 8, color: "#000" }}
                        onPress={() => {
                          likeThisComment(comment);
                        }}
                      />
                    </TouchableOpacity>
                    {/* <Text>{comment.likedBy.length}</Text> */}
                    <Icon2
                      name="arrow-forward-circle-outline"
                      size={20}
                      style={{ marginLeft: 8, color: "#000" }}
                    />
                  </Block>
                </Card>
              );
            });
          })()}
        </View>
        <View style={styles.container2}>
          <Icon2 name="attach-outline" color="#FFF" size={20} />
          <TextInput
            placeholder="Some text"
            style={styles.input}
            value={commentText}
            onChangeText={(val) => {
              handleCommentField(val);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              sendComment();
            }}
          >
            <Icon2 name="ios-send" color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <Block>
          <StatusBar barStyle="light-content" backgroundColor="#3d538a" />
          <LinearGradient colors={["#283c86", "#667db6", "#a8c0ff"]}>
            <Text
              style={{
                alignSelf: "center",
                color: "lightgrey",
                fontWeight: "bold",
                fontSize: 21,
                backgroundColor: "#3d538a",
                paddingHorizontal: width / 2.82,
                paddingVertical: 5,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                borderColor: "#536eb0",
                borderBottomWidth: 0.4,
                borderLeftWidth: 0.4,
                borderRightWidth: 0.4,
              }}
            >
              Quink Post
            </Text>
            <Image
              source={(() => {
                if (backImage) {
                  return { uri: backImage };
                } else {
                  return bgImage;
                }
              })()}
              resizeMode={backImage ? "contain" : "center"}
              style={{
                width: width,
                height: height * 0.48,
                // marginTop: -15,
                marginTop: 10,
                marginBottom: 35,
              }}
            />
          </LinearGradient>
          <Block center style={{ marginTop: -theme.SIZES.BASE * 1.5 }}>
            <Block flex style={styles.header}>
              <Block>
                <Text size={theme.SIZES.BASE * 1.575}>{data?.title}</Text>
              </Block>

              <Block center>
                <Card
                  borderless
                  style={styles.stats}
                  title={data?.author?.userName}
                  caption={`${getTimeToShow(postCreatedOn)?.time} ${
                    getTimeToShow(postCreatedOn)?.value
                  } ago`}
                  avatar={
                    data?.author?.avatar
                      ? data?.author?.avatar
                      : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar"
                  }
                  location={
                    <Block row right>
                      <Block
                        row
                        middle
                        style={{ marginHorizontal: theme.SIZES.BASE }}
                      >
                        <Icon2
                          name="pencil-outline"
                          family="font-awesome"
                          color={theme.COLORS.MUTED}
                          size={theme.SIZES.FONT * 0.875}
                        />
                        <Text
                          p
                          color={theme.COLORS.MUTED}
                          size={theme.SIZES.FONT * 0.875}
                          style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                        >
                          {data?.author?.post?.length}
                        </Text>
                      </Block>
                      <Block row middle>
                        <Icon2
                          name="ribbon-outline"
                          family="font-awesome"
                          color={theme.COLORS.MUTED}
                          size={theme.SIZES.FONT * 0.875}
                        />
                        <Text
                          color={theme.COLORS.MUTED}
                          size={theme.SIZES.FONT * 0.875}
                          style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                        >
                          {data?.author?.followers?.length}
                        </Text>
                      </Block>
                    </Block>
                  }
                />
              </Block>
              <ScrollView>
                <HTML
                  source={{ html: htmlContent == "null" ? " " : htmlContent }}
                  contentWidth={contentWidth}
                />
                <View
                  style={{
                    width: "100%",
                    borderTopColor: "lightgrey",
                    borderTopWidth: 1.3,
                    marginVertical: 10,
                  }}
                ></View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <TouchableOpacity onPress={onLike}>
                    <Icon2
                      name={liked === true ? "heart" : "heart-outline"}
                      color={liked === true ? "red" : "#044244"}
                      size={24}
                      style={{ marginHorizontal: 4 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlignVertical: "center" }}>
                    {totalLikedPost}
                  </Text>
                  {/* <Text style={{ textAlignVertical: "center" }}>{backData.likedBy.length}</Text> */}
                  {/* {(() => { if (backData) { console.log(backData.likedBy.length) } else { return console.log("0") } })()} */}
                  <TouchableOpacity onPress={openComment}>
                    <Icon2
                      name="chatbubbles-outline"
                      size={24}
                      style={{ marginHorizontal: 6 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlignVertical: "center" }}>
                    {totalComment}
                  </Text>
                  <TouchableOpacity
                    onPress={onSocialShare}
                    style={{ marginHorizontal: 4, marginLeft: "auto" }}
                  >
                    <Icon2 name="share-social-outline" size={24} />
                  </TouchableOpacity>
                  <Icon2
                    name={saved === true ? "save-sharp" : "save-outline"}
                    color="black"
                    style={{
                      marginHorizontal: 4,
                    }}
                    onPress={onSave}
                    size={24}
                  />
                </View>
                {body}
                <View style={{ paddingBottom: 150 }}>
                  <Text
                    style={{
                      marginVertical: 30,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Recommended Quinks
                  </Text>
                  <View>
                    <Deck
                      data={suggestion}
                      renderCard={renderCard}
                      renderNoMoreCards={renderNoMoreCards}
                    />
                  </View>
                </View>
                {/* </View> */}
              </ScrollView>
            </Block>
          </Block>
        </Block>
      </ScrollView>
      <AdMobBanner
        style={{
          width: width,
          shadowOffset: { width: 5, height: 5 },
          borderRadius: 5,
          alignSelf: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 1,
          marginBottom: 1,
        }}
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-8495080377148498/4833459781" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={() => console.log("error")}
      />
      {/* <FacebookAds.BannerAd
        style={{
          width: width,
          shadowOffset: { width: 5, height: 5 },
          borderRadius: 5,
          alignSelf: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 1,
          marginBottom: 1,
        }}
        placementId="165998855498155_165999815498059"
        type="standard"
        onPress={() => console.log("click")}
        onError={(error) => console.log("error", error)}
      /> */}
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
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  cardContainer: {
    height: 150,
    width: width / 1.14,
    // alignSelf: "center",
    backgroundColor: "#6A706E",
    borderRadius: 30,
  },
  card: {
    height: 150,
    width: width / 1.95,
    paddingTop: 20,
    paddingHorizontal: 25,
    backgroundColor: "#2b3240",
    borderRadius: 30,
    flexDirection: "row",
  },
  title2: {
    color: "#fff",
    // width: 100,
    fontSize: 13,
    fontWeight: "bold",
  },
  number: {
    color: "#fff",
    // width: 100,
    fontSize: 17,
    fontWeight: "bold",
    marginTop: -10,
  },
  textCovid: {
    transform: [{ rotate: "-90deg" }],
    color: "#3a4b4f",
    fontSize: 14,
    width: 90,
    marginLeft: -35,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
    color: "#fff",
    paddingHorizontal: 10,
    flex: 1,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: "absolute",
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 3,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  stats2: {
    borderWidth: 1,
    borderColor: "lightblue",
    backgroundColor: "#ededed",
    width: width - theme.SIZES.BASE * 3,
    marginTop: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: "center",
    paddingLeft: theme.SIZES.BASE / 2,
  },
  middle: {
    justifyContent: "center",
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
});

export default ContentDetailScreen;
