import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function ProfileSettingModalContent({ navigation, modalShow }) {
  const [logoutTrigger, setlogoutTrigger] = useState(true);
  const [languagePreference, setlanguagePreference] = useState(false);
  const [selectedType, setselectedType] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const getLang = await AsyncStorage.getItem("language");
        setselectedType(getLang);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const LogOutFun = () => {
    AsyncStorage.setItem("Quink-Post", "xyz");
    // navigate to login page
    navigation.navigate("SplashScreen");
    modalShow()
  };

  const changeLogout = () => {
    setlogoutTrigger(!logoutTrigger);
  };

  const setChanges = async () => {
    await AsyncStorage.setItem("language", `${selectedType}`);
    console.log(selectedType);
    modalShow();
  };

  const handleLanguage = () => {
    setlanguagePreference(!languagePreference);
  };

  return (
    <ScrollView style={{ marginTop: 25 }}>
      <View style={languagePreference ? styles.invisible : styles.visible}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate("AboutScreen");
            modalShow();
          }}
        >
          <Icon
            name="browsers-outline"
            size={21}
            color="#000"
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
            About Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate("SendFeedbackScreen");
            modalShow();
          }}
        >
          <Icon
            name="clipboard-outline"
            size={21}
            style={{
              margin: 8,
              marginLeft: 14,
            }}
            color="#000"
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#777777",
              marginHorizontal: 25,
            }}
          >
            Send Feedback
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate("SupportScreen");
            modalShow();
          }}
        >
          <Icon
            name="md-book-outline"
            size={21}
            style={{
              margin: 8,
              marginLeft: 14,
            }}
            color="#000"
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#777777",
              marginHorizontal: 25,
            }}
          >
            Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container} onPress={handleLanguage}>
          <Icon
            name="language-outline"
            size={21}
            style={{
              margin: 8,
              marginLeft: 14,
            }}
            color="#000"
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#777777",
              marginHorizontal: 25,
            }}
          >
            Content Language Preference
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={changeLogout}>
          <Icon
            name="log-out-outline"
            size={21}
            color="#000"
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
            {logoutTrigger ? "Logout" : "Are you sure?"}
          </Text>
          <TouchableOpacity
            style={{ marginLeft: "auto", marginHorizontal: 14 }}
          >
            <Icon
              onPress={LogOutFun}
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
      </View>

      <View style={languagePreference ? styles.visible : styles.invisible}>
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 7,
            marginTop: 10,
          }}
        >
          Content Language selected as {`${selectedType}`}
        </Text>

        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 20,
            // marginTop: 10,
          }}
        >
          Refresh Home Screen to get updated content.
        </Text>

        <View
          style={{
            borderWidth: 0.3,
            borderColor: "grey",
            borderRadius: 15,
            width: 150,
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
            <Picker.Item label="Mixed Content" value="All" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Hindi" value="Hindi" />
            <Picker.Item label="Gujarati" value="Gujarati" />
            <Picker.Item label="Kannada" value="Kannada" />
            <Picker.Item label="Telugu" value="Telugu" />
            <Picker.Item label="Marathi" value="Marathi" />
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            justifyContent: "space-around",
          }}
        >
          <Text
            onPress={modalShow}
            style={{
              fontSize: 18,
              fontWeight: "bold",
              borderRadius: 14,
              borderWidth: 0.4,
              paddingVertical: 2,
              paddingHorizontal: 7,
              backgroundColor: "lightgrey",
              borderColor: "grey",
            }}
          >
            Back
          </Text>
          <Text
            onPress={setChanges}
            style={{
              fontSize: 18,
              fontWeight: "bold",
              borderRadius: 14,
              borderWidth: 0.4,
              paddingVertical: 2,
              paddingHorizontal: 7,
              backgroundColor: "#a8c0ff",
              borderColor: "#667db6",
            }}
          >
            Done
          </Text>
        </View>
      </View>
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
  invisible: {
    display: "none",
  },
  visible: {
    // paddingLeft: 5,
    // alignSelf: "center",
    // marginTop: 35,
  },
});
