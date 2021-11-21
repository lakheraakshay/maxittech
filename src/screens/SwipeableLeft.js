import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const {width, height} = Dimensions.get('screen')

const todoList = [
  { id: "1", text: "" },
];
const Separator = () => <View style={styles.itemSeparator} />;
const SwipeGesture = (props) => {
const LeftSwipeActions = () => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "#ccffbd", justifyContent: "center" }}
    >
      <Text
        style={{
          color: "#40394a",
          paddingHorizontal: 10,
          fontWeight: "600",
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        
      </Text>
    </View>
  );
};
const rightSwipeActions = () => {
  return (
    <View
      style={{
        // backgroundColor: "#ff8303",
        justifyContent: "center",
        flex: 1
      }}
    >
      <Text
        style={{
          color: "#1b1a17",
        //   paddingHorizontal: 10,
          fontWeight: "600",
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        
      </Text>
    </View>
  );
};
const swipeFromLeftOpen = () => {
    props?.navigation?.navigate("ContentPostScreen");
};
const swipeFromRightOpen = () => {
  props?.navigation?.navigate("MessageScreen");
};
const ListItem = ({ text }) => (
  <Swipeable
    renderLeftActions={LeftSwipeActions}
    renderRightActions={rightSwipeActions}
    onSwipeableRightOpen={swipeFromRightOpen}
    onSwipeableLeftOpen={swipeFromLeftOpen}
  >
    <View
      style={{
        paddingHorizontal: 30,
        height: height,
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 24 }} style={{ fontSize: 20 }}>
        {text}
      </Text>
    </View>
  </Swipeable>
);
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginVertical: 20 }}>
          Swipe right or left
        </Text>
        <FlatList
          data={todoList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListItem {...item} />}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: "#444",
  },
});
export default SwipeGesture;
