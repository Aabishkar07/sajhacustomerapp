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
import axios from "axios";
import { BaseUrl } from "@/components/baseurl/baseurl";

const Profile = () => {
  const [hasEmail, setHasEmail] = useState(false);

  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
    gender: '',
    birthday: '',
  });

  const fetchData = async () => {
    const email = await AsyncStorage.getItem('userEmail');
    try {
      const response = await axios.get(`${BaseUrl}customer/customerdata/${email}`);
      const customerData = response.data;
      console.log(customerData);
      setData(customerData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSubmit = async () => {
    try {
      await AsyncStorage.removeItem("userEmail");
      router.push("/profile/login");
    } catch (error) {
      console.error("Failed to remove email from AsyncStorage", error);
    }
  };

  return (
    <View>
  
        <View>
          <Header />

          <View>
            <View className="flex-row items-center px-4 py-3 gap-x-4">
              <View className="p-1 bg-white rounded-full w-14 h-14">
                <View className="w-full h-full p-2">
                  <FontAwesome name="user-circle-o" size={30} color="007bff" />
                </View>
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-800">
                {data.name}                
                </Text>
              </View>
            </View>

            <View>
              <Text className="px-6 py-2 text-xl font-bold">My Order</Text>

              <View className="flex-row justify-between px-6 py-2 bg-white">
                <Pressable
                  onPress={() => router.push("/orders/processing")}
                  className="items-center"
                >
                  <Ionicons name="bag-handle-sharp" size={30} color="#007bff" />
                  <Text>Processing</Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/orders/shipped")}
                  className="items-center"
                >
                  <Ionicons name="bag-handle-sharp" size={30} color="#007bff" />
                  <Text>To Ship</Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/orders/delivered")}
                  className="items-center"
                >
                  <Ionicons name="bag-check" size={30} color="#007bff" />
                  <Text>Delivered</Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/orders/cancel")}
                  className="items-center"
                >
                  <Icon name="cancel" size={30} color="#007bff" />
                  <Text>Return And Cancel</Text>
                </Pressable>
              </View>
            </View>

            <View className="mt-4" style={{ paddingHorizontal: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 15,
                  marginBottom: 20,
                  padding: 15,
                  elevation: 3,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/addproduct")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon name="help-circle" size={30} color="#007bff" />
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Add Product
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/setting")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon name="cog" size={30} color="#007bff" />
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Settings
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Icon name="logout" size={30} color="#dc3545" />
                  <Text
                    style={{
                      marginLeft: 15,
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#dc3545",
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          
          </View>
        </View>
    </View>
  );
};

export default Profile;
