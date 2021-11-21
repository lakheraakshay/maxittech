import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
import { LinearGradient } from "expo-linear-gradient";

function UserProfileFollowerScreen(props) {
  const globalState = props.route.params;
  const { navigation } = props.route.params
  // console.log(props.route.params, "<<<<<< Tn userprofile follower screen")
  // console.log(globalState)

  const [popularSelected, setpopularSelected] = useState(true);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const foll = await axios.get(
          `${BACKEND}/user/follwers/followings/${globalState.followerData}`
        );
        console.log(foll.data, "<<<<")
        if (foll.data.followers) {
          setfollowers(foll.data.followers)
          // setfollowers((prev) => {
          //   return [...prev, ...foll.data.followers];
          // });
        }
        if (foll.data.followings) {
          setfollowing(foll.data.followings)
          // setfollowing((prev) => {
          //   return [...prev, ...foll.data.followings];
          // });
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const onTabPressed = () => {
    setpopularSelected(!popularSelected);
  };

  const fetchfollow = () => {
    if (popularSelected == true) {
      return followers?.map((partner) => {
        console.log(partner?.avatar, "=================")
        return (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfileScreen", {
                data: partner
              })}>
              <Image
                // source={{ uri: require("../../assets/imgs/1.png") }}
                source={{ uri: partner?.avatar }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.username}>{partner?.userName}</Text>
              <Text style={styles.text}>
                {partner?.firstName ? partner?.firstName : "amila_cabello"}
              </Text>
            </View>
            {/* <Text style={styles.button}>View</Text> */}
            <Icon
              name="eye-sharp"
              style={styles.button}
              size={20}
              color="#525252"
            />
          </View>
        );
      });
    } else {
      return following?.map((partner) => {
        // console.log(partner?.avatar, "+++++++++++")
        return (

          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfileScreen", {
                data: partner
              })}>
              <Image
                // source={require("../../assets/imgs/1.png")}
                source={{ uri: partner?.avatar }}
                style={styles.image}
              />
            </TouchableOpacity>
            {/* <Text>hello</Text> */}
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.username}>{partner?.userName}</Text>
              <Text style={styles.text}>
                {partner?.firstName ? partner?.firstName : "amila_cabello"}
              </Text>
            </View>
            {/* <Text style={styles.button}>View</Text> */}
            <Icon
              name="eye-sharp"
              style={styles.button}
              size={20}
              color="#525252"
            />
          </View>
        );
      });
    }
  };

  const width = Dimensions.get("screen").width;

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#283c86", "#667db6", "#a8c0ff"]}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
          marginHorizontal: 0,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ width: "10%", paddingLeft: 15 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back-outline" color="#fff" size={26} />
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
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.1)",
                "rgba(255, 255, 255, 0.3)",
                "rgba(255, 255, 255, 0.5)",
              ]}
              style={{ padding: 2, borderRadius: 15, paddingHorizontal: 15 }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "white",
                }}
              >
                QUINK POST
              </Text>
            </LinearGradient>
          </View>
        </View>
        <View
          style={{
            width: "10%",
          }}
        >
          <Icon name="search-sharp" color={"#fff"} size={26} />
        </View>
      </LinearGradient>
      <View
        style={{
          backgroundColor: "#FFF",
          paddingHorizontal: width / 4,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={onTabPressed}
              style={{
                borderBottomColor: popularSelected ? "#667db6" : "#FFF",
                borderBottomWidth: 4,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: popularSelected ? "#667db6" : "#9ca1a2",
                }}
              >
                FOLLOWER
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onTabPressed}
              style={{
                borderBottomColor: popularSelected ? "#FFF" : "#667db6",
                borderBottomWidth: 4,
                paddingVertical: 6,
                marginLeft: 30,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: popularSelected ? "#9ca1a2" : "#667db6",
                }}
              >
                FOLLOWING
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {fetchfollow()}
    </ScrollView>
  );
}

export default UserProfileFollowerScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    alignItems: "center",
    marginTop: 20,
    borderColor: "lightgrey",
    paddingVertical: 5,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginHorizontal: 10,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 30,
  },
  text: {
    color: "grey",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
  },
  button: {
    marginLeft: "auto",
    // fontSize: 15,
    // color: "#d9d9d9",
    // borderColor: "grey",
    padding: 3,
    paddingHorizontal: 5,
    marginHorizontal: 6,
    textAlign: "center",
    textAlignVertical: "center",
    // borderWidth: 2,
    elevation: 15,
    borderRadius: 20,
    backgroundColor: "#cfcfcf",
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
  },
});
