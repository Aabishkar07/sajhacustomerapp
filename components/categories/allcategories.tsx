import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Header from "../layouts/Header";
import axios from "axios";
import { BaseUrl } from "../baseurl/baseurl";
import Category from "../category";

// const categories = [
//   {
//     id: 1,
//     title: "Fashion",
//     image: "https://cdn.easyfrontend.com/pictures/ecommerce/product23.png",
//   },
//   {
//     id: 2,
//     title: "Perfume",
//     image: "https://cdn.easyfrontend.com/pictures/ecommerce/product12.png",
//   },
//   {
//     id: 3,
//     title: "Shoes",
//     image: "https://cdn.easyfrontend.com/pictures/ecommerce/product18.png",
//   },
//   {
//     id: 4,
//     title: "Kitchens",
//     image: "https://cdn.easyfrontend.com/pictures/ecommerce/product8.png",
//   },
// ];

const ShopByCategory = () => {
  const [categories,setCategory]=useState([]);
  const [renderApp,setRenderApp]=useState(false);
  const fetchData = async () => {
    try {
      console.log("sasas")
      const response = await axios.get(`${BaseUrl}parentcategory`); 
      // console.log(response.data)
      setCategory(response.data);
      setRenderApp(true);
    } catch (error) {
      console.error("Error fetching in category data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView>
      <Header/>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>All Categories</Text>
            
          </View>

          {renderApp ? (
          <View className="flex-row flex-wrap gap-1 ">
            {categories.map((category, index) => {
              return (
                <View className="w-[23%]">
                  <Category category={category} key={index} />
                </View>
              );
            })}
          </View>
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
         
        
        </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color:"#fe6700",
    fontWeight: "bold",
  },
  headerButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "30%", 
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImageContainer: {
    height: 100, // Adjusted to keep the cards aligned
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  cardTextContainer: {
    alignItems: "center",
  },
  cardText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ShopByCategory;
