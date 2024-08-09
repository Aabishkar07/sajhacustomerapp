
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
import { router } from 'expo-router'


const Header = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(0);


  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View>
      <View
        style={{ zIndex: 0 }}
        className="pt-11 px-5 justify-between flex-row items-center bg-white pb-5 border-b-[0.5px] border-slate-400"
      >
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Icons name="" size={25} color={"#000"} />
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/logo.png")}
          className="h-10 mt-1 w-[60%] object-contain"
          style={{ resizeMode: "contain" }}
        />
        <TouchableOpacity onPress={() => {router.push('/productcart')}}>

          <View>
            <View style={styles.cartIcon}>
              <Icons name="cart" size={30} color={"#000"} />
            </View>
            {/* {cartItems > 0 && ( */}
            <View style={styles.cartItemCount}>
              <Text style={styles.cartItemCountText}>{cartItems}</Text>
            </View>
            {/* )} */}
          </View>
        </TouchableOpacity>
      </View>
      {/* <View>
        <TextInput
          placeholder="search..."
          className="border-salte-200 border-[0.5px] mx-4 my-2 rounded-xl px-5"
          style={{ height: 50, backgroundColor: "white" }}
        />
      </View> */}
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
    backgroundColor: "#dc143c",
    borderRadius: 50,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountText: {
    color: "#FFFFFF", 
    fontWeight: "bold",
    fontSize: 12,
  },
});
