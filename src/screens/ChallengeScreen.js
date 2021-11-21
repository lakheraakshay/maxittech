// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   ActivityIndicator,
//   Dimensions,
//   ToastAndroid,
//   Platform,
//   AlertIOS,
//   Share,
//   ImageBackground,
// } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
// import Feather from "@expo/vector-icons/Feather";
// import { LinearGradient } from "expo-linear-gradient";
// import axios from "axios";
// import BACKEND from "../constants/BACKEND";

// const { width, height } = Dimensions.get("screen");

// function ChallengeScreen(props) {
//   const [challenge, setchallenge] = useState([]);
//   const [loading, setloading] = useState(true);
//   const [user, setuser] = useState();

//   useEffect(() => {
//     (async () => {
//       try {
//         console.log("useEffect called in profile screen");
//         const data = await AsyncStorage.getItem("quinkUser");

//         // console.log(JSON.parse(data))
//         // user=await JSON.parse(data)
//         setuser(await JSON.parse(data));
//       } catch (e) {
//         console.log(e);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       try {
//         const result = await axios.get(`${BACKEND}/challenge/all`);
//         setchallenge(result.data.challenge);
//         setloading(false);
//         // console.log("these are challenge,????????????", challenge)
//       } catch (e) {
//         console.log(e);
//       }
//     })();
//   }, []);

//   const notifyMessage = () => {
//     if (Platform.OS === "android") {
//       ToastAndroid.showWithGravity(
//         "Challenges can be created after 2000 followers.",
//         ToastAndroid.SHORT,
//         ToastAndroid.CENTER
//       );
//     } else {
//       AlertIOS.alert("Challenges can be created after 2000 followers.");
//     }
//   };

//   const onChallengeShare = async () => {
//     try {
//       const result = await Share.share({
//         message: `${user?.userName} is inviting you to participate in ongoing challenges. - https://www.quinkpost.com/challenges. Quink Post is an infotainment platform with content creation.`,
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <>
//       <SafeAreaView style={{ flex: 1 }}>
//         <StatusBar backgroundColor={"#283c86"} barStyle="light-content" />
//         <LinearGradient
//           colors={["#283c86", "#667db6", "#a8c0ff"]}
//           style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
//         >
//           <View style={{ flexDirection: "row" }}>
//             <Text
//               style={{
//                 fontSize: 25,
//                 fontWeight: "bold",
//                 margin: 10,
//                 marginHorizontal: 25,
//                 color: "#f0f0f0",
//               }}
//             >
//               Challenges
//             </Text>
//             <Feather
//               style={{
//                 marginLeft: "auto",
//                 alignSelf: "center",
//                 marginHorizontal: 15,
//               }}
//               name="plus"
//               color={"#f0f0f0"}
//               onPress={notifyMessage}
//               size={24}
//             />
//           </View>
//           <Text
//             style={{
//               borderColor: "lightgrey",
//               borderBottomRightRadius: 25,
//               borderBottomWidth: 3,
//               paddingVertical: 5,
//               borderTopWidth: 3,
//               borderBottomLeftRadius: 25,
//               margin: 7,
//               color: "lightgrey",
//               fontWeight: "bold",
//               textAlign: "center",
//             }}
//           >
//             Participate and win cash prizes, gadgets and what not
//           </Text>
//         </LinearGradient>
//         {(() => {
//           if (!loading) {
//             return (
//               <>
//                 <FlatList
//                   numColumns="1"
//                   data={challenge}
//                   renderItem={({ item }) => {
//                     // startTime = item?.duration?.start;
//                     // endTime = item?.duration?.end;
//                     // duration = {
//                     //   start: {
//                     //     date: new Date(startTime).getDate(),
//                     //     month: new Date(startTime).getMonth() + 1,
//                     //     year: new Date(startTime).getFullYear(),
//                     //   },
//                     //   end: {
//                     //     date: new Date(endTime).getDate(),
//                     //     month: new Date(endTime).getMonth() + 1,
//                     //     year: new Date(endTime).getYear(),
//                     //   },
//                     // };
//                     return (
//                       <View
//                         style={{ paddingVertical: 20, paddingHorizontal: 16 }}
//                       >
//                         <TouchableOpacity>
//                           <ImageBackground
//                             // colors={["#C9D6FF", "#E2E2E2"]}
//                             source={{uri: item?.image}}
//                             style={{ borderRadius: 15 }}
//                           >
//                             <View
//                               style={{
//                                 display: "flex",
//                                 flexDirection: "row",
//                                 justifyContent: "space-evenly",
//                                 width: width / 1.1,
//                                 height: height / 1.4,
//                                 // flexDirection: "row"
//                               }}
//                             >
//                               <TouchableOpacity
//                                 onPress={onChallengeShare}
//                                 style={styles.imageText2}
//                               >
//                                 {/* <Text style={styles.imageText}>{item.title}</Text> */}
//                                 <Text
//                                   style={{
//                                     fontWeight: "bold",
//                                     color: "#fff",
//                                     fontSize: 14,
//                                   }}
//                                 >
//                                   Share
//                                 </Text>
//                               </TouchableOpacity>
//                               <TouchableOpacity
//                                 onPress={() =>
//                                   props.navigation.navigate(
//                                     "SendPostChallenge",
//                                     {
//                                       challengeItem: item,
//                                     }
//                                   )
//                                 }
//                                 style={styles.imageText}
//                               >
//                                 {/* <Text style={styles.imageText}>{item.title}</Text> */}
//                                 <Text
//                                   style={{
//                                     fontWeight: "bold",
//                                     color: "#fff",
//                                     fontSize: 14,
//                                   }}
//                                 >
//                                   Participate
//                                 </Text>
//                               </TouchableOpacity>
//                               {/* <Text
//                                 style={{
//                                   textAlign: "center",
//                                   marginVertical: 15,
//                                   fontSize: 15,
//                                   fontWeight: "bold",
//                                   color: "grey",
//                                   height: 39,
//                                   marginHorizontal: 5,
//                                 }}
//                               >
//                                 {item?.description}
//                               </Text>
//                               <LinearGradient colors={["#ffffff", "#CFDEF3"]}>
//                                 <Text
//                                   style={{
//                                     color: "#000",
//                                     fontSize: 13,
//                                     textAlign: "center",
//                                     paddingVertical: 15,
//                                   }}
//                                 >
//                                   Participate and win promotion through our
//                                   social media handles, fiscal incentives, paid
//                                   freelancing
//                                 </Text>
//                               </LinearGradient>
//                               <Text
//                                 style={{
//                                   color: "#fff",
//                                   fontSize: 14,
//                                   textAlign: "center",
//                                   marginTop: 15,
//                                   fontWeight: "bold",
//                                   color: "grey",
//                                   height: 20,
//                                 }}
//                               >
//                                 Deadline - 15/05/2021
//                               </Text> */}
//                             </View>
//                           </ImageBackground>
//                         </TouchableOpacity>
//                       </View>
//                     );
//                   }}
//                 />
//               </>
//             );
//           } else {
//             return (
//               <>
//                 <View
//                   style={{
//                     backgroundColor: "#fff",
//                     height: height / 1.3,
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ActivityIndicator size={55} color="#667db6" />
//                 </View>
//               </>
//             );
//           }
//         })()}
//       </SafeAreaView>
//     </>
//   );
// }

// export default ChallengeScreen;

// const styles = StyleSheet.create({
//   imageOverlay: {
//     width: 150,
//     height: 250,
//     marginRight: 8,
//     borderRadius: 10,
//     position: "absolute",
//     backgroundColor: "#000",
//     opacity: 0.5,
//   },
//   imageLocationIcon: {
//     position: "absolute",
//     marginTop: 4,
//     left: 15,
//     bottom: 15,
//   },
//   imageText: {
//     backgroundColor: "grey",
//     paddingHorizontal: 4,
//     fontWeight: "bold",
//     borderRadius: 5,
//     // position: "absolute",
//     color: "#fff",
//     marginTop: "auto",
//     elevation: 25,
//     fontSize: 14,
//     bottom: 15,
//     alignSelf: "center",
//   },
//   imageText2: {
//     backgroundColor: "grey",
//     paddingHorizontal: 4,
//     fontWeight: "bold",
//     borderRadius: 5,
//     elevation: 25,
//     color: "#fff",
//     marginTop: "auto",
//     fontSize: 14,
//     bottom: 15,
//     alignSelf: "center",
//   },
// });

import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import { Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import BACKEND from "../constants/BACKEND";

const { width, height } = Dimensions.get("window");

const SLIDER_WIDTH = width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

function ChallengeScreen(props) {
  const [WeekChallenge, setWeekChallenge] = useState([]);
  const [MonthChallenge, setMonthChallenge] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BACKEND}/challenge/all`);
        console.log(data.challenge, "<<<<<");
        setWeekChallenge(data.challenge.filter((ch) => ch.label === "WEEKLY"));
        setMonthChallenge(
          data.challenge.filter((ch) => ch.label === "MONTHLY")
        );

        // setChallenge(data.challenge)
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const CarouselCardItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("ChallengeDetail", {
            item,
          })
        }
      >
        <View style={styles.container} key={index}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.header}>{item.title}</Text>
          <Text style={styles.body}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const isCarousel = React.useRef(null);

  return (
    <>
      <ScrollView stickyHeaderIndices={[0]}>
        <LinearGradient
          colors={["#283c86", "#667db6", "#a8c0ff"]}
          style={{
            elevation: 11,
          }}
        >
          <View>
            <Text
              style={{
                color: "#f0f0f0",
                fontWeight: "bold",
                fontSize: 25,
                fontFamily: "Montserrat_700Bold",
                marginTop: 15,
                marginBottom: 5,
                zIndex: 2,
                textAlign: "center",
              }}
            >
              Challenges
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Montserrat_400Regular",
                zIndex: 2,
                lineHeight: 25,
                color: "lightgrey",
                paddingHorizontal: 15,
                marginBottom: 7,
              }}
            >
              Participate and Win
            </Text>
          </View>
        </LinearGradient>
        {(() => {
          if (WeekChallenge.length > 0) {
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                  alignItems: "center",
                  paddingHorizontal: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#4f4a4a",
                    fontSize: 25,
                  }}
                >
                  Weekly
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
                    fontSize: 13,
                    color: "4f4a4a",
                  }}
                >
                  Challenges
                </Text>
              </View>
            );
          }
        })()}
        <View style={{ alignSelf: "center", marginBottom: 15 }}>
          <Carousel
            layout="default"
            ref={isCarousel}
            layoutCardOffset={12}
            data={WeekChallenge}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
        </View>
        {(() => {
          if (MonthChallenge.length > 0) {
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: "auto",
                  // backgroundColor: 'red',
                  alignItems: "center",
                  paddingHorizontal: 5,
                  marginLeft: 10,
                  marginBottom: 20
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#4f4a4a",
                    fontSize: 25,
                  }}
                >
                  Monthly
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
                    fontSize: 13,
                    color: "4f4a4a",
                  }}
                >
                  Challenges
                </Text>
              </View>
            );
          }
        })()}

        <View style={{ alignSelf: "center", marginBottom: "auto" }}>
          <Carousel
            layout="default"
            ref={isCarousel}
            layoutCardOffset={12}
            data={MonthChallenge}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
    resizeMode: "stretch"
  },
  header: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 7
  },
  body: {
    color: "#222",
    fontSize: 17,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ChallengeScreen;
