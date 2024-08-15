import React, { Component } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export class Notification extends Component {
  render() {
    return (
      <ScrollView style={{ padding: 10 }}>
        <View className="mt-10">
          <View className="flex-row items-center p-2">
            <Icon name="notifications" size={24} color="#000" />
            <Text className="ml-2 text-xl">Notification</Text>
          </View>

          <View
            style={{
              backgroundColor: "#f4f4f4",
              borderTopWidth: 1,
              borderTopColor: "#e0e0e0",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <TouchableOpacity
              style={{
                width: "33.33%",
                padding: 15,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
              }}
            >
              <Icon name="cog" size={28} color="#1E90FF" />
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 16,
                  color: "#1E90FF",
                  fontWeight: "600",
                }}
              >
                Activities
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "33.33%",
                padding: 15,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                borderRightWidth: 1,
                borderRightColor: "#e0e0e0",
              }}
            >
              <Icon name="help-circle" size={28} color="#1E90FF" />
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 16,
                  color: "#1E90FF",
                  fontWeight: "600",
                }}
              >
                Chats
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "33.33%",
                padding: 15,
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                borderRightWidth: 1,
                borderRightColor: "#e0e0e0",
              }}
            >
              <Icon name="email" size={28} color="#1E90FF" />
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 16,
                  color: "#1E90FF",
                  fontWeight: "600",
                }}
              >
                Orders
              </Text>
            </TouchableOpacity>
          </View>

          {/* Notification List Section */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Recent Notifications</Text>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="alert-circle" size={24} color="#FFA500" />
              <Text style={{ marginLeft: 10, fontSize: 16 }}>System update available</Text>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="message-text" size={24} color="#4CAF50" />
              <Text style={{ marginLeft: 10, fontSize: 16 }}>New message from support</Text>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#e0e0e0",
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="shopping" size={24} color="#1E90FF" />
              <Text style={{ marginLeft: 10, fontSize: 16 }}>Your order has been shipped</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Notification;
