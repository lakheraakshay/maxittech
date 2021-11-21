import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

export default function Poster({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MagazineScreen")}
      style={{
        flexDirection: "row",
        height: 80,
        width: 240,
        backgroundColor: "#fff",
        elevation: 2,
        padding: 6,
        marginVertical: 5,
        marginRight: 20,
        marginLeft: 2,
        borderRadius: 10,
      }}
    >
      <View>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/42/cd/94/42cd9496ae1a56f804e0ddf91633adbe.png",
          }}
          style={{
            height: 69,
            width: 70,
            borderRadius: 35,
          }}
        />
      </View>
      <View
        style={{
          width: "72%",
          justifyContent: "center",
          paddingHorizontal: 10,
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "grey",
          }}
        >
          Q-Magazine is a unique infotainment magazine that comprises of premium
          Inks.
        </Text>
        <Text
          style={{
            fontSize: 10,
            marginVertical: 3,
            color: "black",
            marginLeft: "auto",
          }}
        >
          By QP Devs
        </Text>
      </View>
    </TouchableOpacity>

    // <TouchableOpacity
    //   onPress={() => navigation.navigate('MagazineScreen')}
    // >
    //   <View
    //     style={{
    //       height: 90,
    //       width: 230,
    //       marginRight: 20,
    //       borderRadius: 10,
    //       backgroundColor: "#fff",
    //       elevation: 10,
    //       marginBottom: 4,
    //       //   opacity: 1,

    //       marginLeft: 3,
    //       padding: 12,
    //       marginTop: 25,
    //     }}
    //   >
    //     <Text style={{ fontWeight: "bold", color: "#4f4a4a", fontSize: 13 }}>
    //       Q-Magazine is a unique infotainment magazine that comprises of premium Inks.
    //       {/* hello */}
    //     </Text>
    //     <Text
    //       style={{
    //         fontWeight: "bold",
    //         color: "grey",
    //         fontSize: 12,
    //         textAlign: "right",
    //       }}
    //     >
    //       By QP Devs
    //     </Text>
    //   </View>
    // </TouchableOpacity>
  );
}
