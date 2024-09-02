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
} from "react-native";
import productsData from "../../product.json";
import { AuthContext } from "@/context/context";
import { addCart } from "@/context/func";
import { Button } from "react-native";
import RatingModal from "../modal/RatingModal";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { AirbnbRating, Rating } from "react-native-ratings";
import axios from "axios";
import { BaseUrl } from "../baseurl/baseurl";
const Singleproductdetails = () => {
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState(productsData[Number(id) - 1]);
  const [productDatas, setProductData] = useState();
  const [renderapp, setRenderapp] = useState(false);


  useEffect(() => {
    console.log("clsfclsfm")
    loadData(id);
  }, []);
  
  const loadData=async(id)=>{
    try {
      console.log("aabbb", id);
    const response=await axios.get(`${BaseUrl}productbyid/${id}`);
    setProductData(response.data.data.product)
    setRenderapp(true)
    // setProductattribute(response.data.data.attribute)
    console.log(response.data.data.product,"akakaa");
    } catch (error) {
      console.log("error",error)
    }

  }

  // console.log("aabbb", id);

  // console.log("aabbbproduct",product)
  const [selectedItems, setSelectedItems] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = React.useState(false);
  const handleQuantityChange = (value) => {
    if (value >= 0) setQuantity(value);
  };

  var sections = {};
  // Group attributes by 'group'
  if (product.attribute) {
    const groupedAttributes = product.attribute.reduce((acc, attribute) => {
    
      if (!acc[attribute.group.name]) {
        acc[attribute.group.name] = [];
      }
      acc[attribute.group.name].push(attribute);
      return acc;
    }, {});

    // Convert groupedAttributes to array format for SectionList
    sections = Object.keys(groupedAttributes).map((group) => ({
      title: group,
      data: groupedAttributes[group],
    }));

    // Set default selected items (first item in each group)
    useEffect(() => {
      const defaultSelections = sections.reduce((acc, section) => {
        if (section.data.length > 0) {
          acc[section.title] = section.data[0].name;
        }
        return acc;
      }, {});
      setSelectedItems(defaultSelections);
    }, []);
  }
  // Handle item click
  const handleItemClick = (item, group) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [group]: item.name,
    }));
  };

  const auth = useContext(AuthContext);
  const handleCartChange = async () => {
    var join = Object.values(selectedItems).join("-");
    console.log("koin", join);
    console.log("cart change", product.id + "-" + join);
    var cart_id = "";
    var variation = {};
    if (join) {
      cart_id = product.id + "-" + join;
      variation = selectedItems;
    } else {
      cart_id = product.id + "";
      variation = "";
    }

    var abc = selectedItems ? selectedItems : null;
    console.log("asssssdd", abc);

    try {
      await addCart(
        cart_id,
        product.name,
        product.price - product.discount_price,
        quantity,
        product.image_url,
        variation
      );
      auth.loadCart();

      // console.log(await AsyncStorage.getItem("cart"));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  console.log("selectedItems", selectedItems);
  return (
   
      <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ padding: 16, marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: -8,
          }}
        >

          <View style={{ width: "100%", paddingHorizontal: 8 }}>
            <View style={{ borderRadius: 12, overflow: "hidden", margin: 8 }}>
              <Image
                source={{ uri: productDatas.product_image }}
                style={{ width: "100%", height: 288, resizeMode: "cover" }}
              />
            </View>

            <View style={{ flexDirection: "row", flexWrap: "nowrap", gap: 8 }}>
              {["mouse2.jpg", "mouse3.jpg", "mouse4.jpg"].map(
                (image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ borderRadius: 12, overflow: "hidden", margin: 8 }}
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
                {product.name}
              </Text>
              <Text className="text-[10px]">{product.category_name}</Text>
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
                    style={{ color: "blue", fontWeight: "500", marginLeft: 4 }}
                  >
                    13 Reviews
                  </Text>
                  <Text style={{ marginLeft: 8 }}>104 Order</Text>
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  style={{ fontSize: 24, color: "blue", fontWeight: "500" }}
                >
                  Rs. {product.price - product.discount_price}
                </Text>
                <Text
                  className="text-gray-600"
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    textDecorationLine: "line-through",
                  }}
                >
                  Rs. {product.price}
                </Text>
              </View>
            </View>

            <View>
              <Text style={{ fontWeight: "500", marginBottom: 8 }}>Color</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                {["#fbbf24", "#3b82f6", "#f87171", "#000000", "#dc2626"].map(
                  (color, index) => (
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
                  )
                )}
              </View>
            </View>

            <View>
              <Text style={{ fontWeight: "500", marginBottom: 8 }}>
                Size: <Text style={{ opacity: 0.5 }}>Extra Extra Small</Text>
              </Text>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
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
            </View>

            <View>
              <Text style={{ fontWeight: "500", marginBottom: 8 }}>QTY</Text>
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
                  onChangeText={(text) => handleQuantityChange(parseInt(text))}
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
                  style={{ color: "#3b82f6", fontSize: 18, fontWeight: "bold" }}
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
                  style={{ color: "#3b82f6", fontSize: 18, fontWeight: "bold" }}
                >
                  ⇪
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-4 mb-4">
              <TouchableOpacity
                className="bg-[#3b82f6] p-2 rounded w-32  text-center items-center mx-4"
                onPress={() => setVisible(true)}
              >
                <Text className="text-white">Write a review</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ opacity: 0.7, marginTop: 16 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nec consequat lorem. Maecenas elementum at diam consequat
              bibendum.
            </Text>
          </View>
        </View>
      </View>

      {/* attributes  */}
      {product.attribute && (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.name}
          renderItem={({ item, section }) => {
            const isSelected = selectedItems[section.title] === item.name;
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
            startingValue={1}
            onStartRating={(rating) => console.log(`Inital: ${rating}`)}
            onFinishRating={(rating) =>
              console.log(`Rating finished ${rating}`)
            }
            onSwipeRating={(rating) => console.log(`Swiping: ${rating}`)}
          />

          <TouchableOpacity className="bg-[#3b82f6] mt-5 p-2 rounded w-32 text-center items-center mx-4">
            <Text style={{ color: "white" }}>Post a review</Text>
          </TouchableOpacity>
        </RatingModal>

        {/* <AirbnbRating
          reviews={[
            "Poor",
            "Very Bad",
            "Bad",
            "Ok",
            "Good",
            "Very Good",
            "Excellent",
          ]}
          count={7}
          defaultRating={3}
          selectedColor="green"
          unSelectedColor="lightgray"
          reviewColor="green"
          size={25}
          reviewSize={25}
          showRating={true}
          // isDisabled
          // starContainerStyle={{ backgroundColor:"red" }}
          ratingContainerStyle={{ marginVertical: 20 }}
          starImage={require("./../../assets/icon.png")}
          onFinishRating={(rating) => alert(rating)}
        /> */}
      </View>

      {/* <AirbnbRating
        reviews={[
          "Poor",
          "Very Bad",
          "Bad",
          "Ok",
          "Good",
          "Very Good",
          "Excellent",
        ]}
        count={7}
        defaultRating={3}
        selectedColor="green"
        unSelectedColor="lightgray"
        reviewColor="green"
        size={25}
        reviewSize={25}
        showRating={true}
        // isDisabled
        // starContainerStyle={{ backgroundColor:"red" }}
        ratingContainerStyle={{ marginVertical: 20 }}
        starImage={require("./../../assets/icon.png")}
        onFinishRating={(rating) => alert(rating)}
      /> */}

      {/* <Rating 
        type="heart"
        ratingCount={7}
        showRating={true}
        ratingTextColor="red"
        fractions={1}
        jumpValue={0.5}
        startingValue={5}
        onStartRating={(rating) => console.log(`Inital: ${rating}`)}
        onFinishRating={(rating) => console.log(`Rating finished ${rating}`)}
        onSwipeRating={(rating) => console.log(`Swiping: ${rating}`)}
      />*/}
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
});

export default Singleproductdetails;
