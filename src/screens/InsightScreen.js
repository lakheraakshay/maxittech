import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InsightScreen(props) {
  const [user, setuser] = useState({})
  useEffect(() => {
    try {
      (async () => {
        const data = await AsyncStorage.getItem("quinkUser");
        // const temptUser = await JSON.parse(data);
        // setgetPost(await temptUser?.post);
        setuser(await JSON.parse(data));
      })();
    } catch (E) {
      console.log(E);
    }
  }, []);
  const [moneyVal, setmoneyVal] = useState();

  return (
    <View style={styles.page}>
      <View style={styles.headContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.humContainer}
        >
          <Icon name="close-sharp" size={26} />
          {/* <Icon name="md-remove" size={26} style={styles.hum} /> */}
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image
            source={require("../../assets/iconqp.png")}
            style={styles.profile}
          />
        </View>
      </View>
      <View style={styles.optionCard}>
        <View style={styles.optionCol}>
          <Text style={styles.textLinear}>LINEAR</Text>
        </View>
        <Text style={styles.textLogarthimic}>LOGARTHIMIC</Text>
      </View>
      <View style={styles.locationContainer}>
        {/* <Text style={styles.textGlobal}>GLOBAL</Text> */}
        <Text style={styles.textRussia}>RC : Recent Content</Text>
        <View style={styles.reloadContainer}>
          <Icon name="md-refresh" size={24} color="red" />
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 40,
        }}
      >
        <LineChart
          data={{
            labels: ["RC1", "RC2", "RC3", "RC4"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={320}
          yAxisSuffix=" Views"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 0,
            color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
            labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "red",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.bottomCard}>
        <View style={styles.bottomCol}>
          <Text style={styles.textSymptoms}>Total Revenue Generated</Text>
          <View style={styles.infoContainer}>
            <Text style={{ color: "#FFF" }}>i</Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "center",
            marginTop: 30,
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "#000", fontSize: 22, fontWeight: "bold" }}>
            Rs {user.revenue ? user.revenue : 0}
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>{moneyVal > 100 ? "Check your Mail Id for payment details" : "Minimum Redeem Amount Rs 100"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  headContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginTop: 40,
  },
  humContainer: {
    width: "50%",
  },
  hum: {
    marginTop: -20,
    marginLeft: 5,
  },
  profileContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 110,
  },
  optionCol: {
    backgroundColor: "#000",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  textLinear: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  textLogarthimic: {
    color: "#b8b8aa",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 15,
  },
  locationContainer: {
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 40,
    alignItems: "center",
  },
  textGlobal: {
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
  },
  textRussia: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#6a706e",
    paddingHorizontal: 30,
    borderColor: "#6a706e",
    borderWidth: 0.5,
    borderRadius: 15,
    paddingVertical: 7,
  },
  reloadContainer: {
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
    elevation: 3,
  },
  bottomCard: {
    backgroundColor: "#1c2732",
    height: 220,
    marginTop: "auto",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomCol: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  textSymptoms: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  infoContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  button: {
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 1,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 35,
    // marginBottom: 5,
  },
  btnText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
