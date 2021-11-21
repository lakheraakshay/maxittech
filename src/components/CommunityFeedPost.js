import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Dimensions,
  Platform,
  Text,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import BACKEND from "../constants/BACKEND"
import axios from "axios"
// import { useSelector } from "react-redux"
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
const { widht, height } = Dimensions.get("screen");
function CommunityFeedPost() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState()
  const [globalUser, setglobalUser] = useState()
  // const [loading, setLoading] = useState(true)
  // const globalUser = useSelector(state => state.user)
  useEffect(() => {
    (async () => {
      const usre = await AsyncStorage.getItem("quinkUser")
      setglobalUser(JSON.parse(usre))
    })()
  }, [])


  const deleteImage = () => {
    setImage(null);
  };
  console.log(text)

  const sendPost = async () => {
    console.log("sendPost")
    try {
      const result = await axios.post(`${BACKEND}/community/post`, {
        author: globalUser._id,
        title: "This is title",
        body: text,
        type: "ARTICLE",
        caption: "this is caption",
        image: image,
      })
      if (result.data.success) {
        // settitle("")
        // setdescription("")
        // setcaption("")
        console.log("success fully uploaded")
      } else {
        console.log("prob")
      }
    } catch (e) { console.log(e) }
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleUpload = async (image) => {

    try {
      // console.log("handleUpload called")
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "quinkpost")
      data.append("cloud_name", "Quink-Post")
      console.log("before cloud post")

      fetch("https://api.cloudinary.com/v1_1/quink-post/image/upload", {
        method: "post",
        body: data,
      }).then(res => res.json()).then(data => {
        console.log(data.secure_url, "this is data from cloudinakdfj");
        setImage(data.secure_url)
      }).catch(e => console.log(e, "error from the n catch"))

    } catch (e) { console.log(e, "error while sending in cloudinary"); }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const newFile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test/${result.uri.split(".")[1]}`
      }
      handleUpload(newFile)
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row", marginVertical: 12 }}>
        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                marginTop: 15,
                borderRadius: 5,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/imgs/gallery.png")}
              style={{
                width: 100,
                height: 100,
                marginTop: 15,
                borderRadius: 5,
              }}
            />
          )}
          <View
            style={{ flexDirection: "row", marginTop: 10, alignSelf: "center" }}
          >
            <Icon
              name="trash-bin-sharp"
              size={20}
              style={{ marginHorizontal: 6 }}
              color={"#000"}
              onPress={deleteImage}
            />
            <Icon
              name="add-circle-sharp"
              size={21}
              onPress={pickImage}
              style={{ marginHorizontal: 6 }}
              color={"#000"}
            />
          </View>
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Some text"
            placeholderTextColor={"grey"}
            style={styles.input}
            value={text}
            multiline={true}
            onChangeText={text => { setText(text) }}
          />
        </View>
        {/* <View style={styles.container}>
          <TextInput
            placeholder="Some text"
            placeholderTextColor={"grey"}
            style={styles.input}
            multiline={true}
            onChangeText={text => { setText(text) }}
          />
        </View> */}
      </View>
      <View
        style={{
          marginTop: 30,
          width: 100,
          alignSelf: "center",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <Button title='SUBMIT' onPress={sendPost} />
        {/* <PushNotification /> */}
      </View>
    </>
  );
}

export default CommunityFeedPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.25)",
    width: "60%",
    borderRadius: 20,
    marginTop: 12,
    marginLeft: 10,
  },
  input: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
    color: "#fff",
    marginHorizontal: 6,
  },
});
