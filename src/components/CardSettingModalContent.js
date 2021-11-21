import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Share,
  Clipboard,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
import { TouchableOpacity } from "react-native";
export default function CardSettingModalContent({
  shareDataUsername,
  shareDataTitle,
  shareDataId,
}) {
  const [logoutTrigger, setlogoutTrigger] = useState(true);
  const [NotiText, setNotiText] = useState("on");

  const changeLogout = () => {
    setlogoutTrigger(!logoutTrigger);
  };

  const changeText = () => {
    setNotiText("off");
    changeLogout();
  };

  const userNameString = `${shareDataUsername}`.replace(" ", "-");
  const userNameString2 = userNameString.replace(" ", "-");
  const userNameString3 = userNameString2.replace(" ", "-");
  const userNameString4 = userNameString3.replace(" ", "-");
  const titleString = `${shareDataTitle}`.replace(" ", "-");
  const titleString3 = titleString.replace(" ", "-");
  const titleString4 = titleString3.replace(" ", "-");
  const titleString5 = titleString4.replace(" ", "-");
  const titleString6 = titleString5.replace(" ", "-");
  const titleString7 = titleString6.replace(" ", "-");
  const titleString8 = titleString7.replace(" ", "-");
  const titleString9 = titleString8.replace(" ", "-");
  const titleString11 = titleString9.replace(" ", "-");
  const titleString12 = titleString11.replace(" ", "-");
  const titleString13 = titleString12.replace(" ", "-");
  const titleString14 = titleString13.replace(" ", "-");
  const titleString15 = titleString14.replace(" ", "-");
  const titleString16 = titleString15.replace(" ", "-");
  const titleString17 = titleString16.replace(" ", "-");
  const titleString18 = titleString17.replace(" ", "-");
  const titleString19 = titleString18.replace(" ", "-");
  const titleString20 = titleString19.replace(" ", "-");
  const titleString21 = titleString20.replace(" ", "-");
  const titleString22 = titleString21.replace(" ", "-");
  const titleString23 = titleString22.replace(" ", "-");

  const str =
    `https://www.quinkpost.com/post/${userNameString4}/${titleString23}/${shareDataId}`.trim();

  const onPostShare = async () => {
    try {
      // const userNameString = `${shareDataUsername}`.replace(" ", "-");
      // const userNameString2 = userNameString.replace(" ", "-");
      // const userNameString3 = userNameString2.replace(" ", "-");
      // const userNameString4 = userNameString3.replace(" ", "-");
      // const titleString = `${shareDataTitle}`.replace(" ", "-");
      // const titleString3 = titleString.replace(" ", "-");
      // const titleString4 = titleString3.replace(" ", "-");
      // const titleString5 = titleString4.replace(" ", "-");
      // const titleString6 = titleString5.replace(" ", "-");
      // const titleString7 = titleString6.replace(" ", "-");
      // const titleString8 = titleString7.replace(" ", "-");
      // const titleString9 = titleString8.replace(" ", "-");
      // const titleString11 = titleString9.replace(" ", "-");
      // const titleString12 = titleString11.replace(" ", "-");
      // const titleString13 = titleString12.replace(" ", "-");

      // const str =
      //   `https://www.quinkpost.com/post/${userNameString4}/${titleString13}/${shareDataId}`.trim();
      // const str2 = encodeURIComponent(str)
      //  const
      // const linkString1 = str.replace("", "%20");
      // const linkString2 = linkString1.replace(" ", "%20");
      // const linkString3 = linkString2.replace("  ", "%20");
      // console.log(linkString)
      const result = await Share.share({
        message: `Please have a look at the shared content named ${shareDataTitle}  - ${str}. Quink Post is an infotainment platform with content creation.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const userReport = () => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        "Content Reported",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      AlertIOS.alert("Content Reported");
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(
      `${str}`
    );
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        "Copied to Clipboard",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      AlertIOS.alert("Copied to Clipboard");
    }
  };
  return (
    <ScrollView style={{ marginTop: 25 }}>
      <TouchableOpacity style={styles.container} onPress={userReport}>
        <Icon
          name="warning-outline"
          size={21}
          style={{
            margin: 8,
            marginLeft: 14,
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#777777",
            marginHorizontal: 25,
          }}
        >
          Report
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Icon
          name="analytics-outline"
          size={21}
          style={{
            margin: 8,
            marginLeft: 14,
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#777777",
            marginHorizontal: 25,
          }}
        >
          Follow
        </Text>
      </View>
      <TouchableOpacity style={styles.container} onPress={copyToClipboard}>
        <Icon
          name="clipboard-outline"
          size={21}
          style={{
            margin: 8,
            marginLeft: 14,
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#777777",
            marginHorizontal: 25,
          }}
        >
          Copy link
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={onPostShare}>
        <Icon
          name="share-social-outline"
          size={21}
          style={{
            margin: 8,
            marginLeft: 14,
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#777777",
            marginHorizontal: 25,
          }}
        >
          Share to
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={changeLogout}>
        <Icon
          name={
            NotiText == "on"
              ? "notifications-outline"
              : "notifications-off-outline"
          }
          size={21}
          style={{
            margin: 8,
            marginLeft: 14,
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#777777",
            marginHorizontal: 25,
          }}
        >
          {logoutTrigger
            ? `Turn ${NotiText} post notification`
            : "Are you sure?"}
        </Text>
        <TouchableOpacity style={{ marginLeft: "auto", marginHorizontal: 14 }}>
          <Icon
            onPress={changeText}
            name="checkmark-outline"
            size={25}
            color={logoutTrigger ? "transparent" : "green"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="close-outline"
            size={25}
            color={logoutTrigger ? "transparent" : "red"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 7,
  },
});
