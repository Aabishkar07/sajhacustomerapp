import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Order from '@/components/orders/order'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '@/components/baseurl/baseurl';

const index = () => {
  const [allProduct, setProductData] = useState([]);

    const fetchData = async () => {
        // const email="anupkasula5@gmail.com";
        const email = await AsyncStorage.getItem('userEmail');
    
        try {
          const response = await axios.get(`${BaseUrl}order/cancel/${email}`);
          console.log("aaa");
          // console.log(response.data);
          setProductData(response.data.data);
        } catch (error) {
          console.error("Error fetchingddd data: ", error);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
  return (
   <Order allProduct={allProduct}/>
  )
}

export default index