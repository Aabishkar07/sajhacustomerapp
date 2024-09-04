// cartFunctions.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// get cart data 
export const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
};

// add cart to Asyncstorage 
export const addCart = async (id,product_id, name, price, quantity, image_url,variation) => {
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
      cart.push({ id,product_id, name, price, quantity, image_url,variation });
    }

    // console.log(cart, "single");

    AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

// increment cart quantity 
export const addQuantity = async (id) => {
  try {
    let cart1 = await AsyncStorage.getItem("cart");

    var cart = [];
    if (cart1) {
      cart = JSON.parse(cart1);
    }
    const existingProductIndex = cart.findIndex((item) => item.id === id);

    console.log(existingProductIndex, "product");

    cart[existingProductIndex].quantity += 1; 

    AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error adding Quantity to cart:", error);
  }
};

// decremant cart quantity 
export const subQuantity = async (id) => {
  try {
    let cart1 = await AsyncStorage.getItem("cart");

    var cart = [];
    if (cart1) {
      cart = JSON.parse(cart1);
    }
    const existingProductIndex = cart.findIndex((item) => item.id === id);
    if(cart[existingProductIndex].quantity>1)
    {
        console.log(cart[existingProductIndex].quantity, "productssss");
        cart[existingProductIndex].quantity -= 1; 
        AsyncStorage.setItem("cart", JSON.stringify(cart));
    }
  } catch (error) {
    console.error("Error adding Quantity to cart:", error);
  }
};

export const clearCart = () => {
  AsyncStorage.setItem("cart", JSON.stringify([]));
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
