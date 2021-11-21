import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import { LinearGradient } from "expo-linear-gradient";
import IonIcon from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import AuthContext from "../components/AuthContext";
import { Kohana } from "react-native-textinput-effects";
import axios from "axios";
import BACKEND from "../constants/BACKEND";
// import { useDispatch } from "react-redux";
// import ACTION from "../components/Action";
import ForgotPassword from "../components/ForgotPassword";

const { width, height } = Dimensions.get("screen");

const SignIn = ({ navigation }) => {
  // const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [stateToken, setstateToken] = useState("token");
  const [stateuserName, setstateuserName] = useState("userName");
  const [toggleModal2, settoggleModal2] = useState(false);
  const [isModalVisible2, setisModalVisible2] = useState(false);
  const [selectedType, setselectedType] = useState(null);
  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const userToken = await AsyncStorage.getItem("Quink-Post");
        setstateToken(userToken);
        if (userToken) {
          const result = await axios.post(`${BACKEND}/user/key`, {
            token: userToken,
          });
          await AsyncStorage.setItem(
            "toggleProfileScreen",
            JSON.stringify(false)
          );
          if (result.data.success) {
            // dispatch({ type: ACTION.USER_LOGGED_IN, payload: result.data.user })
            // console.log(result.data.user)
            const userName = result.data.user.userName;
            setstateuserName(userName);
            await AsyncStorage.setItem(
              "quinkUser",
              JSON.stringify(result.data.user)
            );
            navigation.navigate("BottomTab", { screen: "HomeScreen" });
          }
        }
      } catch (e) {
        console.log(e, "something prob");
      }
    })();
  }, []);

  const { colors } = useTheme();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const toggleModal2 =()=>{
  //   setisModalVisible2(!isModalVisible2)
  // }

  const { signIn } = useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const setLanguageAndPass = async () => {
    try {
      if (selectedType == null) {
        return Alert.alert("Please select one option");
      }
      await AsyncStorage.setItem("language", `${selectedType}`);

      navigation.navigate("BottomTab", { screen: "HomeScreen" });
      setisModalVisible2(false);
    } catch {
      (e) => console.log(e);
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async () => {
    const userName = data.username;
    const password = data.password;
    console.log("called>>>>>>", userName, password);
    console.log("called");
    try {
      const result = await axios.post(`${BACKEND}/user/login`, {
        userName,
        password,
      });

      if (result.data.success) {
        await AsyncStorage.setItem("Quink-Post", result.data.token);
        await AsyncStorage.setItem(
          "quinkUser",
          JSON.stringify(result.data.user)
        );
        setisModalVisible2(true);
        // dispatch({ type: ACTION.USER_LOGGED_IN, payload: result.data.user })
        // navigation.navigate("BottomTab", { screen: "HomeScreen" });
      } else {
        Alert.alert("Wrong Input!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LinearGradient
      colors={["#283c86", "#f2f2f2", "#667db6"]}
      style={styles.container}
    >
      <StatusBar backgroundColor="#283c86" barStyle="light-content" />
      <View style={styles.header}>
        {/* <Text style={styles.text_header}>Welcome!</Text> */}
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.action}>
          <Kohana
            style={{
              backgroundColor: "#f0f0f0",
              elevation: 2,
              borderRadius: 25,
            }}
            label={" Username"}
            iconClass={IonIcon}
            iconName={"person-outline"}
            iconColor={"#000"}
            inputPadding={16}
            labelStyle={{ color: "grey" }}
            inputStyle={{ color: "#000" }}
            useNativeDriver
            onChangeText={(val) => setData({ ...data, username: val })}
          />
          <TouchableOpacity
            style={{
              marginVertical: 16,
              borderRadius: 15,
              backgroundColor: "#fff",
              paddingHorizontal: 4,
              paddingVertical: 3,
              marginLeft: 8,
              elevation: 2,
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
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}
        <View style={styles.action}>
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
            inputStyle={{ color: "#000" }}
            useNativeDriver
            secureTextEntry={data.secureTextEntry ? true : false}
            autoCapitalize="none"
            onChangeText={(val) => setData({ ...data, password: val })}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry}
            style={{
              marginVertical: 16,
              borderRadius: 15,
              elevation: 2,
              backgroundColor: "#fff",
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
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity onPress={toggleModal}>
          <Text style={{ color: "#4286f4", marginTop: 15, marginLeft: 7 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              // loginHandle(data.username, data.password, navigation);
              // loginHandle(data.username,data.password,navigation);
              loginHandle();
              // loginHandle("user1", "password1", );
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
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>

      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={{
          justifyContent: "flex-end",
          top: height / 3.5,
          width: width,
          marginLeft: "auto",
        }}
        isVisible={isModalVisible}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            // height: 420,
          }}
        >
          <ForgotPassword />
        </View>
      </Modal>

      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackdropPress={toggleModal}
        isVisible={isModalVisible2}
        onBackButtonPress={() => setisModalVisible2(false)}
        style={{
          justifyContent: "flex-end",
          top: height / 40,
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
          <View
            style={{
              // width: 150,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 7,
                marginTop: 20,
              }}
            >
              Content Language selected as {`${selectedType}`}
            </Text>
            <Picker
              style={{
                alignSelf: "center",
                height: 50,
                width: 130,
                marginVertical: 15,
                color: "#000",
                marginLeft: 10,
              }}
              selectedValue={selectedType}
              onValueChange={(item) => {
                setselectedType(item);
              }}
            >
              {/* <Picker.Item label="Select Type" value="null" /> */}

              <Picker.Item label="Select" value="null" />
              <Picker.Item label="Both" value="All" />
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
              marginTop: 15,
              height: 50,
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 10,
              paddingHorizontal: 40  
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
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  footer: {
    flex: 3,
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
  action: {
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#4286f4",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
