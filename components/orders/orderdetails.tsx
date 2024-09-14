import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { BaseUrl } from "../baseurl/baseurl";
import Header from "../layouts/Header";

const Orderdetails = () => {
  const { id } = useLocalSearchParams();
  console.log("mypoaraasasams", id); // Check if id is correctly retrieved

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered", id); // Debug inside useEffect
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (id) => {
    console.log("mypoaramsoo", id);

    try {
      console.log("akakaks", id);
      const response = await axios.get(`${BaseUrl}orderbyid/${id}`);
      setOrderData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View>
      <Header />
      <SafeAreaView className="px-5">
        <ScrollView>
          <View className="py-4">
            <Text className="text-lg font-semibold text-center text-blue-600">
              Orderdetails
            </Text>
          </View>
          {orderData ? (
            <View className="mt-4">
              <View className="flex-row items-center gap-4">
                <View className="w-1/3">
                  <Text className="text-lg font-semibold text-orange-600 ">
                    Order_id :{" "}
                  </Text>
                </View>
                <View className="w-2/3">
                  <Text>{orderData.order_id}</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-4">
                <View className="w-1/3">
                  <Text className="text-lg font-semibold text-orange-600">
                    Total Amount :{" "}
                  </Text>
                </View>
                <View className="w-2/3">
                  <Text>{orderData.amount}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-4">
                <View className="w-1/3">
                  <Text className="text-lg font-semibold text-orange-600">
                    Payment Method :{" "}
                  </Text>
                </View>
                <View className="w-2/3">
                  <Text>{orderData.payment_method}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-4">
                <View className="w-1/3">
                  <Text className="text-lg font-semibold text-orange-600">
                    Order From :{" "}
                  </Text>
                </View>
                <View className="w-2/3">
                  <Text>{orderData.order_from}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-4">
                <View className="w-1/3">
                  <Text className="text-lg font-semibold text-orange-600">
                    Order Status :{" "}
                  </Text>
                </View>
                <View className="w-2/3">
                  <Text>{orderData.order_status}</Text>
                </View>
              </View>

              {/* billing details */}
              <View className="flex-row justify-between mt-8 gap-x-2">
                {/* billing */}
                <View className="w-1/2">
                  <Text className="text-lg font-semibold text-orange-600">
                    Billing Details :{" "}
                  </Text>
                  <View className="pt-1 ">
                    <View className="">
                      <Text className="text-sm font-semibold text-orange-600">
                        Name
                      </Text>
                    </View>
                    <View className="">
                      <Text>{orderData.order_billing_data.billing_name}</Text>
                    </View>
                  </View>
                  <View className="pt-1 ">
                    <View className="">
                      <Text className="text-sm font-semibold text-orange-600">
                        Email
                      </Text>
                    </View>
                    <View>
                      <Text>{orderData.order_billing_data.billing_email}</Text>
                    </View>
                  </View>

                  <View className="pt-1 ">
                    <View className="">
                      <Text className="text-sm font-semibold text-orange-600">
                        Address
                      </Text>
                    </View>
                    <View className="">
                      <Text>
                        {orderData.order_billing_data.billing_address}
                      </Text>
                    </View>
                  </View>

                  <View className="pt-1 ">
                    <View className="">
                      <Text className="text-sm font-semibold text-orange-600">
                        Phone Number
                      </Text>
                    </View>
                    <View className="">
                      <Text>
                        {orderData.order_billing_data.billing_phonenumber}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* shipping */}
                <View className="w-1/2">
                  <Text className="text-lg font-semibold text-orange-600">
                    Shipping Details :{" "}
                  </Text>
                  <View className="pt-1 ">
                    <View className="">
                      <Text className="text-sm font-semibold text-orange-600">
                        Name
                      </Text>
                    </View>
                    <View className="">
                      <Text>{orderData.order_billing_data.shipping_name}</Text>
                    </View>
                  </View>
                  <View className="pt-1 ">
                    <View className="">
                      <Text className="text-sm font-semibold text-orange-600">
                        Email
                      </Text>
                    </View>
                    <View>
                      <Text>{orderData.order_billing_data.shipping_email}</Text>
                    </View>
                  </View>

                  <View className="pt-1 ">
                    <View className="">
                      <Text className="text-sm font-semibold text-orange-600">
                        Address
                      </Text>
                    </View>
                    <View className="">
                      <Text>
                        {orderData.order_billing_data.shipping_address}
                      </Text>
                    </View>
                  </View>

                  <View className="pt-1 ">
                    <View className="">
                      <Text className="text-sm font-semibold text-orange-600">
                        Phone Number
                      </Text>
                    </View>
                    <View className="">
                      <Text>
                        {orderData.order_billing_data.shipping_phonenumber}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* order details */}

              <View className="flex-row justify-between mt-4 border gap-x-2">
                <View className="w-[50%]">
                  <Text className="px-1 font-semibold border-l border-r">
                    Product Name
                  </Text>
                </View>
                <View className="w-[20%]">
                  <Text className="font-semibold border-r">Price</Text>
                </View>
                <View className="w-[10%]">
                  <Text className="font-semibold border-r">Qty</Text>
                </View>
                <View className="w-[20%]">
                  <Text className="font-semibold">Total</Text>
                </View>
              </View>

              {orderData.order_item.map((itemdata) => (
                <View
                  key={itemdata.id}
                  className="flex-row justify-between mt-1 border gap-x-2"
                >
                  <View className="w-[50%] border-l border-r px-1">
                    <Text className="">
                      {itemdata.product.product_name}{" "}
                      <Text className="text-xs italic">
                        ({itemdata.variation})
                      </Text>{" "}
                    </Text>
                  </View>

                  <View className="border-r w-[20%]">
                    <Text className="">{itemdata.product_price}</Text>
                  </View>

                  <View className="w-[10%] border-r">
                    <Text className="">{itemdata.quantity}</Text>
                  </View>

                  <View className="w-[20%]">
                    <Text className="">
                      {itemdata.product_price * itemdata.quantity}
                    </Text>
                  </View>
                </View>
              ))}

              <View className="flex-row justify-end gap-2 pr-1 mt-3 ">
                <Text className="font-semibold">Sub Total : </Text>
                <Text className="font-bold text-orange-600 text-md">
                  Rs. {orderData.amount - orderData.delivery_charge}
                </Text>
              </View>
              <View className="flex-row justify-end gap-2 pr-1 mt-3 ">
                <Text className="font-semibold">Delivery Charge : </Text>
                <Text className="font-bold text-orange-600 text-md">
                  Rs. {orderData.delivery_charge}
                </Text>
              </View>
              <View className="flex-row justify-end gap-2 pr-1 mt-3 ">
                <Text className="font-semibold ">Total : </Text>
                <Text className="font-bold text-orange-600 text-md">
                  Rs. {orderData.amount}
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Orderdetails;
