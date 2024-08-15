import React from "react";
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

const categories = [
  {
    id: 1,
    title: "Fashion",
    image: "https://cdn.easyfrontend.com/pictures/ecommerce/product23.png",
  },
  {
    id: 2,
    title: "Perfume",
    image: "https://cdn.easyfrontend.com/pictures/ecommerce/product12.png",
  },
  {
    id: 3,
    title: "Shoes",
    image: "https://cdn.easyfrontend.com/pictures/ecommerce/product18.png",
  },
  {
    id: 4,
    title: "Kitchen",
    image: "https://cdn.easyfrontend.com/pictures/ecommerce/product8.png",
  },
];

const ShopByCategory = () => {
  return (
    <SafeAreaView>
      <Header/>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>All Categories</Text>
            
          </View>

          <View style={styles.grid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.card}>
                <View style={styles.cardImageContainer}>
                  <Image
                    source={{ uri: category.image }}
                    style={styles.cardImage}
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardText}>{category.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    width: "30%", // Adjusted to fit 3 cards in a row
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
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShopByCategory;
