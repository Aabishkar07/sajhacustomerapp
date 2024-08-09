import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileLayout() {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: false,title:"Home" }} />
       <Stack.Screen name="signup" options={{ headerShown: false,title:"signup" }} />
       <Stack.Screen name="login" options={{ headerShown: false,title:"login" }} />
      
    </Stack>
  );
}
