import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import AsyncStorage from "@react-native-community/async-storage"
// import { Button } from "react-native-elements/dist/buttons/Button";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import IonIcon from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Kohana } from "react-native-textinput-effects";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const SignUpScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("screen");

  const [data, setData] = React.useState({
    userName: "",
    password: "",
    email: "",
    confirm_password: "",
    check_Name_Change: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [toggleModal, settoggleModal] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [selectedType, setselectedType] = useState(null);

  const textUserNameChange = async (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        userName: val,
        check_Name_Change: true,
      });
    }
  };
  const textEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };
  const textNameChange = (val) => {
    setData({ ...data, name: val });
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const signUp = async () => {
    try {
      const result = await axios.post(`${BACKEND}/user/signUp`, {
        userName: data.userName,
        password: data.password,
        email: data.email,
        // console.log(result.data)
      });
      // console.log(result.data);
      if (result.data.success) {
        console.log(result.data);
        Alert.alert("Successfully signed up");

        await AsyncStorage.setItem("Quink-Post", result.data.token);
        await AsyncStorage.setItem(
          "quinkUser",
          JSON.stringify(result.data.user)
        );

        setisModalVisible(true);

        // dispatch({ type: ACTION.USER_LOGGED_IN, payload: result.data.user })

        // navigation.navigate("BottomTab", { screen: "HomeScreen" });
      }
    } catch (e) {
      Alert.alert("check userName/password error while signing up");
      console.log(e, "error while sign up");
    }
  };

  const setLanguageAndPass = async () => {
    try {
      if (selectedType == null) {
        return Alert.alert("Please select one option");
      }
      await AsyncStorage.setItem("language", `${selectedType}`);

      navigation.navigate("BottomTab", { screen: "HomeScreen" });
      setisModalVisible(false);
    } catch {
      (e) => console.log(e);
    }
  };

  return (
    <LinearGradient
      colors={["#283c86", "#667db6", "#a8c0ff"]}
      style={styles.container}
    >
      <StatusBar backgroundColor="#283c86" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.action2}>
            <Kohana
              style={{
                backgroundColor: "#f0f0f0",
                elevation: 2,
                borderRadius: 25,
              }}
              label={" User Name"}
              iconClass={IonIcon}
              iconName={"person-outline"}
              iconColor={"#000"}
              inputPadding={16}
              labelStyle={{ color: "grey" }}
              inputStyle={{ color: "#3b3b3b" }}
              useNativeDriver
              onChangeText={(val) => textUserNameChange(val)}
            />
            <TouchableOpacity
              style={{
                marginVertical: 16,
                borderRadius: 15,
                backgroundColor: "#f0f0f0",
                paddingHorizontal: 4,
                paddingVertical: 3,
                elevation: 2,
                marginLeft: 8,
              }}
            >
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : (
                <Animatable.View animation="bounceIn">
                  <Feather name="check" color="grey" size={20} />
                </Animatable.View>
              )}
            </TouchableOpacity>
          </View>
          {/* <View style={styles.action2}>
            <Kohana
              style={{
                backgroundColor: "#f0f0f0",
                elevation: 2,
                borderRadius: 25,
              }}
              label={"User Name"}
              iconClass={IonIcon}
              iconName={"person-outline"}
              iconColor={"#000"}
              inputPadding={16}
              labelStyle={{ color: "grey" }}
              inputStyle={{ color: "#91627b" }}
              useNativeDriver
              onChangeText={(val) => textUserNameChange(val)}
            />
            <TouchableOpacity
              style={{
                marginVertical: 16,
                borderRadius: 15,
                backgroundColor: "#f0f0f0",
                paddingHorizontal: 4,
                paddingVertical: 3,
                elevation: 2,
                marginLeft: 8,
              }}
            >
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check" color="grey" size={20} />
                  </Animatable.View>
                )}
            </TouchableOpacity>
          </View>*/}
          <View style={styles.action2}>
            <Kohana
              style={{
                backgroundColor: "#f0f0f0",
                elevation: 2,
                borderRadius: 25,
              }}
              label={"Email"}
              iconClass={IonIcon}
              iconName={"lock-closed-outline"}
              iconColor={"#000"}
              inputPadding={16}
              labelStyle={{ color: "grey" }}
              inputStyle={{ color: "#3b3b3b" }}
              useNativeDriver
              autoCapitalize="none"
              // secureTextEntry={data.confirm_secureTextEntry ? true : false}
              onChangeText={(val) => textEmailChange(val)}
            />
            <TouchableOpacity
              style={{
                marginVertical: 16,
                borderRadius: 15,
                backgroundColor: "#f0f0f0",
                paddingHorizontal: 4,
                paddingVertical: 3,
                elevation: 2,
                marginLeft: 8,
              }}
            >
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : (
                <Animatable.View animation="bounceIn">
                  <Feather name="check" color="grey" size={20} />
                </Animatable.View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.action2}>
            <Kohana
              style={{
                backgroundColor: "#f0f0f0",
                elevation: 2,
                borderRadius: 25,
              }}
              label={"Password"}
              iconClass={IonIcon}
              iconName={"lock-closed-outline"}
              iconColor={"#000"}
              inputPadding={16}
              labelStyle={{ color: "grey" }}
              inputStyle={{ color: "#3b3b3b" }}
              useNativeDriver
              secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateSecureTextEntry}
              style={{
                marginVertical: 16,
                borderRadius: 15,
                backgroundColor: "#f0f0f0",
                paddingHorizontal: 4,
                paddingVertical: 3,
                elevation: 2,
                marginLeft: 8,
              }}
            >
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.action2}>
            <Kohana
              style={{
                backgroundColor: "#f0f0f0",
                elevation: 2,
                borderRadius: 25,
              }}
              label={"Confirm Password"}
              iconClass={IonIcon}
              iconName={"lock-closed-outline"}
              iconColor={"#000"}
              inputPadding={16}
              labelStyle={{ color: "grey" }}
              inputStyle={{ color: "#3b3b3b" }}
              useNativeDriver
              autoCapitalize="none"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateConfirmSecureTextEntry}
              style={{
                marginVertical: 16,
                borderRadius: 15,
                backgroundColor: "#f0f0f0",
                elevation: 2,
                paddingHorizontal: 4,
                paddingVertical: 3,
                marginLeft: 8,
              }}
            >
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}>and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                signUp();
              }}
            >
              <LinearGradient
                colors={["#283c86", "#667db6", "#a8c0ff"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
              style={[
                styles.signIn,
                {
                  borderColor: "#667db6",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#667db6",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        onBackButtonPress={() => setisModalVisible(false)}
        style={{
          justifyContent: "flex-end",
          top: height / 10,
          width: width,
          marginLeft: "auto",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 300,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 33,
              marginTop: 20,
            }}
          >
            Content Language selected as {`${selectedType}`}
          </Text>
          <View
            style={{
              borderWidth: 0.3,
              borderColor: "grey",
              borderRadius: 15,
              alignSelf: "center",
            }}
          >
            <Picker
              style={{
                alignSelf: "center",
                height: 50,
                width: 130,
                color: "#000",
                marginLeft: 10,
              }}
              selectedValue={selectedType}
              onValueChange={(item) => {
                setselectedType(item);
              }}
            >
              <Picker.Item label="Select Type" value="null" />
              <Picker.Item label="All" value="All" />
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Hindi" value="Hindi" />
            </Picker>
          </View>
          <TouchableOpacity
            // onPress={() => navigation.navigate("SignInScreen")}
            onPress={setLanguageAndPass}
            style={{
              borderColor: "#667db6",
              borderWidth: 1,
              marginTop: 42,
              alignSelf: "center",
              paddingHorizontal: 25,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#667db6",
                },
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6347",
  },
  header: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action2: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    paddingHorizontal: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
