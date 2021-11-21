import React, { useEffect, useState } from "react";
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
import Modal from "react-native-modal";
import ShareContent from "../components/ShareContent";
import CardSettingModalContent from "./CardSettingModalContent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");
import getTimeToShow from "../components/GetTimeToShow";

function FeedCard({ cardText, navigation, data }) {
  // console.log(data.image);
  const [globalUser, setglobalUser] = useState({});

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalSetting, setModalSetting] = useState(false);

  const postCreatedOn = data?.createdOn;

  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage?.getItem("quinkUser");
        setglobalUser(JSON?.parse(user));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const findScreenToShow = () => {
    if (globalUser?._id == data?.author?._id) {
      return "ProfileScreen";
    } else {
      return "UserProfileScreen";
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleSettingModal = () => {
    setModalSetting(!isModalSetting);
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <Block flex>
          <Block flex space="between" style={styles.cards}>

            <Card
              onPressFunction={() =>
                navigation.navigate(findScreenToShow(), { data: data?.author })
              }
              onSettingPress={toggleSettingModal}
              openDetailScreen={() => navigation?.navigate("ContentDetailScreen", {
                data: data,
                navigation: navigation,
              })
                // {
                // screen: "ContentDetailScreen", navigateData: {
                //   data: data,
                //   navigation: navigation,
                // }
              }
              flex
              borderless
              location=" "
              shadowColor={theme.COLORS.BLACK}
              style={styles.card}
              title={data?.author?.userName}
              titleColor={theme.COLORS.WHITE}
              caption={`${getTimeToShow(postCreatedOn)?.time} ${getTimeToShow(postCreatedOn)?.value
                } ago`}
              avatar={
                data?.author?.avatar
                  ? data?.author?.avatar
                  : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar"
              }
              footerStyle={styles.cardFull}
              image={data?.image}
              imageStyle={{ height: theme.SIZES.BASE * 13.75, resizeMode: "stretch" }}
            // image="https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
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
                      navigation: navigation,
                    })
                  }
                  style={{ marginLeft: "auto" }}
                >
                  <Icon
                    name="open-outline"
                    size={24}
                    style={{ marginHorizontal: 5 }}
                  />
                </TouchableOpacity>
                <Icon
                  name="ribbon-outline"
                  size={22.5}
                  // onPress={() => navigation.navigate('ShareDetailScreen')}
                  style={{ marginHorizontal: 4, marginTop: 2 }}
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
                      // flex: 1,
                      backgroundColor: "#fff",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                      height: 320
                    }}
                  >
                    <ShareContent data={data} />
                  </View>
                </Modal>

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
              </View>
            </View>
          </Block>
        </Block>
      </SafeAreaView>
    </ScrollView>
  );
}

export default FeedCard;

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
    marginBottom: 10,
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
    elevation: 5,
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
