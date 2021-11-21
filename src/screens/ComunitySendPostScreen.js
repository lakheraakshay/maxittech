import React, { useEffect, useState } from "react";
import axios from "axios"
import BACKEND from "../constants/BACKEND"
import {
    ImageBackground,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Dimensions,
    Image,
    Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
// import PushNotification from "../components/PushNotification"
const { width, height } = Dimensions.get("screen");
import AsyncStorage from "@react-native-async-storage/async-storage"
import Postcms from "../components/Postcms";
import { Picker } from "@react-native-picker/picker"
const CommunitySendPostScreen = (props) => {
    const data = props.route.params.communityDetail
    const [title, settitle] = useState("")
    const [caption, setcaption] = useState("")
    const [description, setdescription] = useState("")
    const [image, setImage] = useState(null);
    const [selectedType, setselectedType] = useState("")
    const [loading, setLoading] = useState(false)
    const [finalData, setfinalData] = useState("")
    const [toggleValue, settoggleValue] = useState(false)
    const [globalState, setglobalState] = useState()
    // const toggleValue = async () => JSON.parse(await AsyncStorage.getItem("toggleValue"))
    // console.log(toggleValue,"<<<<<<Toggoel dslafj")
    // useEffect(() => {
    //   (async () => {
    //     try {
    //       console.log("userEffect called ")
    //       const value = await AsyncStorage.getItem("cmsData")
    //       setfinalData(await JSON.parse(value))
    //       // console.log(value)

    //     } catch (e) { console.log(e) }

    //   })()
    // }, [toggleValue])
    useEffect(() => {
        (async () => {
            const usre = await AsyncStorage.getItem("quinkUser")
            setglobalState(JSON.parse(usre))


        })()
    }, [])
    const submitPost = async () => {
        try {
            // settoggleValue(!toggleValue)
            // setTimeout(() => console.log(finalData, "<<<<<<<Final  "), 3000);
            const value = await AsyncStorage.getItem("cmsData")
            const finalJson = await JSON.parse(value)
            // console.log(value)

            // settoggleValue(!toggleValue)
            // console.log({title,description})
            if (title.trim() == "", caption.trim() == "") {
                Alert.alert(" Fields can not be empty")
                return null
            }
            if (selectedType == "Select Type", selectedType == null) {
                Alert.alert("Select type of your content")
                console.log("null types")
                return null
            }
            setLoading(true)
            // console.log({
            //     title
            // })
            const result = await axios.post(`${BACKEND}/community/post`, {

                author: globalState._id,
                communityId: data._id,
                title: title,
                body: caption,
                // type: selectedType,
                // caption: caption,
                image: image,
                isCommunityPost: true
            })
            if (await result.data.success) {
                settitle("")
                // setdescription("")

                setcaption("")
                setLoading(false)
                Alert.alert(" successfully uploaded");
                console.log("success fully uploaded")
                setTogglerefresh(!Togglerefresh)
                // Alert.alert("put fields")


            }
            else {
                setLoading(false)
                Alert.alert("something went wrong while uploading post \n check input fields")
            }
        } catch (e) {
            setLoading(false)
            Alert.alert("something went wrong while uploading post \n check input fields")
            console.log(e)
            // setLoading(false)
        }
        // setLoading(false)
    }

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



    const backgroundImage = {
        uri:
            "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    };



    const deleteImage = () => {
        setImage(null);
    };

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

    // console.log(selectedType)
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                const newFile = {
                    uri: result.uri,
                    type: `test/${result.uri.split(".")[1]}`,
                    name: `test/${result.uri.split(".")[1]}`
                }
                handleUpload(newFile)

            }
        } catch (e) { console.log(e) }
    };

    return (
        <ScrollView>
            <View style={{ flexGrow: 1, height: "100%" }}>
                <View>
                    <ImageBackground
                        source={backgroundImage}
                        style={{ width: "100%", paddingBottom: 30 }}
                        imageStyle={{ borderBottomRightRadius: 40 }}
                    >
                        <View style={styles.DarkOverlay}></View>
                        <LinearGradient
                            style={{
                                borderBottomLeftRadius: 25,
                                borderBottomRightRadius: 25,
                            }}
                            colors={["#283c86", "#667db6", "#a8c0ff"]}
                        >
                            <View style={styles.searchContainer}>
                                <Feather
                                    name="arrow-left"
                                    onPress={() => props.navigation.goBack()}
                                    size={22}
                                    color="#fff"
                                />
                                <Text style={styles.userGreet}>{data.title}</Text>
                            </View>
                        </LinearGradient>
                        <View>
                            <View style={{ top: height * 0.04, alignItems: "center" }}>
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.avatar} />
                                ) : (
                                    <Image
                                        source={require("../../assets/imgs/blue.jpg")}
                                        style={styles.avatar}
                                    />
                                )}
                                <View style={{ flexDirection: "row", marginVertical: 5 }}>
                                    <Icon
                                        name="trash-bin-sharp"
                                        size={22}
                                        style={{ margin: 11 }}
                                        onPress={deleteImage}
                                    />
                                    <Icon
                                        name="add-circle-sharp"
                                        size={24}
                                        style={{ margin: 11 }}
                                        onPress={pickImage}
                                    />
                                </View>
                            </View>

                            {/* <View
                                style={{
                                    borderRadius: 15,
                                    paddingLeft: 5,
                                    alignSelf: "center",
                                    marginTop: 35,
                                    backgroundColor: "#fff"
                                }}>
                                <Picker style={{
                                    alignSelf: "center",
                                    height: 50,
                                    width: 155,
                                    color: "#000"
                                }}
                                    selectedValue={selectedType}
                                    onValueChange={(item) => {
                                        setselectedType(item)
                                    }}
                                >
                                    <Picker.Item label="Select Type" value="null" />
                                    <Picker.Item label="ARTICLE" value="ARTICLE" />
                                    <Picker.Item label="POEM" value="POEM" />
                                    <Picker.Item label="MEME" value="MEME" />
                                    <Picker.Item label="QUOTE" value="QUOTE" />
                                    <Picker.Item label="STORY" value="STORY" />
                                    <Picker.Item label="SHAYARI" value="SHAYARI" />
                                </Picker>

                            </View> */}

                            <TextInput
                                style={styles.searchBox}
                                placeholder="Title"
                                value={title}
                                onChangeText={(val) => settitle(val)}
                                placeholderTextColor="#666"
                            ></TextInput>

                            <TextInput
                                style={styles.searchBox}
                                placeholder="body"
                                placeholderTextColor="#666"
                                value={caption}
                                onChangeText={(val) => setcaption(val)}
                            ></TextInput>

                            {/* <TextInput
                style={[styles.searchBox, { marginBottom: 30 }]}
                placeholder="Content"
                placeholderTextColor="#666"
                multiline={true}
                value={description}
                onChangeText={(val) => setdescription(val)}
                numberOfLines={25}
              ></TextInput> */}

                            {/* {(() => {
                                if (selectedType != "MEME") {
                                    return <Postcms navigation={props.navigation} />
                                }
                            })()} */}



                            <View
                                style={{
                                    marginTop: 30,
                                    width: 100,
                                    alignSelf: "center",
                                    borderTopRightRadius: 15,
                                    borderBottomRightRadius: 15,
                                }}
                            >
                                {(() => {
                                    if (!loading) {
                                        return (<Button title='SUBMIT' onPress={submitPost} />)
                                    } else {
                                        return (<View
                                            style={{
                                                backgroundColor: "#fff",
                                                height: height / 13,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <ActivityIndicator size={55} color="#667db6" />
                                        </View>)
                                    }
                                })()}
                                {/* <PushNotification /> */}
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </ScrollView>
    );
};

export default CommunitySendPostScreen;

const styles = StyleSheet.create({
    DarkOverlay: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        height: 270,
        backgroundColor: "#000",
        opacity: 0.2,
        borderBottomRightRadius: 65,
    },
    avatar: {
        borderRadius: 20,
        width: 200,
        height: 200,
        borderWidth: 0,
        borderColor: "grey",
        borderWidth: 2,
    },
    searchContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    searchBox: {
        marginTop: 30,
        backgroundColor: "#fff",
        paddingLeft: 24,
        padding: 12,
        marginHorizontal: 6,
        borderRadius: 15,
    },
    contentBox: {
        marginTop: 30,
        backgroundColor: "#fff",
        paddingLeft: 24,
        padding: 12,
        borderRadius: 15,
        marginHorizontal: 6,
        textAlignVertical: "top",
    },
    userGreet: {
        fontSize: 23,
        fontWeight: "bold",
        color: "white",
        marginLeft: width / 5,
    },
});
