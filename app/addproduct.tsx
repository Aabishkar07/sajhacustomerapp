import { router } from 'expo-router'
import React from 'react'
import { Pressable, Text } from 'react-native'

const addproduct = () => {
  return (

    <Pressable onPress={()=>router.push('/createproduct')}>

    <Text>
Add my product    </Text>
    </Pressable>
  )
}

export default addproduct
