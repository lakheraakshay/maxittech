import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Ionicons";
import BACKEND from "../constants/BACKEND";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import HTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

const OriginalDetailScreen = (props) => {
  // console.log(props.route.params)
  const [globalState, setglobalState] = useState();
  useEffect(() => {
    (async () => {
      const usre = await AsyncStorage.getItem("quinkUser");
      setglobalState(JSON.parse(usre));
    })();
  }, []);

  const data = props.route.params.data;
  const [isPostSaved, setisPostSaved] = useState(false);

  const htmlContent = `${data?.body}`;
  const contentWidth = useWindowDimensions().width;

  // console.log(data._id)
  useEffect(() => {
    {
      (async () => {
        try {
          const result = await axios.post(`${BACKEND}/save/checkIsSaved`, {
            userId: globalState._id,
            postId: data._id,
          });
          // console.log(result.data.success)
          if (result.data.success) {
            setisPostSaved(true);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);
  const saveThis = async () => {
    try {
      if (isPostSaved) {
        const result = await axios.patch(`${BACKEND}/save/unsave`, {
          userId: globalState._id,
          postId: data._id,
        });
        setisPostSaved(false);
        console.log("unsaved");
      } else {
        const result = await axios.patch(`${BACKEND}/save`, {
          userId: globalState._id,
          postId: data._id,
        });
        setisPostSaved(true);
        console.log("saved");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(data)
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" backgroundColor={"#283c86"} />
      <ScrollView stickyHeaderIndices={[0]}>
        <View>
          <LinearGradient
            colors={["#283c86", "#667db6", "#a8c0ff"]}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 9,
              paddingHorizontal: 20,
            }}
          >
            <View style={{ width: "10%" }}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon name="arrow-back-sharp" color={"#fff"} size={26} />
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
                    fontSize: 18,
                    color: "#f2f2f2",
                  }}
                >
                  ORIGINALS
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "10%",
              }}
            >
              <Icon name="heart" color="#f2f2f2" size={26} />
            </View>
          </LinearGradient>
        </View>
        <View style={{ marginTop: 20 }}>
          <Image
            // source={require("../../assets/imgs/5.png")}
            source={{ uri: data.image }}
            style={{
              height: 300,
              width: width - 20,
              alignSelf: "center",
              borderRadius: 20,
            }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginHorizontal: 2,
            marginTop: 20,
          }}
        >
          <LinearGradient
            colors={["#C9D6FF", "#bfe9ff", "#E2E2E2"]}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#999999",
              elevation: 4,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 2,
              borderBottomRightRadius: 2,
            }}
          >
            <Text
              style={{ fontSize: 16, color: "#525252", fontWeight: "bold" }}
            >
              {data.title}
            </Text>
          </LinearGradient>
        </View>
        <View
          style={{
            borderColor: "black",
            borderWidth: 0.2,
            marginTop: 20,
            width: "95%",
            alignSelf: "center",
          }}
        />

        {/* <Text
          style={{
            color: "#777777",
            fontSize: 15,
            marginTop: 15,
            marginHorizontal: 20,
            marginBottom: 90,
            textAlign: "justify",
            fontFamily: "Montserrat_400Regular",
          }}
        > */}
        <View style={{marginHorizontal: 15}}>
          <HTML
            source={{ html: htmlContent == "null" ? " " : htmlContent }}
            contentWidth={contentWidth}
          />
        </View>
        {/* </Text> */}
      </ScrollView>
      <View
        style={{
          right: 20,
          position: "absolute",
          backgroundColor: "#000",
          height: 50,
          width: 50,
          bottom: 20,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: 25,
        }}
      >
        <TouchableOpacity onPress={saveThis}>
          <Icon
            name={isPostSaved ? "save-outline" : "save"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OriginalDetailScreen;
