import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Text,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

export default function CommunitySetting({ navigation }) {
  const notifyMessage = () => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        "Entrepreneurship Community Left",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      AlertIOS.alert("Profile Updated Successfully");
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('CommunityMemberScreen')}>
            <View style={styles.menuItem}>
              <Icon name="people-outline" color="#000" size={25} />
              <Text style={styles.menuItemText}>Members</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="card-outline" color="#000" size={25} />
              <Text style={styles.menuItemText}>Donate</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="repeat-outline" color="#000" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={notifyMessage}>
            <View style={styles.menuItem}>
              <Icon name="close-outline" color="#000" size={25} />
              <Text style={styles.menuItemText}>Leave Community</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
