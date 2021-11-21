import React from "react";
import { View, StatusBar, Image, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/Entypo";
import Icon2 from '@expo/vector-icons/Ionicons';

function SearchScreen(props) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#283c86'} />
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Icon
          name="chevron-left"
          size={30}
          style={{ margin: 5 }}
          color="#000"
          onPress={() => props.navigation.goBack()}
        />
        <View
          style={{
            flexDirection: "row",
            borderColor: "#000",
            borderRadius: 20,
            borderWidth: 0.2,
            paddingVertical: 5,
            marginHorizontal: 0,
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Search Here.."
            placeholderTextColor="#000"
            style={{
              paddingHorizontal: 20,
              fontWeight: "normal",
              fontSize: 11,
              width: "77%",
              color: "#9ca1a2",
            }}
          />
        </View>
        <Icon
          name="magnifying-glass"
          size={25}
          style={{ marginLeft: "auto", marginRight: 9, marginTop: 6 }}
          color="#000"
        />
      </View>
      <View style={styles.container}>
        <Image source={require("../../assets/imgs/1.png")} style={styles.image} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.username}>chris_eballo_27</Text>
          <Text style={styles.text}>Chris Evans Eballo</Text>
        </View>
        <Text style={styles.button}>Follow</Text>
        <Icon2
          name='notifications-sharp'
          size={25}
          color="#3d3d3d"
        />
      </View>
    </>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#dedede',
    paddingVertical: 5,
    borderRadius: 30
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
    fontSize: 15,
    color: "#d9d9d9",
    borderColor: "grey",
    padding: 3,
    paddingHorizontal: 5,
    marginHorizontal: 6,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "#878787",
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
  },
});
