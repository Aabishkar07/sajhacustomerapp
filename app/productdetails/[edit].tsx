// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import Singleproductdetails from '@/components/products/singleproductdetails';
// import Header from '@/components/layouts/Header';
// import { BaseUrl } from '@/components/baseurl/baseurl';
// import axios from 'axios';

// const ProductDetails = () => {
//   const { id } = useLocalSearchParams();

//   const [productData, setProductData] = useState(null);
//   const [productAttribute, setProductAttribute] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedProduct, setEditedProduct] = useState(null);

//   useEffect(() => {
//     if (id) {
//       loadData(id);
//     }
//   }, [id]);

//   const loadData = async (id) => {
//     try {
//       const response = await axios.get(`${BaseUrl}productbyid/${id}`);
//       setProductData(response.data.data.product);
//       setProductAttribute(response.data.data.attribute);
//       setEditedProduct(response.data.data.product);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   const handleEditChange = (key, value) => {
//     setEditedProduct(prevState => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   const handleUpdateProduct = async () => {
//     try {
//       const response = await axios.put(`${BaseUrl}updateproduct/${id}`, editedProduct);
//       setProductData(response.data.data.product);
//       setEditMode(false);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Header />
//       {editMode ? (
//         <View>
//           <TextInput
//             style={styles.input}
//             placeholder="Product Name"
//             value={editedProduct?.name}
//             onChangeText={(text) => handleEditChange('name', text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Product Price"
//             value={editedProduct?.price?.toString()}
//             onChangeText={(text) => handleEditChange('price', text)}
//             keyboardType="numeric"
//           />
//           {/* Add more input fields as needed */}
//           <Button title="Update Product" onPress={handleUpdateProduct} />
//           <Button title="Cancel" onPress={() => setEditMode(false)} />
//         </View>
//       ) : (
//         <View>
//           <Singleproductdetails productData={productData} productAttribute={productAttribute} />
//           <Button title="Edit Product" onPress={() => setEditMode(true)} />
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
// });

// export default ProductDetails;
