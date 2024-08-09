
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const singleproductdetails = () => {
  const [quantity, setQuantity] = useState(2);

  const handleQuantityChange = (value) => {
    if (value >= 0) setQuantity(value);
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 16, marginTop: 20 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
          <View style={{ width: '100%', paddingHorizontal: 8 }}>
            <View style={{ borderRadius: 12, overflow: 'hidden', margin: 8 }}>
              <Image
                source={{ uri: 'https://cdn.easyfrontend.com/pictures/products/mouse2.jpg' }}
                style={{ width: '100%', height: 288, resizeMode: 'cover' }}
              />
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', gap: 8 }}>
              {['mouse2.jpg', 'mouse3.jpg', 'mouse4.jpg'].map((image, index) => (
                <TouchableOpacity key={index} style={{ borderRadius: 12, overflow: 'hidden', margin: 8 }}>
                  <Image
                    source={{ uri: `https://cdn.easyfrontend.com/pictures/products/${image}` }}
                    style={{ width: 120, height: 'auto', borderRadius: 12, resizeMode: 'cover' }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ width: '100%', paddingHorizontal: 8 }}>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 24, lineHeight: 28, fontWeight: '500', marginBottom: 16 }}>
                Stitching Women Summer Shoulder Crossbody Bag
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                <Text style={{ opacity: 0.7 }}>
                  <Text>4.0</Text>
                  <Text style={{ color: 'yellow', marginHorizontal: 8 }}>★</Text>
                  <Text style={{ color: 'blue', fontWeight: '500', marginLeft: 4 }}>13 Reviews</Text>
                  <Text style={{ marginLeft: 8 }}>104 Order</Text>
                </Text>
              </View>
              <Text style={{ fontSize: 24, color: 'blue', fontWeight: '500' }}>Rs. 1,147</Text>
            </View>

            <View>
              <Text style={{ fontWeight: '500', marginBottom: 8 }}>Color</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                {['#fbbf24', '#3b82f6', '#f87171', '#000000', '#dc2626'].map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: color,
                      borderWidth: 2,
                      borderColor: 'white',
                      marginTop: 4,
                    }}
                  />
                ))}
              </View>
            </View>

            <View>
              <Text style={{ fontWeight: '500', marginBottom: 8 }}>
                Size: <Text style={{ opacity: 0.5 }}>Extra Extra Small</Text>
              </Text>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
                {['18L', '20L'].map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: '#f3f4f6',
                      borderColor: 'white',
                      borderWidth: 2,
                      borderRadius: 8,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      flex: 1,
                    }}
                  >
                    <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>{size}</Text>
                    <Text style={{ opacity: 0.75, marginBottom: 8 }}>Perfect for a reasonable amount of snacks.</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View>
              <Text style={{ fontWeight: '500', marginBottom: 8 }}>QTY</Text>
              <View
                style={{
                  height: 44,
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 22,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 144,
                  marginTop: 16,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleQuantityChange(quantity - 1)}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 24,
                    fontWeight: '500',
                    borderRightWidth: 1,
                    borderColor: '#d1d5db',
                  }}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    flex: 1,
                    paddingVertical: 4,
                    backgroundColor: 'transparent',
                  }}
                  value={String(quantity)}
                  keyboardType="number-pad"
                  onChangeText={(text) => handleQuantityChange(parseInt(text))}
                />
                <TouchableOpacity
                  onPress={() => handleQuantityChange(quantity + 1)}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 24,
                    fontWeight: '500',
                    borderLeftWidth: 1,
                    borderColor: '#d1d5db',
                  }}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 28 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3b82f6',
                  borderWidth: 1,
                  borderColor: '#3b82f6',
                  color: 'white',
                  borderRadius: 4,
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: 'white' }}>BUY NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  borderRadius: 4,
                  paddingHorizontal: 24,
                  paddingVertical: 10,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: '#3b82f6' }}>Add to cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 4,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: '#3b82f6', fontSize: 18, fontWeight: 'bold' }}>♡</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 4,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
              >
                <Text style={{ color: '#3b82f6', fontSize: 18, fontWeight: 'bold' }}>⇪</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ opacity: 0.7, marginTop: 16 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec consequat lorem. Maecenas elementum
              at diam consequat bibendum.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default singleproductdetails;