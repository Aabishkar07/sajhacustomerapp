import React, { Component } from 'react'
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Key from 'react-native-vector-icons/FontAwesome5';
import {router} from 'expo-router';
import Header from '@/components/layouts/Header';
import { Signup } from '@/components/auth/signup';




export default class index extends Component {
  render() {
    return (
        <View> 
        <Header />
    <Signup/>
    </View>
    )
  }
}
