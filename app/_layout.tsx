import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from '@/context/context';
import { getCart } from '@/context/func';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

 

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // cart 
  const [cartItems, setCartItems] = useState([]);
  const authContext = useMemo(() => {
    return {
      loadCart: async () => {
        const cart = await getCart();
        setCartItems(cart);
      },
    };
  }, [cartItems]);
  useEffect(() => {}, [cartItems]);

  return (
    <AuthContext.Provider value={authContext}>

    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false,title:"Home" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />

        
      </Stack>
    </ThemeProvider>
    </AuthContext.Provider>
  );
}
