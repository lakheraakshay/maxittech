import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BACKEND from "../constants/BACKEND";

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const userToken = await AsyncStorage.getItem("Quink-Post");
        setLoading(true);
        // setstateToken(userToken)
        if (userToken != "xyz" && userToken != null) {
          navigation.navigate("BottomTab", { screen: "HomeScreen" });
          setLoading(false);

          // const result = await axios.post(`${BACKEND}/user/key`, {
          //   token: userToken,
          // });
          // await AsyncStorage.setItem(
          //   "toggleProfileScreen",
          //   JSON.stringify(false)
          // );
          // if (result.data.success) {
          //   // dispatch({ type: ACTION.USER_LOGGED_IN, payload: result.data.user })
          //   // console.log(result.data.user)

          //   setLoading(false);
          //   const userName = result.data.user.userName;
          //   // setstateuserName(userName)
          //   await AsyncStorage.setItem(
          //     "quinkUser",
          //     JSON.stringify(result.data.user)
          //   );

          // } else {
          //   setLoading(false);
          // }
        } else {
          console.log(userToken);
          setLoading(false);
        }
      } catch (e) {
        console.log(e, "something prob");
        setLoading(false);
      }
    })();
  }, []);

  return (
    <LinearGradient
      colors={["#283c86", "#667db6", "#a8c0ff"]}
      style={styles.container}
    >
      <StatusBar backgroundColor="#283c86" barStyle="light-content" />
      <View style={styles.header}>
        {/* <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../../assets/imgs/1.jpg")}
          style={styles.logo}
          resizeMode="stretch"
        /> */}
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          India's First Content Creation Platform
        </Text>
        <Text style={styles.text}>Sign in with your account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <LinearGradient
              colors={["#283c86", "#667db6", "#a8c0ff"]}
              style={styles.signIn}
            >
              {/* {Loading ? (
                <View
                  style={{
                    backgroundColor: "transparent",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={14} color="#fff" />
                </View>
              ) : ( */}
              <Text style={styles.textSign}>Get Started</Text>
              {/* )} */}
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 40,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    alignItems: "flex-end",
    marginTop: "auto",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
