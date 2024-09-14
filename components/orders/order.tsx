import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
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
import Header from "../layouts/Header";

const Order = ({allProduct}) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([15, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  // const [allProduct, setProductData] = useState([]);

  // const fetchData = async () => {
  //   // const email="seller@example.com";
  //   const email = await AsyncStorage.getItem('userEmail');

  //   try {
  //     const response = await axios.get(`${BaseUrl}orders/${email}`);
  //     console.log("aaa");
  //     // console.log(response.data);
  //     setProductData(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetchingddd data: ", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  
  const handleOrderPress = (order) => {
    console.log("Order pressed:", order.id);
    router.push({
      pathname: "/orderdetail/[index]",
      params: { id: order.id },
    });
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Default format, can be customized
  };

  return (
    <PaperProvider theme={theme}>
      <Header/>
      <SafeAreaView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Order Id</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
            <DataTable.Title numeric>Order Date</DataTable.Title>
            <DataTable.Title numeric>Action</DataTable.Title>
          </DataTable.Header>

          {allProduct.slice(from, to).map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>
                <Text className="text-[11px]">
                {item.order_id}
                </Text>
                </DataTable.Cell>
              <DataTable.Cell numeric>
              <Text className="text-[11px]">
              {item.amount }
                </Text>
                
              </DataTable.Cell>
              <DataTable.Cell numeric>
              <Text className="text-[11px]">
              {formatDate(item.created_at)}
                </Text>
                </DataTable.Cell>
              <DataTable.Cell numeric>
                <Button
                  contentStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
                  onPress={() => handleOrderPress(item)}

                  // onPress={() => console.log(`View ${item.product_name}`)}
                >
                  <View className="p-2 text-white bg-red-400 rounded">
                    <Text className="text-white ">View</Text>
                  </View>
                </Button>
              </DataTable.Cell>
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

export default Order;
