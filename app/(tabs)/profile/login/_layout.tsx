import { Stack } from 'expo-router'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class _layout extends Component {
  render() {
    return (
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false,title:"signup" }} />
     </Stack>
    )
  }
}
