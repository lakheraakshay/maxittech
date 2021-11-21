import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

const { height, width } = Dimensions.get("screen");

function ChallengeDetail(props) {
  // console.log(props.route.params.item)
  const { title, description, participants, duration } =
    props.route.params.item;
  console.log(participants, "<<<<<<<<");
  const [PrizeModal, setPrizeModal] = useState(false);

  const togglePrizeModal = () => {
    setPrizeModal(!PrizeModal);
  };

  return (
    <>
      <LinearGradient
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingVertical: 10,
        }}
        colors={["#283c86", "#667db6", "#a8c0ff"]}
      >
        <Icon
          name="arrow-back-sharp"
          size={27}
          color={"#fff"}
          style={{ marginHorizontal: 7 }}
          onPress={() => props.navigation.goBack()}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 21,
            marginHorizontal: 25,
            color: "#fff",
          }}
        >
          {title}
        </Text>
      </LinearGradient>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={80}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={() => togglePrizeModal()}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 25,
                marginBottom: 10,
                elevation: 25,
                borderColor: "black",
                paddingVertical: 0.5,
                alignSelf: "center",
                paddingHorizontal: 35,
                borderWidth: 0.5,
                fontSize: 27,
                color: "black",
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            >
              Benefits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("SendPostChallenge", {
                challengeItem: props.route.params.item,
              })
            }
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 25,
                marginBottom: 10,
                elevation: 25,
                borderColor: "black",
                alignSelf: "center",
                paddingHorizontal: 15,
                borderWidth: 0.5,
                fontSize: 27,
                color: "black",
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            >
              Participate
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 15,
            marginTop: 26,
            fontSize: 27,
            color: "#fff",
            elevation: 10,
            paddingBottom: 10,
            paddingTop: 15,
            // borderBottomColor: 'red',
            // borderBottomWidth: 1,
            // borderTopColor: "red",
            // borderTopWidth: 1
          }}
        >
          Participants
        </Text>
        {(() => {
          if (!participants.length) {
            return (
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginVertical: 15,
                  fontSize: 30,
                  color: "white",
                }}
              >
                Be the first participant
              </Text>
            );
          } else {
            return (
              <FlatList
                data={participants}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{
                  padding: 20,
                  paddingTop: 32,
                }}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("UserProfileScreen", {
                          data: item,
                        });
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          padding: 12,
                          marginBottom: 10,
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          borderRadius: 12,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 10,
                          },
                          shadowOpacity: 0.3,
                          shadowRadius: 20,
                        }}
                      >
                        <Image
                          source={{
                            // uri: "https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                            uri: item.avatar,
                          }}
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: 70,
                            marginRight: 10,
                          }}
                        />
                        <View style={{ alignSelf: "center" }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "700",
                              marginTop: 0,
                              marginLeft: 15,
                            }}
                          >
                            {item.userName}
                          </Text>
                        </View>
                        <Icon
                          name="shield-checkmark-outline"
                          style={{
                            alignSelf: "center",
                            marginLeft: "auto",
                            marginRight: 15,
                          }}
                          size={25}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            );
          }
        })()}
      </View>
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackdropPress={togglePrizeModal}
        isVisible={PrizeModal}
        onBackButtonPress={togglePrizeModal}
      >
        <LinearGradient
          colors={["#667db6", "#fff"]}
          style={{
            borderRadius: 20,
            justifyContent: "center",
            height: height / 4,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 19,
              color: "#000",
            }}
          >
            {description}
          </Text>
          {/* <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 15,
              fontSize: 19,
            }}
          >
            2nd Prize - Rs 25
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 15,
              fontSize: 19,
            }}
          >
            3rd Prize - Rs 25
          </Text> */}
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 15,
              fontSize: 19,
            }}
          >
            Participation Certificate for all
          </Text>
        </LinearGradient>
      </Modal>
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
    </>
  );
}

export default ChallengeDetail;
