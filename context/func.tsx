// cartFunctions.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
};

export const addCart = async (id, name, price, quantity, image_url) => {
  try {
    let cart1 = await AsyncStorage.getItem("cart");

    var cart = [];
    if (cart1) {
      cart = JSON.parse(cart1);
    }
    const existingProductIndex = cart.findIndex((item) => item.id === id);

    console.log(existingProductIndex, "product");

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity; // Update the quantity
    } else {
      cart.push({ id, name, price, quantity, image_url });
    }

    // console.log(cart, "single");

    AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export const clearCart = () => {
  AsyncStorage.setItem("cart", "");
};

export const clearSingle = async (id) => {
  try {
    let cart1 = await AsyncStorage.getItem("cart");

    var cart = [];
    if (cart1) {
      cart = JSON.parse(cart1);
    }
    const existingProductIndex = cart.findIndex((item) => item.id === id);

    console.log(existingProductIndex, "product");

    if (existingProductIndex > -1) {
      cart.splice(existingProductIndex, 1);
      // cart[existingProductIndex].quantity += quantity; // Update the quantity
    }
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};
