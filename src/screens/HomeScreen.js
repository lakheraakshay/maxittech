import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Dimensions,
  LogBox,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@expo/vector-icons/Entypo";
import Icon2 from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import FeedCard from "../components/FeedCard";
import TextCard from "../components/TextCard";
// import ACTION from "../components/Action";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";

const { widht, height } = Dimensions.get("screen");

LogBox.ignoreAllLogs(); //Ignore all log notifications

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function HomeScreen(props) {
  // console.log(globalState)
  const [selectedType, setselectedType] = useState({
    FEED: true,
    STORY: false,
    MEME: false,
    ARTICLE: false,
    QUOTE: false,
    SHAYARI: false,
    POEM: false,
    ART: false,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [auromodal, setauromodal] = useState(false);
  const [showSearch, setshowSearch] = useState(null);
  const [searchText, setsearchText] = useState("");

  const [currState, setcurrState] = useState("FEED");
  const [Feed, setFeed] = useState([]);
  const [Meme, setMeme] = useState([]);
  const [Article, setArticle] = useState([]);
  const [Story, setStory] = useState([]);
  const [Shayari, setShayari] = useState([]);
  const [Quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Poem, setPoem] = useState([]);
  const [Art, setArt] = useState([]);
  const [getMorePostCounter, setGetMorePostCounter] = useState(1);

  useEffect(
    function () {
      try {
        console.log("useEffect called");
        (async () => {
          const userToken = await AsyncStorage.getItem("Quink-Post");
          console.log(userToken, "???????");
          if (userToken == "xyz" || userToken == null) {
            console.log("xyz", "<<<<<<");
            props.navigation.navigate("SplashScreen");
          } else {
            console.log("ok");
            const result = await axios.post(`${BACKEND}/user/key`, {
              token: userToken,
            });
            await AsyncStorage.setItem(
              "quinkUser",
              JSON.stringify(result.data.user)
            );

            if (showSearch == false || showSearch == null) {
              if (getMorePostCounter == 1) {
                setauromodal(false);
              }
              console.log("all post");
              const getData = async () => {
                const language = await AsyncStorage.getItem("language");
                console.log("language is >>>>>>>>>>>>>", language);
                const resp = await axios.get(
                  `${BACKEND}/post/NextTenPost/${language}/${getMorePostCounter}`
                );
                if (resp.data.success === true) {
                  setRefreshing(false);
                  setLoading(false);
                }
                const datad = await resp.data;

                setFeed([...Feed, ...datad.posts.reverse()]);
                setMeme([
                  ...Meme,
                  ...datad.posts.filter((post) => post.type == "MEME"),
                ]);
                setArticle([
                  ...Article,
                  ...datad.posts.filter((post) => post.type == "ARTICLE"),
                ]);
                setPoem([
                  ...Poem,
                  ...datad.posts.filter((post) => post.type == "POEM"),
                ]);
                setQuote([
                  ...Quote,
                  ...datad.posts.filter((post) => post.type == "QUOTE"),
                ]);
                setShayari([
                  ...Shayari,
                  ...datad.posts.filter((post) => post.type == "SHAYARI"),
                ]);
                setStory([
                  ...Story,
                  ...datad.posts.filter((post) => post.type == "STORY"),
                ]);
                setArt([
                  ...Art,
                  ...datad.posts.filter((post) => post.type == "ART"),
                ]);
                setLoading(false);
              };
              getData();
            } else {
              setauromodal(false);
              const getData = async () => {
                const posts = await axios.get(
                  `${BACKEND}/search/post/${searchText}`
                );
                console.log("search all post");

                setFeed(posts.data.reverse());

                setMeme(posts.data.filter((post) => post.type == "MEME"));
                setArticle(posts.data.filter((post) => post.type == "ARTICLE"));
                setPoem(posts.data.filter((post) => post.type == "POEM"));
                setQuote(posts.data.filter((post) => post.type == "QUOTE"));
                setShayari(posts.data.filter((post) => post.type == "SHAYARI"));
                setStory(posts.data.filter((post) => post.type == "STORY"));
                setArt(posts.data.filter((post) => post.type == "ART"));
                setLoading(false);
              };
              getData();
            }
          }
        })();
      } catch (e) {
        console.log(e);
      }
    },
    [showSearch, refreshing]
  );

  useEffect(() => {
    (async () => {
      const getNoti = await axios.get(
        `${BACKEND}/updateYesorNo`
      );
      setauromodal(getNoti)
    })();
  }, []);

  const getMorePost = async () => {
    try {
      setGetMorePostCounter(getMorePostCounter + 1);
      setRefreshing(true);

      // wait(2000).then(() => {
      //   setRefreshing(false);
      //   setLoading(false);
      // });
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = useCallback(() => {
    setGetMorePostCounter(1);
    setFeed([]);
    setMeme([]);
    setArticle([]);
    setStory([]);
    setShayari([]);
    setQuote([]);
    setPoem([]);
    setArt([]);
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      setLoading(false);
    });
  }, []);

  const searchThis = async () => {
    try {
      // console.log("herer")
      if (searchText != "") {
        console.log("Search");
        setshowSearch(true);
        setLoading(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const closeSearch = () => {
    setLoading(true);
    console.log("no search");
    setsearchText("");
    setshowSearch(false);
  };

  const toggleAuroModal = () => {
    setauromodal(false);
  };

  const onTabPressed = (pressedValue) => {
    // console.log("pressedValue", pressedValue)
    setcurrState(pressedValue);
    setselectedType((prev) => {
      return {
        FEED: false,
        STORY: false,
        MEME: false,
        ARTICLE: false,
        POEM: false,
        QUOTE: false,
        SHAYARI: false,
        ART: false,
      };
    });
    setselectedType((prev) => {
      return { ...prev, [pressedValue]: true };
    });
  };
  return (
    <>
      <StatusBar backgroundColor="#283c86" barStyle="light-content" />
      <LinearGradient colors={["#283c86", "#f2f2f2", "#667db6"]}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <View
            style={{
              height: 160,
              width: "100%",
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginTop: 25,
                marginBottom: 25,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "10%",
                  alignItems: "flex-start",
                }}
                onPress={() => props.navigation.navigate("ContentPostScreen")}
              >
                <Icon2 name="create-outline" size={27} color="#d2d2d2" />
              </TouchableOpacity>
              <View
                style={{
                  width: "80%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    color: "#FFF",
                    alignSelf: "center",
                  }}
                >
                  Quink Post
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: "10%",
                  alignItems: "flex-end",
                }}
                onPress={() => props.navigation.navigate("MessageScreen")}
              >
                <Icon2 name="ios-send-sharp" size={22} color="#d2d2d2" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                borderColor: "#fff",
                borderRadius: 20,
                borderWidth: 0.5,
                paddingVertical: 5,
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(value) => setsearchText(value)}
                placeholder="Search Here.."
                placeholderTextColor="#fff"
                value={searchText}
                style={{
                  paddingHorizontal: 20,
                  fontWeight: "normal",
                  fontSize: 11,
                  width: "90%",
                  color: "#2b2b2b",
                }}
              />
              {(() => {
                if (showSearch != true) {
                  return (
                    <Icon
                      name="magnifying-glass"
                      size={15}
                      color="#4d4d4d"
                      onPress={searchThis}
                    />
                  );
                } else {
                  return (
                    <Icon
                      name="cross"
                      size={15}
                      color="#4d4d4d"
                      onPress={closeSearch}
                    />
                  );
                }
              })()}
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#FFF",
              paddingHorizontal: 17,
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 15 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 10,
                  marginBottom: 0.15,
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    onTabPressed("FEED");
                  }}
                  style={{
                    borderBottomColor: selectedType.FEED ? "#667db6" : "#FFF",
                    borderBottomWidth: 4,
                    paddingVertical: 6,
                    paddingBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedType.FEED ? "#667db6" : "#9ca1a2",
                    }}
                  >
                    RECENT
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onTabPressed("MEME");
                  }}
                  style={{
                    borderBottomColor: selectedType.MEME ? "#667db6" : "#FFF",
                    borderBottomWidth: 4,
                    paddingVertical: 6,
                    marginLeft: 30,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedType.MEME ? "#667db6" : "#9ca1a2",
                    }}
                  >
                    MEME
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onTabPressed("ARTICLE");
                  }}
                  style={{
                    borderBottomColor: selectedType.ARTICLE
                      ? "#667db6"
                      : "#FFF",
                    borderBottomWidth: 4,
                    paddingVertical: 6,
                    marginLeft: 30,
                    // marginBottom: 0
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedType.ARTICLE ? "#667db6" : "#9ca1a2",
                    }}
                  >
                    ARTICLE
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onTabPressed("ART");
                  }}
                  style={{
                    borderBottomColor: selectedType.ART ? "#667db6" : "#FFF",
                    borderBottomWidth: 4,
                    paddingVertical: 6,
                    marginLeft: 30,
                    // marginBottom: -10
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedType.ART ? "#667db6" : "#9ca1a2",
                    }}
                  >
                    ART
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onTabPressed("STORY");
                  }}
                  style={{
                    borderBottomColor: selectedType.STORY ? "#667db6" : "#FFF",
                    borderBottomWidth: 4,
                    paddingVertical: 6,
                    marginLeft: 30,
                    // marginBottom: -10
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedType.STORY ? "#667db6" : "#9ca1a2",
                    }}
                  >
                    STORY
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onTabPressed("POEM");
                  }}
                  style={{
                    borderBottomColor: selectedType.POEM ? "#667db6" : "#FFF",
                    borderBottomWidth: 4,
                    paddingVertical: 6,
                    marginLeft: 30,
                    // marginBottom: 0
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedType.POEM ? "#667db6" : "#9ca1a2",
                    }}
                  >
                    POEM
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onTabPressed("SHAYARI");
                  }}
                  style={{
                    borderBottomColor: selectedType.SHAYARI
                      ? "#667db6"
                      : "#FFF",
                    borderBottomWidth: 4,
                    paddingVertical: 6,
                    marginLeft: 30,
                    // marginBottom: 0
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedType.SHAYARI ? "#667db6" : "#9ca1a2",
                    }}
                  >
                    SHAYARI
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onTabPressed("QUOTE");
                  }}
                  style={{
                    borderBottomColor: selectedType.QUOTE ? "#667db6" : "#FFF",
                    borderBottomWidth: 4,
                    paddingVertical: 6,
                    marginLeft: 30,
                    // marginBottom: 0
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selectedType.QUOTE ? "#667db6" : "#9ca1a2",
                    }}
                  >
                    QUOTE
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          {loading ? (
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
            <View>
              {(() => {
                switch (currState) {
                  case "FEED":
                    {
                      {
                        /* console.log("Feed this is") */
                      }

                      return Feed?.map((feed) => {
                        {
                          /* console.log(feed.type) */
                        }
                        if (feed?.type == "ARTICLE") {
                          if (feed?.image) {
                            return (
                              <FeedCard
                                data={feed}
                                cardText={
                                  "How Machine Learning can transform future?"
                                }
                                cardArticle={
                                  "Alpha Wave Incubation (AWI) is a $300 million, early-stage fund managed by Falcon Edge Capital. AWI is focused on seed, venture investing and early-stage business building across India and South-east Asia. Falcon Edge offers a variety of investment products that cover a number of asset classes, themes and geographies"
                                }
                                navigation={props?.navigation}
                              />
                            );
                          } else
                            return (
                              <TouchableOpacity
                                onPress={() =>
                                  props?.navigation?.navigate(
                                    "ContentDetailScreen",
                                    {
                                      data: feed,
                                      navigation: props?.navigation,
                                    }
                                  )
                                }
                              >
                                <TextCard
                                  data={feed}
                                  cardText={
                                    "How will coding boost the economy?"
                                  }
                                  navigation={props?.navigation}
                                />
                              </TouchableOpacity>
                            );
                        }
                        // else if (feed.type == "MEME") {
                        //   return (
                        //     <FeedCard
                        //       navigation={props.navigation}
                        //       data={feed}
                        //     />
                        //   );
                        // }
                        else if (
                          feed.type === "STORY" ||
                          // feed.type == "SHAYARI" ||
                          feed.type == "POEM"
                          // feed.type == "QUOTE"
                          // || feed.type == "MEME"
                        ) {
                          if (feed?.image) {
                            return (
                              <FeedCard
                                cardText={
                                  "How Machine Learning can transform future?"
                                }
                                cardArticle={
                                  "Alpha Wave Incubation (AWI) is a $300 million, early-stage fund managed by Falcon Edge Capital. AWI is focused on seed, venture investing and early-stage business building across India and South-east Asia. Falcon Edge offers a variety of investment products that cover a number of asset classes, themes and geographies"
                                }
                                data={feed}
                                navigation={props?.navigation}
                              />
                            );
                          } else
                            return (
                              <TouchableOpacity
                                onPress={() =>
                                  props?.navigation?.navigate(
                                    "ContentDetailScreen",
                                    {
                                      data: feed,
                                      navigation: props?.navigation,
                                    }
                                  )
                                }
                              >
                                <TextCard
                                  data={feed}
                                  cardText={
                                    "How will coding boost the economy?"
                                  }
                                  navigation={props?.navigation}
                                />
                              </TouchableOpacity>
                            );
                        }
                      });
                    }
                    break;
                  case "ARTICLE":
                    {
                      return Article?.map((article) => {
                        if (article?.image) {
                          return (
                            <FeedCard
                              data={article}
                              cardText={
                                "How Machine Learning can transform future?"
                              }
                              cardArticle={
                                "Alpha Wave Incubation (AWI) is a $300 million, early-stage fund managed by Falcon Edge Capital. AWI is focused on seed, venture investing and early-stage business building across India and South-east Asia. Falcon Edge offers a variety of investment products that cover a number of asset classes, themes and geographies"
                              }
                              navigation={props?.navigation}
                            />
                          );
                        } else
                          return (
                            <TextCard
                              cardText={"How will coding boost the economy?"}
                              data={article}
                              navigation={props?.navigation}
                            />
                          );
                      });
                    }
                    break;
                  case "MEME":
                    {
                      {
                        /* console.log("MEME is there") */
                      }
                      return Meme?.map((meme) => {
                        return (
                          <FeedCard navigation={props?.navigation} data={meme} />
                        );
                      });
                    }
                    break;

                  case "ART":
                    {
                      {
                        /* console.log("MEME is there") */
                      }
                      return Art.map((art) => {
                        return (
                          <FeedCard navigation={props?.navigation} data={art} />
                        );
                      });
                    }
                    break;

                  case "STORY":
                    {
                      {
                        /* console.log("STORY is there") */
                      }
                      return Story?.map((story) => {
                        if (story?.image) {
                          return (
                            <FeedCard
                              data={story}
                              cardText={
                                "How Machine Learning can transform future?"
                              }
                              cardArticle={
                                "Alpha Wave Incubation (AWI) is a $300 million, early-stage fund managed by Falcon Edge Capital. AWI is focused on seed, venture investing and early-stage business building across India and South-east Asia. Falcon Edge offers a variety of investment products that cover a number of asset classes, themes and geographies"
                              }
                              navigation={props?.navigation}
                            />
                          );
                        } else
                          return (
                            <View
                              style={{
                                paddingTop: 15,
                                backgroundColor: "#fff",
                              }}
                            >
                              <TextCard
                                cardText={"How will coding boost the economy?"}
                                data={story}
                                navigation={props?.navigation}
                              />
                            </View>
                          );
                      });
                    }
                    break;
                  case "POEM":
                    {
                      return Poem?.map((poem) => {
                        if (poem?.image) {
                          return (
                            <FeedCard
                              data={poem}
                              cardText={
                                "How Machine Learning can transform future?"
                              }
                              cardArticle={
                                "Alpha Wave Incubation (AWI) is a $300 million, early-stage fund managed by Falcon Edge Capital. AWI is focused on seed, venture investing and early-stage business building across India and South-east Asia. Falcon Edge offers a variety of investment products that cover a number of asset classes, themes and geographies"
                              }
                              navigation={props?.navigation}
                            />
                          );
                        } else
                          return (
                            <TextCard
                              cardText={"How will coding boost the economy?"}
                              data={poem}
                              navigation={props?.navigation}
                            />
                          );
                      });
                    }
                    break;
                  case "QUOTE":
                    {
                      return Quote?.map((quote) => {
                        if (quote?.image) {
                          return (
                            <FeedCard
                              data={quote}
                              cardText={
                                "How Machine Learning can transform future?"
                              }
                              cardArticle={
                                "Alpha Wave Incubation (AWI) is a $300 million, early-stage fund managed by Falcon Edge Capital. AWI is focused on seed, venture investing and early-stage business building across India and South-east Asia. Falcon Edge offers a variety of investment products that cover a number of asset classes, themes and geographies"
                              }
                              navigation={props?.navigation}
                            />
                          );
                        } else
                          return (
                            <TextCard
                              cardText={"How will coding boost the economy?"}
                              data={quote}
                              navigation={props?.navigation}
                            />
                          );
                      });
                    }
                    break;
                  case "SHAYARI":
                    {
                      return Shayari?.map((shayari) => {
                        if (shayari?.image) {
                          return (
                            <FeedCard
                              data={shayari}
                              cardText={
                                "How Machine Learning can transform future?"
                              }
                              cardArticle={
                                "Alpha Wave Incubation (AWI) is a $300 million, early-stage fund managed by Falcon Edge Capital. AWI is focused on seed, venture investing and early-stage business building across India and South-east Asia. Falcon Edge offers a variety of investment products that cover a number of asset classes, themes and geographies"
                              }
                              navigation={props?.navigation}
                            />
                          );
                        } else
                          return (
                            <TextCard
                              cardText={"How will coding boost the economy?"}
                              data={shayari}
                              navigation={props?.navigation}
                            />
                          );
                      });
                    }
                    break;
                }
              })()}
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  paddingTop: 7,
                  paddingBottom: 14,
                }}
              >
                <AntDesign
                  name="sync"
                  size={25}
                  color="black"
                  style={{ alignSelf: "center" }}
                  onPress={getMorePost}
                />
              </TouchableOpacity>
            </View>
          )}
          <Modal
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            style={{justifyContent: "flex-end"}}
            onBackdropPress={toggleAuroModal}
            isVisible={auromodal}
            onBackButtonPress={toggleAuroModal}
          >
            <LinearGradient
              colors={["#667db6", "#fff"]}
              style={{
                // backgroundColor: "#fff",
                borderRadius: 20,
                // height: height / 4,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  alignSelf: "center",
                  padding: 20,
                  marginTop: 10,
                }}
              >
                New Update Available on Play Store.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  toggleAuroModal();
                }}
                style
              >
                <LinearGradient
                  style={{
                    alignSelf: "center",
                    marginTop: 5,
                    borderRadius: 10,
                    marginBottom: 25,
                  }}
                  colors={["grey", "#fff"]}
                >
                  {/* <View> */}
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      paddingHorizontal: 7,
                    }}
                  >
                    Update Now
                  </Text>
                  {/* </View> */}
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Modal>
        </ScrollView>
      </LinearGradient>
    </>
  );
}
