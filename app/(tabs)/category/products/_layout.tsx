import { Stack } from 'expo-router';
import React from 'react';

export default function ProductLayout() {
  return (
    <Stack>
       <Stack.Screen name="[index]" options={{ headerShown: false,title:"Cat" }} />
    </Stack>
  );
}
