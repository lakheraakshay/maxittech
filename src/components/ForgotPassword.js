import React, { useState } from "react";
import { Alert } from "react-native";
import { Text } from "react-native";
import axios from "axios"
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Jiro } from "react-native-textinput-effects";
import BACKEND from "../constants/BACKEND"
function ForgotPassword() {
  const [showPassInput, setShowPassInput] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [forgot, setforgot] = useState({
    email: "",
    password1: "",
    password2: ""
  })

  const handleshowPass = async () => {
    try {
      if (showPassInput === true) {
        if (forgot.password1 != forgot.password2) {
          Alert.alert("password should be same!!")
        } else {
          setLoader(true)
          const { data } = await axios.patch(`${BACKEND}/user/changePassword/${forgot.email}/${forgot.password1}`)
          if (data.success) {
            setLoader(false)
            Alert.alert("reset password successful")
            // setShowPassInput(false)
            // setRegister(false)
          }
          else {
            setloader(false)
            Alert.alert("something went wrong try after some time !!")
          }
        }
      }

      const { data } = await axios.get(`${BACKEND}/user/forgotit/${forgot.email}`)
      setLoader(true);
      if (data.success) {
        setLoader(false);
        setShowPassInput(true);
        console.log("success")
      } else {
        console.log("fail")
        setLoader(false)
        Alert.alert("Email not found check it again !!")
      }
    } catch (e) { console.log }

  };

  return (
    <>
      <View style={{ marginVertical: 5, marginHorizontal: 15 }}>
        {showPassInput ? (
          <View>
            <View style={{ marginBottom: 15 }}>
              <Jiro
                label={"New Password"}
                borderColor={"#667db6"}
                inputPadding={16}
                labelStyle={{ fontSize: 18 }}
                inputStyle={{ color: "white" }}
                value={forgot.password1}
                onChangeText={value => setforgot({ ...forgot, password1: value })}
              />
            </View>
            <Jiro
              label={"Confirm Password"}
              borderColor={"#667db6"}
              inputPadding={16}
              labelStyle={{ fontSize: 18 }}
              inputStyle={{ color: "white" }}
              value={forgot.password2}
              onChangeText={value => setforgot({ ...forgot, password2: value })}
            />
          </View>
        ) : (
          <View>
            <Jiro
              label={"Enter Email Address"}
              borderColor={"#667db6"}
              inputPadding={16}
              labelStyle={{ fontSize: 18 }}
              inputStyle={{ color: "white" }}
              value={forgot.email}
              onChangeText={value => setforgot({ ...forgot, email: value })}
            />
          </View>
        )}
        {Loader ? (
          <View
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              marginVertical: 45
            }}
          >
            <ActivityIndicator size={25} color="#667db6" />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              marginVertical: 45,
              alignSelf: "center",
              borderRadius: 17,
              borderWidth: 0.8,
              paddingVertical: 3,
              paddingHorizontal: 18,
            }}
            onPress={handleshowPass}
          >
            <Text style={{ fontSize: 17, fontWeight: "bold", color: "#333" }}>
              Enter
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default ForgotPassword;