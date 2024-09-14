import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from '@/context/context';
import { getCart } from '@/context/func';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/layouts/Header';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setcartCount] = useState(0);

  useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);
  useEffect(() => {    countCart()}, [cartItems]);
  const countCart = async () => {
    // const count = await getCart();
    const count1 = await AsyncStorage.getItem("cart");
    const count = JSON.parse(count1);
    console.log(count.length?count.length:0, "lengthss");
    setcartCount(count.length?count.length:0);
  };
  const authContext = useMemo(() => ({ loadCart: async () => setCartItems(await getCart()) }), [cartItems]);

  if (!loaded) return null;
  return (
    <AuthContext.Provider value={authContext}>
      <>
   
      
      <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="productcart" options={{ headerShown: false, title: `Cart(${cartCount})` }} />
          <Stack.Screen name="productdetails/[index]" options={{ headerShown: false, title: "SinglePage" }} />
          <Stack.Screen name="checkout/index" options={{ headerShown: false, title: "Checkout" }} />
          <Stack.Screen name="orders/processing/index" options={{ headerShown: false, title: "Processing Order" }} />
          <Stack.Screen name="orders/cancel/index" options={{ headerShown: false, title: "Cancel Order" }} />
          <Stack.Screen name="orders/delivered/index" options={{ headerShown: false, title: "Delivered Order" }} />
          <Stack.Screen name="orders/shipped/index" options={{ headerShown: false, title: "Shipped Order" }} />
          <Stack.Screen name="orderdetail/[index]" options={{ headerShown: false, title: "Order Detail" }} />
          
        </Stack>
      </ThemeProvider>
      </>
    </AuthContext.Provider>
  );
}
