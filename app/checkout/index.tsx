import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Checkout from '@/components/checkout/checkout'
import { BaseUrl } from '@/components/baseurl/baseurl';
import axios from 'axios';

const index = () => {
  const [deliveryValue, setDeliveryValue] = useState();

  useEffect(() => {
    loadDeliveryCharge();
  },[]); 

  const loadDeliveryCharge = async () => {
    try {
      const response = await axios.get(`${BaseUrl}deliverycharge`); // Adding timeout
      if (response.status === 200) {
        console.log(response.data.data, "sasasasas");
        setDeliveryValue(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching delivery charge:", error);
    }
  };
  
  return (
    <Checkout deliveryValue={deliveryValue}/>
  )
}

export default index