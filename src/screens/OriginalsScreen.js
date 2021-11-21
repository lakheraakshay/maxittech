import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Couches from "../components/Couches";

import HorizontalCards from "../components/HorizontalCards";
const { width, height } = Dimensions.get("screen");

import TextInCard from "../components/TextInCard";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/Ionicons";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
import { StatusBar } from "react-native";
import Poster from "../components/Poster";
import Scholar from "../components/Scholar";

export default function OriginalsScreen(props) {
  const [Aritcle, setAritcle] = useState([]);
  const [loading, setloading] = useState(true);

  const [Transcribed, setTranscribed] = useState([]);
  const [Podcast, setPodcast] = useState([]);
  const [Current, setCurrent] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND}/admin`);
        result.data.adminPost.map((post) => {
          if (post.type == "ARTICLE") {
            setAritcle((prev) => {
              return [...prev, post];
            });
          }
          if (post.type == "PODCAST") {
            setPodcast((prev) => {
              return [...prev, post];
            });
          }
          if (post.type == "TRANSCRIBED") {
            setTranscribed((prev) => {
              return [...prev, post];
            });
          }
          if (post.type == "CURRENT") {
            setCurrent((prev) => {
              return [...prev, post];
            });
          }
        });
        setloading(false);
        // setadminPost(result.data.adminPost)
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      {(() => {
        return (
          <>
            <StatusBar barStyle="light-content" backgroundColor={"#283c86"} />
            <ScrollView stickyHeaderIndices={[0]}>
              <View
                style={{
                  backgroundColor: "#FFF",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#283c86",
                    height: 80,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      color: "#FFF",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Quink Post Originals
                  </Text>
                </View>
                <LinearGradient
                  colors={["#283c86", "#667db6", "#a8c0ff"]}
                  style={{
                    left: 0,
                    right: 0,
                    height: 80,
                    marginTop: -45,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FFF",
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      marginHorizontal: 20,
                      borderRadius: 15,
                      marginTop: 19,
                      flexDirection: "row",
                      // justifyContent: "space-evenly",
                      alignItems: "center",
                      // alignSelf: "flex-end"
                    }}
                  >
                    <TextInput
                      placeholder="Search"
                      placeholderTextColor="#667db6"
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        width: 260,
                      }}
                    />
                    <View style={{ marginLeft: "auto" }}>
                      <Icon
                        name="search-outline"
                        // style={{ alignSelf: "flex-end" }}
                        size={20}
                        color={"#a8c0ff"}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* <SwipeableCarousel current={Current}/> */}

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                  alignItems: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#4f4a4a",
                    fontSize: 20,
                  }}
                >
                  Quink Post
                </Text>
                <View
                  style={{
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                    marginHorizontal: 7,
                    backgroundColor: "#4f4a4a",
                  }}
                ></View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#000",
                  }}
                >
                  Magazine
                </Text>
              </View>

              <ScrollView
                style={{ marginHorizontal: 7, marginTop: 22 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity>
                  <Poster navigation={props?.navigation} />
                </TouchableOpacity>
              </ScrollView>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                  alignItems: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#4f4a4a",
                    fontSize: 20,
                  }}
                >
                  Quink Post
                </Text>
                <View
                  style={{
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                    marginHorizontal: 7,
                    backgroundColor: "#4f4a4a",
                  }}
                ></View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#000",
                  }}
                >
                  Scholar
                </Text>
              </View>

              <ScrollView
                style={{ marginHorizontal: 7, marginTop: 15 }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity>
                  <Scholar navigation={props?.navigation} />
                </TouchableOpacity>
              </ScrollView>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0,
                  alignItems: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#4f4a4a",
                    fontSize: 20,
                  }}
                >
                  Quink Post
                </Text>
                <View
                  style={{
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                    marginHorizontal: 7,
                    backgroundColor: "#4f4a4a",
                  }}
                ></View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#000",
                  }}
                >
                  Articles
                </Text>
              </View>

              {loading ? (
                <View
                  style={{
                    // backgroundColor: "#fff",
                    height: height / 3.8,
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={55} color="#667db6" />
                </View>
              ) : (
                <ScrollView
                  style={{ marginHorizontal: 7 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {(() => {
                    return Aritcle.map((post) => {
                      {
                        /* console.log(post.title,"athidarticle") */
                      }
                      return (
                        <Couches
                          src={post?.image}
                          name={post?.title}
                          body={post?.body}
                          caption={post?.caption}
                          data={post}
                          navigation={props?.navigation}
                        />
                      );
                    });
                  })()}

                  {/* <Couches
            src={require("../../assets/imgs/couch.png")}
            name="Autobe Best Chair"
            navigation={props.navigation}
          />

          <Couches
            src={require("../../assets/imgs/couch.png")}
            name="Beautiful Couches"
            navigation={props.navigation}
          /> */}
                </ScrollView>
              )}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                  marginBottom: 10,
                  alignItems: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#4f4a4a",
                    fontSize: 20,
                  }}
                >
                  Quink Post
                </Text>

                <View
                  style={{
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                    marginHorizontal: 7,
                    backgroundColor: "#4f4a4a",
                  }}
                ></View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#000",
                  }}
                >
                  Transcribed Interviews
                </Text>
              </View>

              {loading ? (
                <View
                  style={{
                    // backgroundColor: "#fff",
                    height: height / 3.8,
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={55} color="#667db6" />
                </View>
              ) : (
                <ScrollView
                  style={{ marginHorizontal: 4 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {(() => {
                    return Transcribed.map((post) => {
                      {
                        /* console.log(post) */
                      }
                      return (
                        <HorizontalCards
                          data={post}
                          navigation={props.navigation}
                        />
                      );
                    });
                  })()}
                </ScrollView>
              )}

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                  alignItems: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#4f4a4a",
                    fontSize: 20,
                  }}
                >
                  Quink Post
                </Text>
                <View
                  style={{
                    height: 5,
                    width: 5,
                    borderRadius: 5,
                    marginHorizontal: 7,
                    backgroundColor: "#4f4a4a",
                  }}
                ></View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "#000",
                  }}
                >
                  Written Podcast
                </Text>
              </View>

              {loading ? (
                <View
                  style={{
                    // backgroundColor: "#fff",
                    height: height / 3.8,
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={55} color="#667db6" />
                </View>
              ) : (
                <ScrollView
                  style={{ marginHorizontal: 2 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {(() => {
                    return Podcast.map((post) => {
                      console.log(post);
                      return (
                        <TextInCard data={post} navigation={props.navigation} />
                      );
                    });
                  })()}
                  {/* <TextInCard />
          <TextInCard /> */}
                </ScrollView>
              )}
            </ScrollView>
          </>
        );
      })()}
    </>
  );
}
