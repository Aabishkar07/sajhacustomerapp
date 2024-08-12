import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { AuthContext } from "@/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(0);
  const auth = useContext(AuthContext);

  const cartCount = async () => {
    // const count = await getCart();
    const count1 = await AsyncStorage.getItem("cart");
    const count = JSON.parse(count1);
    console.log(count.length, "length");
    setCartItems(count.length);
  };

  useEffect(() => {
    cartCount();
    console.log("adsaaa");
  }, [auth]);

  return (
    <View>
      <View
        style={{ zIndex: 0 }}
        className="pt-11  justify-between flex-row items-center bg-white pb-2 border-b-[0.5px] border-slate-400"
      >
        <View className=" w-[60%] -left-4">
          <Image
            source={require("../../assets/images/logo.png")}
            className="object-contain w-full h-12 "
            style={{ resizeMode: "contain" }}
          />
        </View>
        <TouchableOpacity
          className="pr-4"
          onPress={() => {
            router.push("/productcart");
          }}
        >
          <View>
            <View style={styles.cartIcon}>
              <Icons name="cart" size={30} color={"#0066ff"} />
            </View>
            {/* {cartItems > 0 && ( */}
            <View style={styles.cartItemCount}>
              <Text style={styles.cartItemCountText}>{cartItems}</Text>
            </View>
            {/* )} */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  cartIcon: {
    position: "relative",
    marginRight: 10,
  },
  cartItemCount: {
    position: "absolute",
    top: -5,
    right: 2,
    backgroundColor: "#fe6700",
    borderRadius: 50,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
});
