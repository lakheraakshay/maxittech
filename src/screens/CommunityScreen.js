import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import CommunityCard from "../components/CommunityCard";
import BACKEND from "../constants/BACKEND";

const { width, height } = Dimensions.get("screen");

const CommunityScreen = (props) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        console.log("ok");
        const result = await axios.get(`${BACKEND}/community`);
        // console.log(result.data,"this is community data full")
        setdata(result.data);
        setloading(false);
        console.log(result.data, "this is data");
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    // <ScrollView stickyHeaderIndices={[0]}>
    <>
      {(() => {
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
                    Communities
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
                    An artist of considerable range
                  </Text>
                </View>
              </LinearGradient>
              {loading ? (
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: height / 1.3,
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={55} color="#667db6" />
                </View>
              ) : (
                <View style={{ alignSelf: "center", marginLeft: 15 }}>
                  {(() => {
                    return data.map((community) => {
                      {
                        /* console.log(community.question) */
                      }
                      return (
                        <CommunityCard
                          data={community}
                          src={community.image}
                          name={community.title}
                          navigation={props.navigation}
                        />
                      );
                    });
                  })()}

                  {/* <CommunityCard
          src={require("../../assets/imgs/couch.png")}
          name="Stocks Community"
          navigation={props.navigation}
        />

        <CommunityCard
          src={require("../../assets/imgs/couch.png")}
          name="Content Creation Community"
          navigation={props.navigation}
        /> */}
                </View>
              )}
            </ScrollView>
          </>
        );
      })()}
      {/* </ScrollView> */}
    </>
  );
};
export default CommunityScreen;
