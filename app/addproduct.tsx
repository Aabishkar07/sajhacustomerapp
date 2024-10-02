import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, Alert } from "react-native";
import {
  DataTable,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  Button,
} from "react-native-paper";

import { BaseUrl } from "@/components/baseurl/baseurl";
import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addproduct = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [allProduct, setProductData] = useState([]);

  const fetchData = async () => {
    // const email="seller@example.com";
    const email = await AsyncStorage.getItem('userEmail');

    try {
      const response = await axios.get(`${BaseUrl}customerproduct/${email}`);
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
  const handleProductPress = (product) => {
    console.log("Product pressed:", product.id);
    router.push({
      pathname: "/productdetails/[index]",
      params: { id: product.id },
    });
    // navigation.navigate("Single", { product });
  };


  const handleEditPress = (product) => {
    console.log("Product pressed:", product.id);
    router.push({
      pathname: "/productdetails/[edit]",
      params: { id: product.id },
    });
    // navigation.navigate("Single", { product });
  };


  const handleDeletePress = async (product) => {
    console.log("Product pressed:", product.id);
  
    const productId = product.id;
  
    try {
      const response = await axios.delete(
        `https://sajhamarket.com.np/api/deleteproduct/${productId}`
      );
  
      if (response.status === 200) {
        Alert.alert("Success", "You have deleted the product successfully");
      } else {
        Alert.alert("Error", `Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          Alert.alert("Error", "Endpoint not found");
        } else {
          Alert.alert("Error", `Server responded with status: ${err.response.status}`);
        }
      } else {
        Alert.alert("Error", `An error occurred: ${err.message}`);
      }
    }
  };
  

    // router.push({
    //   pathname: "/productdetail/[index]",
    //   params: { id: product.id },
    // });
    // navigation.navigate("Single", { product });


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, allProduct.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      secondary: "yellow",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>

      <Pressable onPress={()=>router.push('/createproduct')}>

<Text>
Add my product    </Text>
</Pressable>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Product Name</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
            <DataTable.Title numeric>Stock</DataTable.Title>
            <DataTable.Title numeric>Action</DataTable.Title>
          </DataTable.Header>

          {allProduct.slice(from, to).map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.product_name}</DataTable.Cell>
              <DataTable.Cell numeric>
                {item.product_price - item.discount_amount}
              </DataTable.Cell>
              <DataTable.Cell numeric>{item.availablestock}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Button
                  contentStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
                  onPress={() => handleProductPress(item)}

                  // onPress={() => console.log(`View ${item.product_name}`)}
                >
                  <View className="p-2 text-white bg-red-400 rounded">
                    <Text className="text-white ">View</Text>
                  </View>
                </Button>
              </DataTable.Cell>

                <Button className="mt-1.5"
                                  onPress={() => handleDeletePress(item)}

                  // onPress={() => console.log(`Delete ${item.id}`)}
                >
                  <View className="p-2 text-white bg-red-400 rounded">
                    <Text className="text-white ">Delete</Text>
                  </View>
                </Button>

                <Button className="mt-1.5"
                                  onPress={() => handleEditPress(item)}

                  // onPress={() => console.log(`Delete ${item.id}`)}
                >
                  <View className="p-2 text-white bg-red-400 rounded">
                    <Text className="text-white ">Edit</Text>
                  </View>
                </Button>

            </DataTable.Row>
            
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(allProduct.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${allProduct.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default addproduct;
