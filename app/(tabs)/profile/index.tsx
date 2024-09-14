import Login from "@/components/auth/login";
import Header from "@/components/layouts/Header";
import React, { Component } from "react";
import { ImageBackground, Pressable, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default class index extends Component {
  render() {
    return (
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
                Anup Kasula
              </Text>
            </View>
          </View>

          <View className="">
            <Text className="px-6 py-2 text-xl font-bold">My Order</Text>

            <View className="flex-row justify-between px-6 py-2 bg-white">
              <Pressable onPress={()=>router.push("/orders/processing")} className="items-center">
                <Ionicons name="bag-handle-sharp" size={30} color="#007bff" />

                <Text>Processing</Text>
              </Pressable>
              <Pressable onPress={()=>router.push("/orders/shipped")} className="items-center">
                <Ionicons name="bag-handle-sharp" size={30} color="#007bff" />

                <Text>To Ship</Text>
              </Pressable>

              <Pressable onPress={()=>router.push("/orders/delivered")} className="items-center">
                <Ionicons name="bag-check" size={30} color="#007bff" />
                <Text>Delivered</Text>
              </Pressable>

              <Pressable onPress={()=>router.push("/orders/cancel")} className="items-center">
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
                  Help Center
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Icon name="email" size={30} color="#007bff" />
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 18,
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Message
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

          {/* <View className="flex-row items-center justify-between px-4 py-3 mt-3 bg-white gap-x-4">
            <View className="items-center">
              <Icon name="message-outline" size={30} color="#007bff" />
              <Text>My Message</Text>
            </View>

            <View className="items-center">
              <Icon name="help-circle" size={30} color="#007bff" />

              <Text>Help Center</Text>
            </View>

            <View className="items-center">
              <Icon name="refresh" size={30} color="#007bff" />

              <Text>Change Password</Text>
            </View>
          </View> */}
        </View>
        <View className="flex items-center justify-center text-center">
          <View>
            <Text className="text-xl text-[#fe6700]">Profile</Text>
          </View>
          <View>
            <Text
              className="text-2xl text-[#0066ff]"
              onPress={() => {
                router.push("/profile/login");
              }}
            >
              LogIn
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
