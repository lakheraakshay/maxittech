import React from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";

const width = Dimensions.get("screen").width;

export default function CommunityCard({ src, name, navigation, data }) {
 
  return (
    <View
      style={{
        marginTop: 30,
        backgroundColor: "#fff",
        height: 350,
        width: "80%",
        elevation: 10,
        borderRadius: 10,
        padding: 15,
        marginRight: 30,
        marginLeft: 2,
        marginBottom: 5,
      }}
    >
      <Image
        source={{ uri: src }}
        style={{
          width: width / 1.46,
          height: 170,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
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
          {name}
        </Text>
        <View
          style={{
            height: 4,
            width: 4,
            borderRadius: 4,
            backgroundColor: "red",
            marginHorizontal: 4,
          }}
        ></View>
        <Text
          style={{
            color: "red",
            fontSize: 9,
            fontWeight: "bold",
          }}
        >
          New
        </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          color: "#4f4a4a",
        }}
      >
        This Community will help you in getting guidance and mentorship from
        community experts. You can access get mentoship through provided videos
        or can get 1 on 1 mentorship
      </Text>

      <View
        style={{
          flexDirection: "row",
          marginTop: 8,
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              backgroundColor: "lightgrey",
              alignSelf: "flex-start",
              paddingHorizontal: 4,
              borderRadius: 20,
            }}
          >
            187 Members
          </Text>
        </View>

        <View
          style={{
            width: "20%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("CommunityDetailScreen", { data:data })}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                backgroundColor: "#000",
                padding: 4,
                borderRadius: 15,
                color: "#f0f0f0",
                alignSelf: "flex-end",
              }}
            >
              Join
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
