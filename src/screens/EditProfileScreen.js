import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Image, View, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Sae, Kaede } from "react-native-textinput-effects";
import { ToastAndroid, Platform, AlertIOS } from "react-native";
import * as ImagePicker from "expo-image-picker";
import BACKEND from "../constants/BACKEND"
// import ACTION from "../components/Action"
import axios from "axios"
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage"

// import handleUpload from "../components/Cloudinary"
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 10) / 3;
const xhr = new XMLHttpRequest();





const EditProfileScreen = (props) => {
  // console.log(cloud, "this iscloud")
  // console.log(props.route.params.data);
  const [user,setuser] = useState()
  const data = props.route.params.data
  const [image, setImage] = useState(data.avatar);
  const [userName, setUserName] = useState(data.userName)
  const [firstName, setFirstName] = useState(data.firstName)
  const [bio, setbio] = useState(data.bio)
  const deleteImage = () => {
    setImage(null);
  };

  useEffect(()=>{ (async()=>{
    const usre=await AsyncStorage.getItem("quinkUser")
    setuser(JSON.parse(usre))
  })() },[])

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


  const notifyMessage = async () => {

    try {
      const result = await axios.patch(`${BACKEND}/user/update`, {
        userId: user._id,
        userName: userName,
        firstName: firstName,
        bio: bio,
        avatar: image
      })
      if (result.data.success) {
        console.log(result.data)
        await AsyncStorage.setItem("quinkUser",JSON.stringify(result.data.user))
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravity(
            "Profile Updated Successfully",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        } else {
          AlertIOS.alert("Profile Updated Successfully");
        }
      }
    } catch (e) { console.log(e) }

  };




  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS !== "web") {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      } catch (e) { console.log(e) }
    })();
  }, []);


 const  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      // console.log(result, "this isresult of image picking");

      if (!result.cancelled) {
        const newFile = {
          uri: result.uri,
          type: `test/${result.uri.split(".")[1]}`,
          name: `test/${result.uri.split(".")[1]}`
        }
        handleUpload(newFile)
        //  console.log(handle,"thid handfkd")

      }
    } catch (e) { console.log(e, "error from pickImage") }
  };

  const saeInput = (
    <>
      <Sae
        label={"Username"}
        labelStyle={{ color: "grey" }}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
        inputPadding={16}
        labelHeight={24}
        value={userName}
        onChangeText={(val) => setUserName(val)}
        borderHeight={2}
        inputStyle={{ color: "#000" }}
        style={{ marginHorizontal: 15, marginVertical: 0 }}
        autoCapitalize={"none"}
        autoCorrect={false}
      />
      <Sae
        label={"Name"}
        labelStyle={{ color: "grey" }}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
        value={firstName}
        inputPadding={16}
        onChangeText={(val) => setFirstName(val)}
        labelHeight={24}
        borderHeight={2}
        inputStyle={{ color: "#000" }}
        style={{ marginHorizontal: 15 }}
        autoCapitalize={"none"}
        autoCorrect={false}
      />
      <Sae
        label={"Bio"}
        labelStyle={{ color: "grey" }}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
        inputPadding={16}
        value={bio}
        onChangeText={(val) => setbio(val)}
        labelHeight={24}
        borderHeight={2}
        inputStyle={{ color: "#000" }}
        style={{ marginHorizontal: 15 }}
        autoCapitalize={"none"}
        autoCorrect={false}
        multiline={true}
      />
    </>
  );

  const kaedeInput = () => {
    return (
      <>
        <Kaede
          label={"Website"}
          inputPadding={18}
          labelStyle={{ backgroundColor: "#c2e8ff" }}
          style={{ marginVertical: 6 }}
        />
        <Kaede
          label={"Facebook"}
          inputPadding={18}
          labelStyle={{ backgroundColor: "#c2e8ff" }}
          style={{ marginVertical: 6 }}
        />
        <Kaede
          label={"Instagram"}
          inputPadding={18}
          labelStyle={{ backgroundColor: "#c2e8ff" }}
          style={{ marginVertical: 6 }}
        />
        <Kaede
          label={"Twitter"}
          inputPadding={18}
          labelStyle={{ backgroundColor: "#c2e8ff" }}
          style={{ marginVertical: 6 }}
        />
      </>
    );
  };

  return (
    <>
      <ScrollView stickyHeaderIndices={[0]}>
        <View>
          <View>
          <LinearGradient
              style={styles.icons}
              colors={["#283c86", "#667db6", "#a8c0ff"]}
            >
            <Icon
              name="arrow-back-sharp"
              size={27}
              color={'#fff'}
              style={{ marginHorizontal: 7 }}
              onPress={() => props.navigation.goBack()}
            />
            <Text style={styles.navtext}> Edit Profile </Text>
            <Icon
              name="checkmark-sharp"
              size={27}
              style={{
                marginLeft: "auto",
                marginHorizontal: 10,
                alignSelf: "center",
              }}
              color={'#fff'}
              onPress={notifyMessage}
            />
            </LinearGradient>
          </View>
        </View>
        <View style={{ top: height * 0.04, alignItems: "center" }}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <Image
              source={require("../../assets/imgs/gallery.png")}
              style={styles.avatar}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="trash-bin-sharp"
              size={21}
              style={{ margin: 11 }}
              onPress={deleteImage}
            />
            <Icon
              name="add-circle-sharp"
              size={23}
              style={{ margin: 11 }}
              onPress={pickImage}
            />
          </View>
        </View>
        <View style={{ marginVertical: 15 }}>{saeInput}</View>
        <View style={{ margin: 10 }}>{kaedeInput()}</View>
      </ScrollView>
    </>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "grey",
    borderWidth: 2,
  },
  icons: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  navtext: {
    fontWeight: "bold",
    fontSize: 21,
    marginHorizontal: 25,
    color: '#fff'
  },
});
