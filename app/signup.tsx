import React, { Component } from 'react'
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'

import {router} from 'expo-router';
import Signup from '@/components/auth/signup'


export class signups extends Component {
  render() {
    return (
      <View>
 
 <Signup/>
      </View>
    )
  }
}

export default signups
