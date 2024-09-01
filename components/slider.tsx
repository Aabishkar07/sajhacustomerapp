import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import { BaseUrl } from "@/components/baseurl/baseurl";

const dataSource = [
  {
    title: "",
    caption: "",
    url: "https://img.freepik.com/premium-vector/cosmetic-bottle-advertising-banner-template_87720-1602.jpg?w=1380",
  },
  {
    title: "",
    caption: "",
    url: "https://img.freepik.com/free-psd/realistic-spring-sale-landing-page-template-design_23-2149395194.jpg?size=626&ext=jpg",
  },
  {
    title: "",
    caption: "",
    url: "https://img.freepik.com/premium-psd/mockup-skin-care-products-3d-rendering_436820-140.jpg?w=360",
  },
];

const ImageSlider = ({ banners }) => {
  const [position, setPosition] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newPosition = position === dataSource.length - 1 ? 0 : position + 1;
  //     setPosition(newPosition);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [position]);

  return (
    <ScrollView horizontal pagingEnabled style={styles.sliderContainer}>
      {banners.map((item, index) => (
        //       <View key={index} >
        // <Text>
        // {item.banner_image }
        // </Text>
        // </View>

        <View key={index} style={styles.imageContainer}>
          <Image
            // source={{ uri: "https://img.freepik.com/premium-vector/cosmetic-bottle-advertising-banner-template_87720-1602.jpg?w=1380"}}
            source={{ uri: `${item.full_image_path}` }}
            style={styles.image}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
    width: 370,
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  imageContainer: {
    width: 370,
    height: "100%",
  },
});

export default ImageSlider;
