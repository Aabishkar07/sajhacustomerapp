import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

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

const ImageSlider = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = position === dataSource.length - 1 ? 0 : position + 1;
      setPosition(newPosition);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [position]);

  return (
    <View
      style={styles.sliderContainer}
      className="border-[0.5px] border-slate-400"
    >
      <Image source={{ uri: dataSource[position].url }} style={styles.image} />
    </View>
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
  },
});

export default ImageSlider;
