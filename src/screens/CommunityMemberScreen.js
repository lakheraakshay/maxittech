import React, { useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";

function CommunityMemberScreen(props) {
  const [popularSelected, setpopularSelected] = useState(true);

  const onTabPressed = () => {
    setpopularSelected(!popularSelected);
  };

  const width = Dimensions.get("screen").width;

  return (
    <>
      <StatusBar backgroundColor="#283c86" barStyle="light-content" />
      <LinearGradient
        colors={["#283c86", "#667db6", "#a8c0ff"]}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        <View style={{ width: "10%" }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              name="arrow-back-outline"
              color={"#fff"}
              size={25}
              style={{ marginHorizontal: 5 }}
            />
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
            <View style={{ borderRadius: 15 }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontWeight: "bold",
                  fontSize: 17.5,
                  color: "white",
                  padding: 2,
                }}
              >
                Entrepreneurship Community
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "10%",
          }}
        >
          <Icon name="search-sharp" color={"#fff"} size={23} />
        </View>
      </LinearGradient>

      <View style={styles.container}>
        <Image
          source={require("../../assets/imgs/1.png")}
          style={styles.image}
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.username}>chris_eballo_27</Text>
          <Text style={styles.text}>Chris Evans Eballo</Text>
        </View>
        <Icon
          name="eye-sharp"
          style={styles.button}
          size={20}
          color="#525252"
        />
      </View>
    </>
  );
}

export default CommunityMemberScreen;

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
    padding: 3,
    paddingHorizontal: 5,
    marginHorizontal: 6,
    textAlign: "center",
    textAlignVertical: "center",
    elevation: 5,
    borderRadius: 20,
    backgroundColor: "#cfcfcf",
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
  },
});
