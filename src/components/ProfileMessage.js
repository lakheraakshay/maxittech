import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ProfileMessage = (props) => {
  console.log(props.userName);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: props.uri
            ? props.uri
            : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar",
        }}
        style={styles.avatarStyle}
      />
      {/* <Text style={styles.nameStyle}>{props.userName}</Text> */}
    </View>
  );
};
export default ProfileMessage;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    marginRight: 17,
  },
  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameStyle: {
    marginTop: 10,
    fontSize: 11,
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
  },
});
