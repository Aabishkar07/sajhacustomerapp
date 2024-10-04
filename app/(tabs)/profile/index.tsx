import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Header from "@/components/layouts/Header";
import Login from "@/components/auth/login";
import Profile from "./profile";

const Index = () => {
  const [hasEmail, setHasEmail] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        console.log(email, "email");
        if (email) {
          setHasEmail(true);
        }
      } catch (error) {
        console.error("Failed to fetch the email from AsyncStorage", error);
      }
    };
    checkToken();
  }, []);


  return (
    <View>
      {hasEmail ? (
    
      <Profile/>
      ) : (
        <Login />
      )}
    </View>
  );
};

export default Index;
