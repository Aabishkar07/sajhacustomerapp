import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/layouts/Header";
import { ScrollView } from "react-native-gesture-handler";
import ImageSlider from "@/components/slider";
import Category from "@/components/category";

export default function HomeScreen() {
  return (
    <ThemedView>
    <View>
      <Header />

      <View className="items-center">
        <ImageSlider />
      </View>

          <Text style={styles.categoryTitle}>Categories</Text>
<Category/>
    </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 16,
  },
})


