import { View, Text, Image } from 'react-native';
import React from 'react';

export default function Card({ category }) {
  return (
    <View style={{ marginHorizontal: 8, borderRadius: 15, overflow: 'hidden', width: 175, position: 'relative' }}>
      <View className="flex flex-row"
        // style={{
        //   shadowColor: '#000', // Example shadow color, adjust as needed
        //   shadowRadius: 40,
        //   shadowOffset: { width: 0, height: 10 },
        //   shadowOpacity: 0.6,
        //   overflow: 'hidden',
        
        // }}
      >
        <Image 
          source={{ uri: 'https://via.placeholder.com/64' }} 
          style={{ width: '100%', height: 112 }} 
        />

<Image 
          source={{ uri: 'https://via.placeholder.com/64' }} 
          style={{ width: '100%', height: 112 }} 
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          right: 8,
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 8,
          paddingVertical: 4,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white', textAlign: 'center' }}>
       Name
        </Text>
      </View>
    </View>
  );
}
