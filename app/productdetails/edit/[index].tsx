import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { BaseUrl } from "@/components/baseurl/baseurl";
import Header from "@/components/layouts/Header";
import { router, useLocalSearchParams } from "expo-router";

const EditProduct = () => {
  const { id } = useLocalSearchParams();

  const [productName, setProductName] = useState("");
  const [billbookImage, setBillbookImage] = useState(null);
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [usedFor, setUsedFor] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [condValue, setCondValue] = useState(null);
  const [email, setEmail] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [productData, setProductData] = useState(null);

  const fetchEmail = useCallback(async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        console.error("No email found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error fetching email from AsyncStorage:", error);
    }
  }, []);

  useEffect(() => {
    fetchEmail();
  }, [fetchEmail]);

  const selectImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled && result.assets[0]?.uri) {
      console.log("Image selected:", result.assets[0]);
      setBillbookImage(result.assets[0]);
    }
  };

  const fetchCategory = async () => {
    try {
      const response1 = await axios.get(`${BaseUrl}productbyid/${id}`);
      setProductData(response1.data.data.product);

      const response = await axios.get(`${BaseUrl}category`);
      const category = response.data;
      setCategoryData(category);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const onSubmit = async () => {
    if (!email) {
      Alert.alert("Error", "Email not found");
      return;
    }

    const data = new FormData();
    data.append("product_name", productName || productData.product_name);
    data.append("secondhand_condition", condValue || productData.secondhand_condition);
    data.append("secondhand_address", address || productData.secondhand_address);
    data.append("description", details || productData.description);
    data.append("product_price", price || productData.product_price);
    data.append("secondhand_used_for", usedFor || productData.secondhand_used_for);
    data.append("secondhand_expiry_date", expiryDate || productData.secondhand_expiry_date);
    data.append("category_id", selectedCategory || productData.category.id);

    if (billbookImage) {
      data.append("image", {
        uri: billbookImage.uri,
        type: "image/jpeg",
        name: billbookImage.fileName || "photo.jpg",
      });
    }

    try {
      const response = await axios.post(
        `${BaseUrl}product/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Product updated successfully.");
        router.push('/addproduct');
        resetForm();
      }
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", `An error occurred: ${err.message}`);
    }
  };

  const resetForm = () => {
    setProductName("");
    setAddress("");
    setDetails("");
    setUsedFor("");
    setPrice("");
    setExpiryDate("");
    setCondValue(null);
    setBillbookImage(null);
    setSelectedCategory(null);
  };

  const ConditionValue = [
    { id: "1", condition: "New" },
    { id: "2", condition: "Old" },
  ];

  return (
    <SafeAreaView className="mb-24">
      <Header />
      {productData ? (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.label}>Product Name:</Text>
            <TextInput
              style={styles.input}
              value={productName || productData.product_name}
              onChangeText={setProductName}
            />

            <View style={styles.imagePickerContainer}>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={() => selectImage(true)}
              >
                <Text style={styles.imagePickerText}>Add a photo</Text>
              </TouchableOpacity>
              {billbookImage ? (
                <Image
                  source={{ uri: billbookImage.uri }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={{ uri: `${BaseUrl}images/${productData.featured_image}` }}
                  style={styles.image}
                />
              )}
            </View>

            <Text style={styles.label}>Category:</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={categoryData.map((cat) => ({
                label: cat.category_name,
                value: cat.id,
              }))}
              labelField="label"
              valueField="value"
              placeholder="Choose a category"
              value={selectedCategory || productData.category.id}
              onChange={(item) => setSelectedCategory(item.value)}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="appstore1"
                  size={20}
                />
              )}
            />

            <Text style={styles.label}>Condition:</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={ConditionValue}
              labelField="condition"
              valueField="condition"
              placeholder="Choose an option"
              value={condValue || productData.secondhand_condition}
              onChange={(item) => setCondValue(item.condition)}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            />

            <Text style={styles.label}>Address:</Text>
            <TextInput
              style={styles.input}
              value={address || productData.secondhand_address}
              onChangeText={setAddress}
            />

            <Text style={styles.label}>Details:</Text>
            <TextInput
              style={styles.input}
              value={details || productData.description}
              onChangeText={setDetails}
              multiline
            />

            <Text style={styles.label}>Used For:</Text>
            <TextInput
              style={styles.input}
              value={usedFor || productData.secondhand_used_for}
              onChangeText={setUsedFor}
            />

            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(price || parseInt(productData.product_price))}
              onChangeText={setPrice}
            />

            <Text style={styles.label}>Expiry Date:</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={expiryDate || productData.secondhand_expiry_date}
              onChangeText={setExpiryDate}
            />

            <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#888",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginRight: 8,
  },
  imagePickerContainer: {
    marginBottom: 16,
  },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginBottom: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "contain",
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default EditProduct;
