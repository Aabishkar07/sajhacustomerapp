import Login from "@/components/auth/login";
import Header from "@/components/layouts/Header";
import React, { Component } from "react";
import { Text, View } from "react-native";

export default class profile extends Component {
  render() {
    return (
      <View>
        <Header />
        <View>
          <Login />
        </View>
      </View>
    );
  }
}
