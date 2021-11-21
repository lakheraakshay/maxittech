import React, { useState, useEffect } from "react";
import IonIcon from "@expo/vector-icons/Ionicons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import BACKEND from "../constants/BACKEND"
import AsyncStorage from "@react-native-async-storage/async-storage"

function CommunityQuestionaireDetail(props) {
  const [globalState, setglobalState] = useState()
  useEffect(() => {
    (async () => {
      const usre = await AsyncStorage.getItem("quinkUser")
      setglobalState(JSON.parse(usre))
    })()
  }, [])

  // console.log(props.route.params.data._id)
  const [input, setinput] = useState("")
  const [toggle, settoggle] = useState(true)
  const [answers, setanswers] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND}/community/inside/getAllAnswer/${props.route.params.data._id}`)
        // console.log(result.data.answers)
        setanswers(result.data.answers)
      } catch (e) { console.log(e) }
    })()
  }, [toggle])
  const sendAnswer = async () => {
    try {
      console.log("yes")
      if (input != "") {
        // console.log(input,"lll")
        const result = await axios.patch(`${BACKEND}/community/inside/answer`, {
          answer: input,
          user: globalState?._id,
          questionId: props.route.params.data._id
        })
        console.log(result.data, "kkkkkkkkkkkkkkkkkkk")
        if (result.data.success) {
          setinput("")
          settoggle(!toggle)
        }


      }
      else { console.log("enter your suggestion") }



    } catch (e) { console.log(e) }
  }
  const data = props.route.params.data
  console.log(data.answers);
  return (
    <>
      <ScrollView style={{ marginBottom: 70 }}>
        <View>
          <LinearGradient
            style={{
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}
            colors={["#283c86", "#667db6", "#a8c0ff"]}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                alignItems: "center",
                flexDirection: "row",
                marginLeft: 10,
              }}
            >
              <IonIcon
                name="arrow-back-sharp"
                onPress={() => props.navigation.goBack()}
                size={22}
                color="#fff"
              />
            </View>
          </LinearGradient>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 15,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {data?.question}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#908e8c",
                marginTop: 5,
              }}
            >
              {data?.user?.userName}
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  alignItems: "center",
                }}
              >
                <IonIcon name="heart-outline" size={18} color={"#000"} />
                <Text
                  style={{
                    fontSize: 16,
                    marginHorizontal: 5,
                    color: "grey",
                  }}
                >
                  {/* {data.answers.likedBy.length} */}
                </Text>
                {/* <IonIcon
                  name="heart-dislike-outline"
                  size={18}
                  color={"#000"}
                  style={{ marginLeft: 5 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginHorizontal: 5,
                    color: "grey",
                  }}
                >
                  7
                </Text> */}
              </View>
              <Text
                style={{
                  fontSize: 13,
                  color: "#908e8c",
                  fontWeight: "400",
                  alignSelf: "center",
                }}
              >
                {data?.answers?.length} Suggestion
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ lineHeight: 20, color: "#908e8c" }}>
                {data?.question}
              </Text>
            </View>
          </View>
        </View>
        {(() => {
          return answers?.map(answer => {
            return <View
              style={{
                marginTop: 20,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "lightgrey",
                borderRadius: 15,
                marginHorizontal: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#363636",
                    marginTop: 5,
                  }}
                >
                  Suggestion :
            </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#363636",
                    marginTop: 5,
                    marginLeft: "auto",
                  }}
                >
                  {answer?.user?.userName}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  {/* <IonIcon name="heart-outline" size={18} color={"#000"} /> */}
                  {/* <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: 5,
                      color: "grey",
                    }}
                  >
                    {answer?.likedBy?.length}
                  </Text> */}
                  {/* <IonIcon
                    name="heart-dislike-outline"
                    size={18}
                    color={"#000"}
                    style={{ marginLeft: 5 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: 5,
                      color: "grey",
                    }}
                  >
                    7
              </Text> */}
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ lineHeight: 20, color: "#908e8c" }}>
                  {answer?.answer}
                </Text>
              </View>
            </View>
          })
        })()}
      </ScrollView>
      <View
      >
        <View style={styles.container2}>
          <IonIcon name="attach-outline" color="#FFF" size={20} />
          <TextInput placeholder="Some text" multiline={true} value={input} style={styles?.input} onChangeText={value => { setinput(value) }} />
          <TouchableOpacity>
            <IonIcon name="ios-send" color="#FFF" size={20} onPress={sendAnswer} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default CommunityQuestionaireDetail;

const styles = StyleSheet.create({
  container2: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#rgba(0,0,0,0.2)",
    elevation: 0,
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  input: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
    color: "#fff",
    paddingHorizontal: 10,
    flex: 1,
  },
});
