import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { Block, Card } from "galio-framework";
import theme from "../constants/Theme";
import getTimeToShow from "../components/GetTimeToShow"
const { width, height } = Dimensions.get("screen");

function CommunityPost({ data, navigation }) {
  // console.log(data,"this isdata")
  // console.log(navigation,"<<<<<<thsii snavigationdfk")
  // const [loading, setLoading] = useState(true)


  console.log(data, "this is data from community post screen")
  const cardImageText = (post) => {
    if (post.body) {
      return (
        <>
          <Card

            flex
            borderless
            shadowColor={theme.COLORS.BLACK}
            style={styles.card}
            title={post?.author?.userName}
            caption={`${getTimeToShow(post.createdOn).time} ${getTimeToShow(post.createdOn).value} ago`}
            avatar={post?.author?.avatar}
            imageStyle={styles.cardImageRadius}
            imageBlockStyle={{
              paddingTop: theme.SIZES.BASE / 2,
              paddingHorizontal: theme.SIZES.BASE / 3,
            }}
            image={post?.image}
          />
          <View style={styles.cardContent}>
            <Text>{post.body}</Text>
          </View>
        </>
      );
    } else {
      return (
        <Card
          flex

          borderless
          shadowColor={theme.COLORS.BLACK}
          style={styles.card}
          title={post?.author?.userName}
          caption={`${getTimeToShow(time).time} ${getTimeToShow(time).value} ago`}

          avatar={post?.author?.avatar}
          imageStyle={styles.cardImageRadius}
          imageBlockStyle={{
            paddingTop: theme.SIZES.BASE / 2,
            paddingHorizontal: theme.SIZES.BASE / 3,
          }}
          image={post?.image}
        />
      );
    }
  };

  return (
    <ScrollView style={{ marginTop: 10, marginBottom: 0 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Block flex>
          <Block flex space="between" style={styles.cards}>
            {(() => {
              return data.map(post => {
                {/* time=post.createdOn */ }
                console.log(post, "<<<community post")
                return cardImageText(post)
                // <Card
                //   flex
                //   borderless
                //   shadowColor={theme.COLORS.BLACK}
                //   style={styles.card}
                //   body={post.body}
                //   author={post?.author?.userName}
                //   // title={post?.author?.userName}
                //   caption={`${getTimeToShow(post.createdOn).time} ${getTimeToShow(post.createdOn).value} ago`}

                //   avatar={post?.author?.avatar}
                //   imageStyle={styles.cardImageRadius}
                //   imageBlockStyle={{
                //     paddingTop: theme.SIZES.BASE / 2,
                //     paddingHorizontal: theme.SIZES.BASE / 3,
                //   }}
                //   // image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
                //   image={post.image}
                // // image={() =>  "https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300" }
                // />
              })
            })()}
            {/* {cardImageText()}
          {cardImageText()} */}
          </Block>
        </Block>
      </SafeAreaView>
    </ScrollView>
  );
}

export default CommunityPost;

const styles = StyleSheet.create({
  cardContent: {
    marginTop: -19,
    width: width - theme.SIZES.BASE * 4.5,
    marginHorizontal: 17.5,
    padding: 10,
    marginBottom: 10,
    textAlign: "left",
    backgroundColor: "#fff",
    elevation: 15,
    borderTopColor: "grey",
    borderTopWidth: 0.5,
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
  card: {
    backgroundColor: "#fff",
    width: width - theme.SIZES.BASE * 4.5,
    marginVertical: theme.SIZES.BASE * 0.875,
    height: "100%",
    elevation: 15
  },
  cardImageRadius: {
    borderRadius: theme.SIZES.BASE * 0.7,
    width: "100%",
    alignSelf: "center",
  },
  cards: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 30
  },
});
