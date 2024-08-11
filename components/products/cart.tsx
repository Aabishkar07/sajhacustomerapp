import { AuthContext } from '@/context/context';
import { clearSingle, getCart } from '@/context/func';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, Pressable, FlatList } from 'react-native';
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-easy-toast";
import Header from '../layouts/Header';

const cart = () => {

  const toastRef = React.createRef();

  const [billingAddress, setBillingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const products = [
    {
      id: 1,
      image: 'https://cdn.easyfrontend.com/pictures/portfolio/portfolio14.jpg',
      title: 'Luxury Black Matte Paint Custom Laser Logo Square Wooden Gift Box Watch Men for your Luxury Brand Heren Horloge',
      price: 11328,
      quantity: 1,
    },
    {
      id: 2,
      image: 'https://cdn.easyfrontend.com/pictures/portfolio/portfolio20.jpg',
      title: 'Iron Handle 60 90 Sheets Clothes Pet Dog Cat Hair Adhesive Sticky Lint. Storage Welded Nesting Metal Foldable Logistics Steel Wire Mesh',
      price: 5411,
      quantity: 5,
    },
    {
      id: 3,
      image: 'https://cdn.easyfrontend.com/pictures/portfolio/portfolio19.jpg',
      title: '2022 Europe And America Hot Sell Stainless Steel Hot Sell Spoon Gift Coffee Stir Spoon Gold-plated Dessert Spoon',
      price: 21345,
      quantity: 3,
    },
    {
      id: 4,
      image: 'https://cdn.easyfrontend.com/pictures/portfolio/portfolio15.jpg',
      title: '3150A Withdrawable Type Indoor AC High Voltage Vacuum Circuit Breaker High Quality With Professional Manufacturer',
      price: 27351,
      quantity: 4,
    },
  ];
  const [cartItems, setCartItems] = useState([]);
  const auth = useContext(AuthContext);

  const subtotal = cartItems.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const shippingFee = 0;
  const tax = 0;
  const total = subtotal + shippingFee + tax;

  const handleBillingChange = (field, value) => {
    setBillingAddress({ ...billingAddress, [field]: value });
  };

  

  const clearData = (item) => {
    clearSingle(item.id);
    auth.loadCart();
    // toastRef.current.show("Removed item from cart successfully", 3000);
  };
  
  useEffect(() => {
    loadCartItems();
  }, [auth]); // Now listening for changes in auth, not cartItems

  const loadCartItems = async () => {
    const cart = await getCart();
    setCartItems(cart);
  };

  return (

    
    <View style={styles.container}>
      <Header />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            

                {cartItems.map((item, index) => (
                    <View key={index}>
                    <View style={styles.cartItem} className="relative flex-row items-center">
                
                    <Image
                      source={{ uri: item.image_url }}
                      className="w-20 h-full"
                      style={{ resizeMode: "contain" }}
                    />
                    <View className=" w-[70%] ">
                      <View className="">
                        <Text style={styles.cartItemName}>{item.name}</Text>
                        <Text className="" >
                         
                        {item.variation && 
  Object.values(item.variation).map((value, index) => (
    <View key={index}> 
      <Text className='px-1 text-xs py-1 mr-1.5 text-white bg-red-500 rounded'>
        {value}
      </Text>
    </View>
  ))
}

                        </Text>
                        
                      </View>
                
                      <View className="flex-row items-center justify-between ">
                
                      <Text>Rs. {item.price}</Text>
                     <View className="flex-row items-center border rounded-lg w-[30%] justify-between">
                      <Pressable className="border-r">
                        <Icons name="minus" size={20} />
                      </Pressable>
                      <Text className="text-lg">{item.quantity}</Text>
                      <Pressable className="border-l">
                        <Icons name="plus" size={20} />
                      </Pressable>
                    </View>
                    </View>
                    <View className="flex-row justify-end mt-2">
                    <Text>Rs. {item.quantity* item.price}</Text>
                    </View>
                    </View>
                    </View>
                    
                    <Pressable onPress={() => clearData(item)} item={item} className="absolute top-2 right-2">
                      <Icons name="close" size={20} />
                    </Pressable>
                
                    
                  </View>
                ))}

 
        <View >
          <Text style={styles.billingTitle}>Billing Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={billingAddress.name}
            onChangeText={(text) => handleBillingChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={billingAddress.address}
            onChangeText={(text) => handleBillingChange('address', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={billingAddress.city}
            onChangeText={(text) => handleBillingChange('city', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={billingAddress.state}
            onChangeText={(text) => handleBillingChange('state', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={billingAddress.zip}
            onChangeText={(text) => handleBillingChange('zip', text)}
          />
        </View>

      </ScrollView>


       {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.productsContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.productItem}>
            
              <View style={styles.imageContainer}>
                <TouchableOpacity>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                </TouchableOpacity>
              </View>

              <View style={styles.productDetails}>
               
                <View style={styles.productInfo}>
                  <TouchableOpacity>
                    <Text style={styles.productTitle}>{product.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.productPrice}>Rs. {product.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      value={product.quantity.toString()}
                      keyboardType="number-pad"
                      style={styles.quantityInput}
                    />
                    <TouchableOpacity style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

       
        <View style={styles.billingFormContainer}>
          <Text style={styles.billingTitle}>Billing Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={billingAddress.name}
            onChangeText={(text) => handleBillingChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={billingAddress.address}
            onChangeText={(text) => handleBillingChange('address', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={billingAddress.city}
            onChangeText={(text) => handleBillingChange('city', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={billingAddress.state}
            onChangeText={(text) => handleBillingChange('state', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={billingAddress.zip}
            onChangeText={(text) => handleBillingChange('zip', text)}
          />
        </View>
      </ScrollView> */}


      {/* Order Summary at Bottom */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sub total</Text>
          <Text style={styles.summaryValue}>Rs. {subtotal}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping Fee</Text>
          <Text style={styles.summaryValue}>Rs. {shippingFee}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>Rs. {tax}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalTitle}>Total</Text>
          <Text style={styles.summaryValue}>Rs. {total}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>BUY ({products.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  cartContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyCartText: {
    color: "#888",
    fontSize: 16,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "#888",
  },
  continueShoppingButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  continueShoppingButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  productsTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

    billingFormContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  billingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  summaryContainer: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#333',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#1e40af',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
      },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//   },
//   productsContainer: {
//     backgroundColor: '#f8f8f8',
//     borderRadius: 12,
//     padding: 16,
//   },
//   productItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   imageContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginRight: 12,
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//   },
//   productDetails: {
//     flex: 1,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   productInfo: {
//     flex: 1,
//   },
//   productTitle: {
//     fontSize: 14,
//     marginBottom: 4,
//     color: '#333',
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1e40af',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   quantityButton: {
//     padding: 6,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   quantityButtonText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   quantityInput: {
//     width: 40,
//     textAlign: 'center',
//     fontSize: 16,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 4,
//   },
//   deleteButton: {
//     backgroundColor: '#f0f0f0',
//     padding: 6,
//     borderRadius: 50,
//   },
//   deleteIcon: {
//     fontSize: 20,
//     color: '#e60000',
//   },
//   billingFormContainer: {
//     backgroundColor: '#f8f8f8',
//     borderRadius: 12,
//     padding: 16,
//     marginTop: 24,
//   },
//   billingTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     borderColor: '#ddd',
//     borderWidth: 1,
//   },
//   summaryContainer: {
//     backgroundColor: '#f8f8f8',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     padding: 16,
//     paddingBottom: 24,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: '#333',
//   },
//   summaryValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#1e40af',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ddd',
//     marginVertical: 8,
//   },
//   totalTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   buyButton: {
//     backgroundColor: '#1e40af',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buyButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

export default cart;