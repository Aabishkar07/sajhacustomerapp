import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SectionList,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";

import { AuthContext } from "@/context/context";
import { addCart } from "@/context/func";
import { Button } from "react-native";
import RatingModal from "../modal/RatingModal";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AirbnbRating, Rating } from "react-native-ratings";
import axios from "axios";
import { BaseUrl } from "../baseurl/baseurl";
const SingleProductDetails = ({ productData, productAttribute }) => {
  // Assuming useLocalSearchParams is a hook that gets query parameters or similar
  const { id } = useLocalSearchParams();
  console.log("myid", id);

  const [sections, setSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = React.useState(false);
  
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Default format, can be customized
  };

  const handleQuantityChange = (value) => {
    if (value >= 0) setQuantity(value);
  };

  useEffect(() => {
    if (productAttribute) {
      console.log("Rendered more hooks", productAttribute);
      const groupedAttributes = productAttribute.reduce((acc, attribute) => {
        console.log("Rendered ", attribute.group.name);
        if (!acc[attribute.group.name]) {
          acc[attribute.group.name] = [];
        }
        acc[attribute.group.name].push(attribute);
        return acc;
      }, {});

      // Convert groupedAttributes to array format for SectionList
      const newSections = Object.keys(groupedAttributes).map((group) => ({
        title: group,
        data: groupedAttributes[group],
      }));

      setSections(newSections);

      // Set default selected items (first item in each group)
      const defaultSelections = newSections.reduce((acc, section) => {
        if (section.data.length > 0) {
          acc[section.title] = {
            id: section.data[0].id,
            name: section.data[0].name,
          };
        }
        return acc;
      }, {});
      setSelectedItems(defaultSelections);
    }
  }, [productAttribute]);

  const handleItemClick = (item, groupName) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [groupName]: {
        id: item.id,
        name: item.name,
      },
    }));
  };

  const auth = useContext(AuthContext);
  const handleCartChange = async () => {
    // check min quantity
    var price = 0;

    if (
      productData.is_wholesale === 1 &&
      Array.isArray(productData.wholesale_product)
    ) {
      // Sort the wholesale product array based on the min_quantity in ascending order
      const sortedWholesaleProducts = productData.wholesale_product.sort(
        (a, b) => a.min_quantity - b.min_quantity
      );

      // Check if the quantity is less than the minimum min_quantity
      const minQuantityProduct = sortedWholesaleProducts[0];

      if (quantity < minQuantityProduct.min_quantity) {
        console.log("Minimum min_quantity:", minQuantityProduct.min_quantity);
        return false;
      }

      // Iterate over the sorted array to find the correct price based on quantity
      for (let i = 0; i < sortedWholesaleProducts.length; i++) {
        const currentProduct = sortedWholesaleProducts[i];
        const nextProduct = sortedWholesaleProducts[i + 1]; // Look at the next tier

        // If the current product's min_quantity is less than or equal to the quantity
        // and either there's no next product or the quantity is less than the next tier's min_quantity
        if (
          quantity >= currentProduct.min_quantity &&
          (!nextProduct || quantity < nextProduct.min_quantity)
        ) {
          price = currentProduct.wholesale_price;
          break; // Exit the loop since we found the correct tier
        }
      }

      console.log("Price for quantity", quantity, "is", price);
    } else {
      price = productData.product_price - productData.discount_amount;
    }

    // var join = Object.values(selectedItems).join("-");
    const join = Object.values(selectedItems)
      .map((item) => item.name)
      .join("-");
    console.log("ddasasas", join);
    console.log("cart change", productData.id + "-" + join);
    var cart_id = "";
    var variation = {};
    if (join) {
      cart_id = productData.id + "-" + join;
      variation = selectedItems;
    } else {
      cart_id = productData.id + "";
      variation = "";
    }

    var abc = selectedItems ? selectedItems : null;
    console.log("asssssdd", abc);
    console.log("asssssdd", abc);

    try {
      await addCart(
        cart_id,
        productData.id,
        productData.product_name,
        price,
        quantity,
        productData.featured_image,
        productData.is_wholesale,
        variation
      );
      auth.loadCart();

      // console.log(await AsyncStorage.getItem("cart"));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };


  const handleSubmit = () => {
    if (review.trim() === '' || rating === 0) {
      Alert.alert('Error', 'Please provide a review and a rating');
      return;
    }
    console.log('Review:', review);
    console.log('Rating:', rating);
    Alert.alert('Success', 'Review submitted!');
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {productData ? (
        <View>
          {/* <Text>{productData.product_name}</Text> */}

          <View style={{ padding: 16, marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: -8,
              }}
            >
              <View style={{ width: "100%", paddingHorizontal: 8 }}>
                <View
                  style={{ borderRadius: 12, overflow: "hidden", margin: 8 }}
                >
                  <Image
                    source={{ uri: productData.featured_image }}
                    style={{ width: "100%", height: 288, resizeMode: "cover" }}
                  />
                </View>

                <View
                  style={{ flexDirection: "row", flexWrap: "nowrap", gap: 8 }}
                >
                  {["mouse2.jpg", "mouse3.jpg", "mouse4.jpg"].map(
                    (image, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          borderRadius: 12,
                          overflow: "hidden",
                          margin: 8,
                        }}
                      >
                        <Image
                          source={{
                            uri: `https://cdn.easyfrontend.com/pictures/products/${image}`,
                          }}
                          style={{
                            width: 120,
                            height: "auto",
                            borderRadius: 12,
                            resizeMode: "cover",
                          }}
                        />
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>

              <View style={{ width: "100%", paddingHorizontal: 8 }}>
                <View style={{ marginBottom: 24 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      lineHeight: 28,
                      fontWeight: "500",
                      marginBottom: 16,
                    }}
                  >
                    {productData.product_name}
                  </Text>
                  <Text className="text-[10px]">
                    {productData.category_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 24,
                    }}
                  >
                    <Text style={{ opacity: 0.7 }}>
                      <Text>4.0</Text>
                      <Text style={{ color: "yellow", marginHorizontal: 8 }}>
                        ★
                      </Text>
                      <Text
                        style={{
                          color: "blue",
                          fontWeight: "500",
                          marginLeft: 4,
                        }}
                      >
                        13 Reviews
                      </Text>
                      <Text style={{ marginLeft: 8 }}>104 Order</Text>
                    </Text>
                  </View>

                  {productData.is_wholesale === 1 ? (
                    <View className="flex-1">
                      <View style={styles.header}>
                        <Text style={styles.headerText}>Quantity Range</Text>
                        <Text style={styles.headerText}>Price</Text>
                      </View>
                      <FlatList
                        data={productData.wholesale_product}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          <View style={styles.row}>
                            <Text style={styles.cell}>
                              {item.min_quantity} - {item.max_quantity}
                            </Text>
                            <Text
                              className="font-semiboldr"
                              style={styles.cell}
                            >
                              Rs. {item.wholesale_price}
                            </Text>
                          </View>
                        )}
                      />

                      <Text>This is a wholesale product</Text>
                    </View>
                  ) : productData.is_secondhand === 1 ? (
                    <View>
                      <Text>This is a secondhand product</Text>

                      <View className="flex-row justify-between">
                        <Text
                          style={{
                            fontSize: 24,
                            color: "blue",
                            fontWeight: "500",
                          }}
                        >
                          Rs.{" "}
                          {productData.product_price -
                            productData.discount_amount}
                        </Text>

                        <Text
                          className="text-gray-600"
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            textDecorationLine: "line-through",
                          }}
                        >
                          Rs. {productData.product_price}
                        </Text>
                      </View>

                      <View className="mt-5 overflow-hidden border border-gray-300 rounded-lg">
                        <View className="flex-row border-b border-gray-300">
                          <View className="flex-1 p-2 bg-gray-200">
                            <Text className="font-bold text-center">ad_id</Text>
                          </View>
                          <View className="flex-1 p-2">
                            <Text className="font-bold text-center">
                              {productData.ad_id}
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row border-b border-gray-300">
                          <View className="flex-1 p-2 bg-gray-200">
                            <Text className="font-bold text-center">
                              Address
                            </Text>
                          </View>
                          <View className="flex-1 p-2">
                            <Text className="font-bold text-center">
                              {productData.secondhand_address}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-row border-b border-gray-300">
                          <View className="flex-1 p-2 bg-gray-200">
                            <Text className="font-bold text-center">
                              Negotiable
                            </Text>
                          </View>
                          <View className="flex-1 p-2">
                            <Text className="font-bold text-center">
                              {productData.secondhand_negotiable}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-row border-b border-gray-300">
                          <View className="flex-1 p-2 bg-gray-200">
                            <Text className="font-bold text-center">
                              Condition
                            </Text>
                          </View>
                          <View className="flex-1 p-2">
                            <Text className="font-bold text-center">
                              {productData.secondhand_condition}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-row border-b border-gray-300">
                          <View className="flex-1 p-2 bg-gray-200">
                            <Text className="font-bold text-center">
                              Used For
                            </Text>
                          </View>
                          <View className="flex-1 p-2">
                            <Text className="font-bold text-center">
                              {productData.secondhand_used_for}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-row border-b border-gray-300">
                          <View className="flex-1 p-2 bg-gray-200">
                            <Text className="font-bold text-center">
                              Ads Posted
                            </Text>
                          </View>
                          <View className="flex-1 p-2">
                            <Text className="font-bold text-center">
                              {formatDate(productData.created_at)}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-row border-b border-gray-300">
                          <View className="flex-1 p-2 bg-gray-200">
                            <Text className="font-bold text-center">
                              Ads Expiry
                            </Text>
                          </View>
                          <View className="flex-1 p-2">
                            <Text className="font-bold text-center">
                              {productData.secondhand_expiry_date}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <Text>This is a product</Text>
                      <View className="flex-row justify-between">
                        <Text
                          style={{
                            fontSize: 24,
                            color: "blue",
                            fontWeight: "500",
                          }}
                        >
                          Rs.{" "}
                          {productData.product_price -
                            productData.discount_amount}
                        </Text>

                        <Text
                          className="text-gray-600"
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            textDecorationLine: "line-through",
                          }}
                        >
                          Rs. {productData.product_price}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* <View>
                  <Text style={{ fontWeight: "500", marginBottom: 8 }}>
                    Color
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    {[
                      "#fbbf24",
                      "#3b82f6",
                      "#f87171",
                      "#000000",
                      "#dc2626",
                    ].map((color, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          backgroundColor: color,
                          borderWidth: 2,
                          borderColor: "white",
                          marginTop: 4,
                        }}
                      />
                    ))}
                  </View>
                </View>

                <View>
                  <Text style={{ fontWeight: "500", marginBottom: 8 }}>
                    Size:{" "}
                    <Text style={{ opacity: 0.5 }}>Extra Extra Small</Text>
                  </Text>
                  <View
                    style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}
                  >
                    {["18L", "20L"].map((size, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: "#f3f4f6",
                          borderColor: "white",
                          borderWidth: 2,
                          borderRadius: 8,
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          flex: 1,
                        }}
                      >
                        <Text style={{ marginBottom: 8, fontWeight: "bold" }}>
                          {size}
                        </Text>
                        <Text style={{ opacity: 0.75, marginBottom: 8 }}>
                          Perfect for a reasonable amount of snacks.
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View> */}

                {productData.is_secondhand != 1 && (
                  <View>
                    <View>
                      <Text style={{ fontWeight: "500", marginBottom: 8 }}>
                        QTY
                      </Text>
                      <View
                        style={{
                          height: 44,
                          borderWidth: 1,
                          borderColor: "#d1d5db",
                          borderRadius: 22,
                          flexDirection: "row",
                          alignItems: "center",
                          width: 144,
                          marginTop: 16,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => handleQuantityChange(quantity - 1)}
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 24,
                            fontWeight: "500",
                            borderRightWidth: 1,
                            borderColor: "#d1d5db",
                          }}
                        >
                          <Text>-</Text>
                        </TouchableOpacity>
                        <TextInput
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "center",
                            flex: 1,
                            paddingVertical: 4,
                            backgroundColor: "transparent",
                          }}
                          value={String(quantity)}
                          keyboardType="number-pad"
                          onChangeText={(text) =>
                            handleQuantityChange(parseInt(text))
                          }
                        />
                        <TouchableOpacity
                          onPress={() => handleQuantityChange(quantity + 1)}
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 24,
                            fontWeight: "500",
                            borderLeftWidth: 1,
                            borderColor: "#d1d5db",
                          }}
                        >
                          <Text>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 28,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#3b82f6",
                          borderWidth: 1,
                          borderColor: "#3b82f6",
                          color: "white",
                          borderRadius: 4,
                          paddingHorizontal: 40,
                          paddingVertical: 10,
                          marginRight: 8,
                        }}
                      >
                        <Text style={{ color: "white" }}>BUY NOW</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleCartChange()}
                        style={{
                          borderWidth: 1,
                          borderColor: "#3b82f6",
                          color: "#3b82f6",
                          borderRadius: 4,
                          paddingHorizontal: 24,
                          paddingVertical: 10,
                          marginRight: 8,
                        }}
                      >
                        <Text style={{ color: "#3b82f6" }}>Add to cart</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderRadius: 4,
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          marginRight: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#3b82f6",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          ♡
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderRadius: 4,
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#3b82f6",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          ⇪
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View className="flex-row justify-center mt-4 mb-4">
                  <TouchableOpacity
                    className="bg-[#3b82f6] p-2 rounded w-32  text-center items-center mx-4"
                    onPress={() => setVisible(true)}
                  >
                    <Text className="text-white">Write a review</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* attributes  */}
          {console.log(sections, "sections")}
          {productAttribute && (
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, section }) => {
                const isSelected = selectedItems[section.title]?.id === item.id;
                return (
                  <TouchableOpacity
                    style={[
                      styles.itemContainer,
                      isSelected && styles.selectedItemContainer,
                    ]}
                    onPress={() => handleItemClick(item, section.title)}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        isSelected && styles.selectedItemText,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
          )}

          {/* RatingModal */}
          <View
            className="relative"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <RatingModal visible={visible}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <View
                  className="absolute top-0 border rounded right-1"
                  style={{ alignItems: "center" }}
                >
                  <View classname="">
                    <Icons name="close" size={20} color={"#000"} />
                  </View>
                </View>
              </TouchableOpacity>

              <View>
                <Text className="mx-4 text-lg text-[#fe6700] font-semibold">
                  Write a review
                </Text>
                <TextInput
                  placeholder="Write a review..."
                  multiline={true}
                  value={review}
                  onChangeText={setReview}
                  numberOfLines={4}
                  className="border-salte-200 border-[0.5px] mx-4 my-2 rounded px-3"
                  style={{ backgroundColor: "white" }}
                />
              </View>

              <Rating
                type="star" // heart, star, bell, rocket
                ratingCount={5}
                showRating={true}
                ratingTextColor="red"
                // readonly
                // showReadOnlyText={false}
                fractions={1} // 0-20
                jumpValue={0}
                startingValue={0}
                onStartRating={(rating) => console.log(`Inital: ${rating}`)}
                onFinishRating={(rating) =>
                  setRating(rating)
                }
                onSwipeRating={(rating) => console.log(`Swiping: ${rating}`)}
              />


              <TouchableOpacity onPress={handleSubmit} className="bg-[#3b82f6] mt-5 p-2 rounded w-32 text-center items-center mx-4">
                <Text style={{ color: "white" }}>Post a review</Text>
              </TouchableOpacity>
            </RatingModal>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  modalheader: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedItemContainer: {
    backgroundColor: "#cce5ff", // Light blue background for selected item
  },
  itemText: {
    fontSize: 16,
  },
  selectedItemText: {
    fontWeight: "bold", // Bold text for selected item
    color: "#0056b3", // Darker blue color for selected text
  },
  // wholesale
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cell: {
    fontSize: 14,
  },
});

export default SingleProductDetails;
