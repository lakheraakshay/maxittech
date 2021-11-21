import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Block, Card } from "galio-framework";
import theme from "../constants/Theme";
import { Divider } from "react-native-elements";
import Icon from "@expo/vector-icons/Ionicons";
import getTimeToShow from "../components/GetTimeToShow";
import ShareContent from "../components/ShareContent";

import Modal from "react-native-modal";
import CardSettingModalContent from "./CardSettingModalContent";

const { width, height } = Dimensions.get("screen");

const TextCard = ({ cardText, navigation, data }) => {
  const postCreatedOn = data?.createdOn;
  const [isModalSetting, setModalSetting] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSettingModal = () => {
    setModalSetting(!isModalSetting);
  };
  // console.log(postCreatedOn)
  // console.log(data.author)

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <Block flex>
          <Block flex space="between" style={styles.cards}>
            <Card
              flex
              onPressFunction={() =>
                navigation?.navigate("UserProfileScreen", { data: data?.author })
              }
              borderless
              onSettingPress={toggleSettingModal}
              shadowColor={theme.COLORS.BLACK}
              style={styles.card}
              title={data?.author?.userName}
              location=" "
              titleColor={theme.COLORS.WHITE}
              caption={`${getTimeToShow(postCreatedOn)?.time} ${
                getTimeToShow(postCreatedOn)?.value
              } ago`}
              avatar={
                data?.author?.avatar
                  ? data?.author?.avatar
                  : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar"
              }
            >
              <LinearGradient
                colors={["#a8c0ff", "#667db6", "#283c86"]}
                style={styles.cardGradient}
              />
            </Card>
            <View style={styles.cardContent}>
              <Text>{data?.title}</Text>
              <Divider
                style={{
                  backgroundColor: "#cccccc",
                  marginVertical: 8,
                  height: 1,
                  width: "100%",
                }}
              />
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Icon
                  name="eye-outline"
                  size={24}
                  style={{ marginHorizontal: 4 }}
                />
                <Text style={{ textAlignVertical: "center" }}>
                  {data?.likedBy?.length}
                </Text>
                <Icon
                  name="arrow-redo-outline"
                  size={24}
                  style={{ marginHorizontal: 4 }}
                  onPress={toggleModal}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation?.navigate("ContentDetailScreen", {
                      data: data,
                    })
                  }
                  style={{ marginHorizontal: 4, marginLeft: "auto" }}
                >
                  <Icon name="open-outline" size={24} />
                </TouchableOpacity>
                <Icon
                  name={false ? "rocket-outline" : "medal-outline"}
                  size={24}
                  style={{ marginHorizontal: 4 }}
                />
                <Modal
                  animationIn="fadeInLeft"
                  animationOut="fadeOutRight"
                  onBackdropPress={toggleModal}
                  onBackButtonPress={toggleModal}
                  style={{
                    justifyContent: "flex-end",
                    top: height / 40,
                    width: width,
                    marginLeft: "auto",
                  }}
                  isVisible={isModalVisible}
                >
                  <View
                    style={{
                      height: 320,
                      backgroundColor: "#fff",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                  >
                    <ShareContent data={data} />
                  </View>
                </Modal>
              </View>
            </View>
            <Modal
              animationIn="fadeInUp"
              animationOut="fadeOutDown"
              onBackdropPress={toggleSettingModal}
              onBackButtonPress={toggleSettingModal}
              style={{
                justifyContent: "flex-end",
                top: height / 40,
                width: width,
                marginLeft: "auto",
              }}
              isVisible={isModalSetting}
            >
              <View
                style={{
                  // flex: 1,
                  backgroundColor: "#fff",
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  height: 300,
                }}
              >
                <CardSettingModalContent
                  shareDataUsername={data?.author?.userName}
                  shareDataTitle={data?.title}
                  shareDataId={data?._id}
                />
              </View>
            </Modal>
          </Block>
        </Block>
      </SafeAreaView>
    </ScrollView>
  );
};

export default TextCard;

const styles = StyleSheet.create({
  cardGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: "absolute",
    overflow: "hidden",
  },
  cardContent: {
    marginTop: -14,
    width: "91.5%",
    marginHorizontal: 15.5,
    padding: 10,
    marginBottom: 15,
    textAlign: "left",
    backgroundColor: "white",
    elevation: 3,
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
  cardFull: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  card: {
    borderWidth: 0,
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  swiperContent: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#e5e4eb",
    marginHorizontal: 10,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  cards: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  categoryBox: {
    height: 28,
    width: 89,
    borderWidth: 0.7,
    borderColor: "#2c2c2e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
