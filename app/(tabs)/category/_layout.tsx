import { Stack } from 'expo-router';
import React from 'react';

export default function CategoryLayout() {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: false,title:"Cat" }} />
       <Stack.Screen name="subcategory" options={{ headerShown: false,title:"Cat" }} />
       <Stack.Screen name="products" options={{ headerShown: false,title:"Cat" }} />
    </Stack>
  );
}
