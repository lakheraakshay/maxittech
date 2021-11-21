import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import Quinkpost from "../../assets/imgs/Quinkpost.jpg";
import { View } from "react-native-animatable";
import axios from "axios";
import BACKEND from "../constants/BACKEND";

const { width } = Dimensions.get("screen");

const ProductNoEditAndDelete = (props) => {
  // console.log(props.data, ">>>>>>>>>>>>>>>>>>>>>>>>This i si props")
  const [changeLayout, setchangeLayout] = useState(false);

  const handleChangeLayout = () => {
    setchangeLayout(true);
  };
  const navigation = props.navigation;
  const editThisPost = () => {
    navigation.navigate("EditPostScreen", { data: props.data })
  }
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const result = await axios.get(`${BACKEND}/post/ofUser/${props.data}`)
  //       console.log(result)
  //       setstate(result.data.posts)

  //     } catch (e) { console.log(e) }
  //   })()
  // })
  // console.log(props.data)

  // console.log(this.props)
  // console.log(this.props,"this is porps")
  // console.log(props)

  const { product, horizontal, full, style, priceColor, imageStyle } = props;
  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];


  const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete Action",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK", onPress: async () => {
            try {
              await axios.delete(`${BACKEND}/post/${props?.data?._id}`)
            } catch (e) { console.log(e) }
          }
        },
      ],
      { cancelable: false }
    );

  return (
    <Block
      row={horizontal}
      card
      flex
      style={[styles.product, styles.shadow, style]}
    >
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("ContentDetailScreen", {
            data: props.data,
          })
        }
      >
        <Block flex style={[styles.imageContainer, styles.shadow]}>
          <Image
            source={props?.data?.image ? { uri: props.data.image } : Quinkpost}
            style={imageStyles}
          />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Block flex space="between" style={styles.productDescription}>
          <Text size={14} style={styles.productTitle}>
            {props.data.title}
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity>
              <Text size={14} muted={!priceColor} color={priceColor}>
                Read
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{ marginLeft: "auto", alignSelf: "center" }}
            > */}
            {/* <View style={{ display: "flex", flexDirection: "row", marginLeft: "auto", alignSelf: "center" }}>
              <TouchableOpacity style={{ marginRight: 15 }} onPress={editThisPost}>
                <Text muted={!priceColor} color={priceColor}>
                  Edit
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={createTwoButtonAlert}>
                <Text muted={!priceColor} color={priceColor}>
                  Delete
                  </Text>
              </TouchableOpacity>
            </View> */}

            {/* </TouchableOpacity> */}
          </View>
          {/* <TouchableOpacity>
            <Icon2 name="ellipsis-vertical-outline" />
          </TouchableOpacity> */}
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

export default ProductNoEditAndDelete;

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
