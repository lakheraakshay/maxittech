import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Sent = ({ message, timeStamp }) => {
  // console.log(chat, "<<<<<<<<<<<<<<<<<This is timeStamp")
  // console.log(message, "<<<<<<<<<<<<<<<<<<<<<<<<<");
  
  // const timeStamp = message.timeStamp
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
    // console.log(timeStamp)
    const date = new Date(timeStamp).getDate();
    const month = new Date(timeStamp).getMonth();
    const time = new Date(timeStamp).getHours();
    const minutes = new Date(timeStamp).getMinutes();

    return { date, month: monthName[month + 1], time, minutes };
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["lightgrey", "#667db6", "#a8c0ff"]}
        style={styles.gradient}
      >
        <Text style={styles.text}>{message}</Text>
      </LinearGradient>
      <Text style={styles.duration}>{`${getTime(timeStamp).date} ${
        getTime(timeStamp).month
      }  ${getTime(timeStamp).time}:${getTime(timeStamp).minutes}  `}</Text>
    </View>
  );
};
export default Sent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignSelf: "flex-end",
  },
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
    alignSelf: "flex-end",
  },
  gradient: {
    maxWidth: 220,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  text: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Montserrat_700Bold",
  },
});
