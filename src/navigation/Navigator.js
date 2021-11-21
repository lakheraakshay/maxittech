import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "@expo/vector-icons/Ionicons";
import CommunityScreen from "../screens/CommunityScreen";
import ContentPostScreen from "../screens/ContentPostScreen";
import ContentDetailScreen from "../screens/ContentDetailScreen";
import CommunityDetailScreen from "../screens/CommunityDetailScreen";
import CommunityQuestionaireDetail from "../screens/CommunityQuestionairDetails";
import OriginalDetailScreen from "../screens/OriginalDetailScreen";
import OriginalsScreen from "../screens/OriginalsScreen";
import MessageScreen from "../screens/MessageScreen";
import MessageDetailScreen from "../screens/MessageDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import ChallengeScreen from "../screens/ChallengeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import NotificationScreen from "../screens/NotificationScreen";
import FollowerDetailScreen from "../screens/FollowerDetailScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import CommunityMemberScreen from "../screens/CommunityMemberScreen";
import SplashScreen from "../screens/SplashScreen";
import SendPostChallenge from "../screens/SendPostChallenge";
import ShareDetailScreen from "../screens/ShareDetailScreen";
import UserProfileFollowerScreen from "../screens/UserProfileFollowerScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AboutScreen from "../screens/AboutScreen";
import SendFeedbackScreen from "../screens/SendFeedBackScreen";
import SupportScreen from "../screens/SupportScreen";
import CommunitySendPostScreen from "../screens/ComunitySendPostScreen";
import MagazineScreen from "../screens/MagazineScreen";
import AuroScholar from "../screens/AuroScholar";
import EditPostScreen from "../screens/EditPostScreen";
import InsightScreen from "../screens/InsightScreen";
import ChallengeDetail from "../screens/ChallengeDetail";
import ContentPreview from "../screens/ContentPreview";
import SwipeGesture from "../screens/SwipeableLeft";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  const [user, setuser] = useState();
  useEffect(() => {
    (async () => {

      const user = await AsyncStorage.getItem("quinkUser");
      setuser(JSON.parse(user));
      console.log(user, "d")
    })();
  }, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#000",
        inactiveTintColor: "#000119",
        style: {
          height: 55,
          paddingVertical: 15,
          justifyContent: "center",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 30,
        },
      }}
    >
      <Tab.Screen
        name="SwipeGesture"
        component={SwipeGesture}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={27}
              style={{
                backgroundColor: focused ? "#e6e6e6" : "#fff",
                borderRadius: 5,
                padding: 2,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChallengeScreen"
        component={ChallengeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "school-sharp" : "school-outline"}
              color={color}
              size={29}
              style={{
                backgroundColor: focused ? "#e6e6e6" : "#fff",
                borderRadius: 5,
                padding: 2,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OriginalsScreen"
        component={OriginalsScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "newspaper-sharp" : "newspaper-outline"}
              color={color}
              size={27}
              style={{
                backgroundColor: focused ? "#e6e6e6" : "#fff",
                borderRadius: 5,
                padding: 2,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? "people-sharp" : "people-outline"}
              color={color}
              size={27}
              style={{
                backgroundColor: focused ? "#e6e6e6" : "#fff",
                borderRadius: 5,
                padding: 2,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={{
                uri: user?.avatar
                  ? user?.avatar
                  : "https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar",
              }}
              style={{
                width: 31,
                height: 31,
                borderRadius: 30,
                margin: 8,
                borderWidth: 1.5,
                borderColor: focused ? "#000" : "#fff",
                alignSelf: "center",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      {/* {(async () => {
        // console.log(userToken)
      })()} */}
      {/* const userToken = await AsyncStorage.getItem("Quink-Post"); */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />

      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      {/* {(async () => {
        const userToken = await AsyncStorage.getItem("Quink-Post");
        if (userToken != "xyz") {
          return (<>
            <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>)
        }
        else {
          return (<>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
          </>)
        }
      })()} */}

      <Stack.Screen
        name="CommunityQuestionaireDetail"
        component={CommunityQuestionaireDetail}
      />
      <Stack.Screen
        name="ContentDetailScreen"
        component={ContentDetailScreen}
      />
      <Stack.Screen
        name="CommunityDetailScreen"
        component={CommunityDetailScreen}
      />
      <Stack.Screen
        name="CommunityMemberScreen"
        component={CommunityMemberScreen}
      />
      <Stack.Screen name="SendPostChallenge" component={SendPostChallenge} />
      <Stack.Screen
        name="OriginalDetailScreen"
        component={OriginalDetailScreen}
      />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen
        name="MessageDetailScreen"
        component={MessageDetailScreen}
      />
      <Stack.Screen name="ShareDetailScreen" component={ShareDetailScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MagazineScreen" component={MagazineScreen} />
      <Stack.Screen name="AuroScholar" component={AuroScholar} />
      <Stack.Screen name="ContentPostScreen" component={ContentPostScreen} />
      <Stack.Screen name="InsightScreen" component={InsightScreen} />
      <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetail} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="CommunitySendPostScreen"
        component={CommunitySendPostScreen}
      />
      {/* <Stack.Screen name="SendPostChallenge" component={SendPostChallenge} /> */}
      <Stack.Screen
        name="FollowerDetailScreen"
        component={FollowerDetailScreen}
      />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen
        name="UserProfileFollowerScreen"
        component={UserProfileFollowerScreen}
      />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="ContentPreview" component={ContentPreview} />
      <Stack.Screen name="SendFeedbackScreen" component={SendFeedbackScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
