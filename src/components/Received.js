import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Received = ({ image, message, timeStamp }) => {
  const monthName = [
    "dec",
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    // "dec",
  ];

  const getTime = (timeStamp) => {
    const date = new Date(timeStamp).getDate();
    const month = new Date(timeStamp).getMonth();
    const time = new Date(timeStamp).getHours();
    const minutes = new Date(timeStamp).getMinutes();

    return { date, month: monthName[month + 1], time, minutes };
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image ? image : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar", 
        }}
        style={styles.img}
      />
      <View style={{ borderWidth: 0.5, borderColor: "lightgrey", borderRadius: 25 }}>
        <LinearGradient
          style={styles.gradient}
          colors={["#fff", "transparent", "#fff"]}
        >
          <Text style={styles.message}>{message}</Text>
        </LinearGradient>
        <Text style={styles.duration}>{`${getTime(timeStamp).date} ${
          getTime(timeStamp).month
        }  ${getTime(timeStamp).time}:${getTime(timeStamp).minutes}`}</Text>
      </View>
    </View>
  );
};
export default Received;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
  },
  gradient: {
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    // paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  container: {
    flexDirection: "row",
    marginTop: 20,
    width: 250,
  },
  img: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginTop: "auto",
    marginRight: 4,
  },
  message: {
    fontSize: 13,
    textAlign: 'left',
    // marginHorizontal: 15,
    color: "#000",
    fontFamily: "Montserrat_700Bold",
  },
});
