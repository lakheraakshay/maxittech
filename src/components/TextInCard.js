import React from "react";
import { Text, ImageBackground, TouchableOpacity } from "react-native";

export default function TextInCard(props) {
  const data = props.data;

  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('OriginalDetailScreen', { data })}
    >
      <ImageBackground
        source={{ uri: data.image }}
        style={{
          height: 130,
          width: 230,
          marginRight: 20,
          borderRadius: 10,
          marginBottom: 40,
          opacity: 0.7,
          backgroundColor: "#000",
          marginLeft: 3,
          padding: 12,
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 13 }}>
          {data?.title}
          {/* hello */}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#fff",
            fontSize: 12,
            textAlign: "right",
          }}
        >
          By {data.author.userName}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
