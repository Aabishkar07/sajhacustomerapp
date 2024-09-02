import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Product({ product, onPress, onPressCart }) {
  return (
    <Pressable
      onPress={onPress}
      className="p-2 mx-2 my-5 border border-gray-200 shadow-sm shadow-slate-200"
    >
      <View className="relative">
        <Image
          source={{ uri: product.full_image_path }}
          className=" p-2 h-[20vh] object-cover"
        />
      </View>
      {product.discount_amount > 0 && product.product_price > 0 && (
        <View style={styles.dis}>
          <Text
            style={{ zIndex: 90, color: "#fff" }}
            className="text-xs font-semibold"
          >
            {((product.discount_amount / product.product_price) * 100).toFixed(
              0
            )}
            % off
          </Text>
        </View>
      )}

      <View className="">
        <View className="flex-row justify-between px-2 pt-1 pr-1">
          <View>
            <Text className="text-xs font-semibold text-slate-500">
              {product.category.category_name}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row pl-2 mt-2">
        <Text style={styles.productName}>
          {product.product_name.substring(0, 32)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-col pb-2 pl-2 mt-2">
          <Text className="text-base font-semibold text-orange-700 ">
            Rs. {product.product_price - product.discount_amount}
          </Text>
          {product.discount_amount > 0 ? (
            <Text className="text-sm line-through text-slate-400">
              Rs. {product.product_price}
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <Pressable
          className="items-center justify-center w-12 h-8 mr-2 bg-blue-600 rounded-lg"
          onPress={onPressCart}
        >
          <Icons name="heart" size={20} color={"#fff"} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F5F5F5",
  },
  container1: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  gridItemContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: 200,
  },
  productName: {
    fontSize: 14,
  },
  dis: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 20,
    backgroundColor: "#FF5733", // Background color
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  // categoryTitle: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginTop: 20,
  //   marginLeft: 16,
  // },
});
