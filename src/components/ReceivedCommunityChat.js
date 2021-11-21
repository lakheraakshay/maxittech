import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ReceivedCommunityChat = ({ chatUsername, image, message, timeStamp }) => {
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
      <Image source={{ uri: image }} style={styles.img} />
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "lightgrey",
          borderRadius: 25,
        }}
      >
        <View>
          <Text style={styles.userName}>{chatUsername}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.duration}>{`${getTime(timeStamp).date} ${
          getTime(timeStamp).month
        } | ${getTime(timeStamp).time}:${getTime(timeStamp).minutes}`}</Text>
      </View>
    </View>
  );
};
export default ReceivedCommunityChat;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
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
    // marginTop: 14,
    marginRight: 4,
    marginTop: "auto",
    marginBottom: 1,
  },
  message: {
    fontSize: 13,
    marginHorizontal: 15,
    fontFamily: "Montserrat_700Bold",
  },
  userName: {
    fontSize: 12,
    color: "grey",
    paddingBottom: 3,
    borderBottomWidth: 0.65,
    borderBottomColor: "#b6b6b6",
    marginTop: 2,
    marginBottom: 5,
    paddingHorizontal: 15,
    fontFamily: "Montserrat_700Bold",
  },
});
