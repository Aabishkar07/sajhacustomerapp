import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router'

export default function Product({ product }) {
  return (

    // <TouchableOpacity onPress={() => {router.push('/signup')}}>

    <View className="mt-5" style={styles.card}>
      <TouchableOpacity onPress={()=>{
        router.push('/productdetails')
      }}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.favIcon}>
          <Text style={styles.favIconText}>♥</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
   
    overflow: 'hidden',
    width: '45%', 
  },
  imageContainer: {
    position: 'relative',
  },
  favIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 5,
  },
  favIconText: {
    fontSize: 16,
    color: 'red',
  },
  image: {
    width: '100%',
    height: 120, // Reduced height for compact design
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  cartButton: {
    marginTop: 10,
    backgroundColor: '#0F6FFF', 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
