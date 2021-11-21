import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";
import axios from "axios";
import BACKEND from '../constants/BACKEND'

// const dimension = Dimensions.get("window").width;
const { widht, height } = Dimensions.get("screen");
const Item = (props) => {

  // console.log(props.item, "kkkk")
  const item = props.item
  const navigation = props.navigation
  // console.log(item, ">>>>>>>>>>>>>>>;;;;;;");
  return (
    <View style={styles.listItem}>
      {/* <Image
        source={{ uri:  "" }}
        style={{ width: 60, height: 60, alignSelf: "center", borderRadius: 30 }}
      /> */}
      <View style={{ alignItems: "center", flex: 1, marginLeft: 7 }}>
        <Text>{item?.question}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate('CommunityQuestionaireDetail', { data: props?.item })}
      >
        <Text
          style={{
            color: "black",
            fontWeight: 'bold',
            backgroundColor: "#e2e2e2",
            paddingVertical: 2,
            paddingHorizontal: 5,
            borderRadius: 10,
            fontSize: 12
          }}
        >
          View
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CommunityQuestionaire = (props) => {
  // console.log(props.id)
  const [data, setdata] = useState([])
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND}/community/inside/question/${props.id}`)
        const data = result.data.questions
        setdata(data)
        setLoading(false)
        // console.log(data)
      } catch (e) { console.log(e) }
    })()
  }, [])



  return (
    <SafeAreaView style={styles.container}>
      {(() => {
        if (!Loading) {
          return (<>
            <FlatList
              style={{ marginBottom: 70 }}
              data={data}
              renderItem={({ item }) => <Item item={item} navigation={props.navigation} />}
              keyExtractor={(item) => item.email}
              showsVerticalScrollIndicator={false}
            />
          </>)
        }
        else {
          return (<>
            <View
              style={{
                backgroundColor: "#fff",
                height: height / 1.8,
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={55} color="#667db6" />
            </View>
          </>)
        }
      })()}

      {/* {(() => {
        return props.data.map(que => {
          return <Item item={que} navigation={props.navigation} />
        })
      })()} */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  listItem: {
    margin: 10,
    elevation: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 18,
  },
});
