import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

export default function Couches({ data,navigation }) {
  console.log(data.title)
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OriginalDetailScreen',{ data })}

      style={{
        marginTop: 30,
        backgroundColor: "#fff",
        height: 250,
        width: 200,
        elevation: 5,
        borderRadius: 10,
        padding: 15,
        marginRight: 30,
        marginLeft: 2,
        marginBottom: 1,
      }}
    >
      <Image
        source={{ uri:data.image }}
        style={{
          width: 170,
          height: 110,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#4f4a4a",
            fontSize: 16,
          }}
        >
          {data?.title}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          color: "grey",
          fontWeight: "bold",
          // marginBottom: -10
        }}
      >
        {data?.caption}
      </Text>
    </TouchableOpacity>
  );
}
