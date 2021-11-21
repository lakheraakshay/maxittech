import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 10) / 3;

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

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

  const deleteImage = () => {
    setImage(null);
  };

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
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 55,
          marginTop: 75,
        }}
      >
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <Image
            source={require("../../assets/imgs/gallery.png")}
            style={styles.avatar}
          />
        )}
      </View>
      <View style={{ flexDirection: "row", alignSelf: 'center' }}>
        <Icon
          name="trash-bin-sharp"
          size={21}
          color={'lightgrey'}
          style={{ margin: 11 }}
          onPress={deleteImage}
        />
        <Icon
          name="add-circle-sharp"
          size={23}
          color={'lightgrey'}
          style={{ margin: 11 }}
          onPress={pickImage}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "grey",
    borderWidth: 2,
  },
});
