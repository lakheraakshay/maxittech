import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function HorizontalCards(props) {
  const data = props.data
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('OriginalDetailScreen', { data })}
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
          source={{ uri: data.image }}
          style={{
            height: 69,
            width: 70,
            borderRadius: 10,
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
          {data.title}
        </Text>
        <Text style={{ fontSize: 10, marginVertical: 3, color: "black", marginLeft: 'auto' }}>
          {`-${props.name}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
