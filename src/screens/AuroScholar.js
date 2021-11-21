import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import base64 from "react-native-base64";
import { Kaede } from "react-native-textinput-effects";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";
import { Dimensions } from "react-native";
import { set } from "react-native-reanimated";
var qs = require("qs");
const { widht, height } = Dimensions.get("screen");
function AuroScholar() {
  const [iframeValue, setiframeValue] = useState({});
  const [Loading, setLoading] = useState(false)
  const [number, setnumber] = useState("null");
  const [Svalue, setSvalue] = useState("https://auroscholar.com/dashboard.php?student=");

  const [showinput, setshowinput] = useState(true);
  const [selectedType, setselectedType] = useState("null");

  const [school_name, setschool_name] = useState("")
  const [student_name, setstudent_name] = useState("")
  const [email_verified, setemail_verified] = useState("")
  const [email_id, setemail_id] = useState("null")
  const [board_type, setboard_type] = useState("null")

  const onContactSubmit = () => {
    // setshowinput(false);
    result();
  };

  const result = async () => {

    console.log(selectedType, board_type, "<<<types")
    // console.log("outside")
    console.log(selectedType, board_type, number, "<<<all")
    console.log(email_id.trim().length, "len")
    // console.log(email_id.includes("@"), "<<<")
    const checkemail = email_id.length > 0 ? (email_id.includes("@") && email_id.includes(".")) : true
    console.log(checkemail)
    if (checkemail && number.trim().length == 10 && selectedType != "null" && board_type != "null" && number != "null") {
      setLoading(true)
      console.log("inseid")
      const greatresult = await axios.post(
        "https://auroscholar.com/api/partnerapilogin.php",
        qs.stringify({
          partner_id: "741",
          partner_source: "QUINZuISw2",
          //     QUINZuLSw2
          mobile_no: `${number}`,
          student_class: `${selectedType}`,
          student_name,
          email_id,
          school_name,
          email_verified: email_id?.trim() != "null" ? true : false,
          board_type
        })
      );
      console.log({
        partner_id: "741",
        partner_source: "QUINZuISw2",
        mobile_no: `${number}`,
        student_class: `${selectedType}`,
        student_name,
        school_name,
        email_verified: email_id.trim() != null ? 1 : 0,
        board_type
      }, "<<<<<<<<<<")
      // console.log(greatresult?.data, "this is if rame");
      console.log(greatresult.data, "<<<<<<<<<")
      if (greatresult.data.type == "success") {
        setLoading(false)
        setshowinput(false);
        setiframeValue(greatresult.data.data);
        console.log(greatresult.data.data, "iframval<<<<<<<<<<");
        // const value = window.btoa(result.data['data']['sudent_registration_id']);
        console.log(
          greatresult?.data["data"]["sudent_registration_id"],
          "base6414"
        );
        const value = base64.encode(
          `${greatresult?.data["data"]["sudent_registration_id"]}`
        );
        setSvalue(greatresult.data.data.url);
        console.log(value, "base 64");
      } else {
        setLoading(false)
        if (greatresult.data.error) {
          console.log(greatresult.data.error, "<<<<>>>>>>>")
          Alert.alert(`${greatresult.data.message}`)
        }
        // console.log(e)

        setnumber("null")
        setselectedType("null")
        setboard_type("null")
        // setschool_name("nu")
        // Alert.alert("Check fields! (Class/Board/number)")
      }
    } else {
      if (number.trim().length != 10) {
        Alert.alert("check mobile number")
      }
      if (email_id.length > 0 ? (email_id.includes("@") && email_id.includes(".")) ? false : true : false) {
        Alert.alert("invalid check email !!!")
      }
      if (selectedType == "null" && board_type == "null") {
        Alert.alert("fill input fields")
      } else {
        if (board_type == "null") {
          Alert.alert("Select board type")
        } if (selectedType == "null") {
          Alert.alert("Select Class")
        } if (number == "null") {
          Alert.alert("Check mobile number !!")
        }
      }
    }
  }

  return (
    <>

      <StatusBar backgroundColor="#283c86" />
      <LinearGradient colors={["#283c86", "#667db6", "#a8c0ff"]}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 15,
            color: "#fff",
            paddingBottom: 15,
          }}
        >
          Eligible for students upto class XII
        </Text>
      </LinearGradient>
      {(() => {
        if (Loading) {
          return <View
            style={{
              backgroundColor: "#fff",
              height: height / 1.5,
              justifyContent: "center",
              paddingBottom: 25,
            }}
          >
            <ActivityIndicator size={55} color="#667db6" />
          </View>
        }
        else {
          return <View
            style={{
              display: showinput ? "flex" : "none",
              backgroundColor: "#fff",
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Kaede
                onChangeText={(val) => setnumber(val)}
                label={"Enter your Contact Number"}
                inputPadding={18}
                labelStyle={{ backgroundColor: "#c2e8ff", fontSize: 18 }}
                style={{ marginVertical: 6 }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Kaede
                onChangeText={(val) => setschool_name(val)}
                label={"Enter your school name"}
                inputPadding={18}
                labelStyle={{ backgroundColor: "#c2e8ff", fontSize: 18 }}
                style={{ marginVertical: 6 }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Kaede
                onChangeText={(val) => setstudent_name(val)}
                label={"Enter student name"}
                inputPadding={18}
                labelStyle={{ backgroundColor: "#c2e8ff", fontSize: 18 }}
                style={{ marginVertical: 6 }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Kaede
                onChangeText={(val) => setemail_id(val)}
                label={"Enter your email id"}
                inputPadding={18}
                labelStyle={{ backgroundColor: "#c2e8ff", fontSize: 18 }}
                style={{ marginVertical: 6 }}
              />
            </View>


            <View
              style={{
                borderRadius: 15,
                paddingLeft: 5,
                alignSelf: "center",
                marginVertical: 11,
                backgroundColor: "#fff",
              }}
            >
              <Picker
                style={{
                  alignSelf: "center",
                  height: 50,
                  width: 200,
                  color: "#000",
                }}
                selectedValue={board_type}
                onValueChange={(item) => {
                  setboard_type(item);
                }}
              >
                <Picker.Item label="Board type" value="null" />
                <Picker.Item label="CBSE" value="CBSE" />
                <Picker.Item label="HBSE" value="HBSE" />
                <Picker.Item label="ICSE" value="ICSE" />
                <Picker.Item label="OTHER" value="OTHER" />

              </Picker>
            </View>

            <View
              style={{
                borderRadius: 15,
                paddingLeft: 5,
                alignSelf: "center",
                marginVertical: 11,
                backgroundColor: "#fff",
              }}
            >
              <Picker
                style={{
                  alignSelf: "center",
                  height: 50,
                  width: 200,
                  color: "#000",
                }}
                selectedValue={selectedType}
                onValueChange={(item) => {
                  setselectedType(item);
                }}
              >
                <Picker.Item label="Select Class" value="null" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>
            </View>

            <Text
              style={{
                textAlign: "center",
                borderRadius: 15,
                borderWidth: 0.5,
                alignSelf: "center",
                paddingHorizontal: 7,
                marginBottom: 20,
              }}
              onPress={onContactSubmit}
            >
              Submit
            </Text>
          </View>
        }
      })()}

      {(() => {
        if (showinput == false) {
          return <WebView
            originWhitelist={["*"]}
            // source={{uri: "https://quinkpost.com/Flipbook/flipbook.html"}}
            source={{
              uri: `${Svalue}`,
            }}
            style={{ flex: 1 }}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
            mixedContentMode="always"
          />
        }
      })()}

    </>
  );
}


export default AuroScholar;
