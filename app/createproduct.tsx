import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [billbookImage, setBillbookImage] = useState(null);
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [usedFor, setUsedFor] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [condValue, setCondValue] = useState(null);
  const [email, setEmail] = useState(null);
  const [categoryData, setcategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchEmail = useCallback(async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        console.error('No email found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching email from AsyncStorage:', error);
    }
  }, []);

  useEffect(() => {
    fetchEmail();
  }, [fetchEmail]);

  const selectImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled && result.assets[0]?.uri) {
      console.log('Image selected:', result.assets[0]);
      setBillbookImage(result.assets[0]);
    }
  };


const fetchCatgory = async()=>{
  try{
    const response = await axios.get('https://sajhamarket.com.np/api/category');
    const catgory = response.data;
    setcategoryData(catgory);

  }catch(error){
    console.log('error', error);

  }
};

useEffect(()=>{
  fetchCatgory();
},[]);





  const onSubmit = async () => {
    if (!email) {
      Alert.alert('Error', 'Email not found');
      return;
    }

    if (!billbookImage) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    const data = new FormData();
    data.append('product_name', productName);
    data.append('secondhand_condition', condValue);
    data.append('secondhand_address', address);
    data.append('description', details);
    data.append('product_price', price);
    data.append('secondhand_used_for', usedFor);
    data.append('secondhand_expiry_date', expiryDate);
    data.append('category_id', selectedCategory); 


    data.append('image', {
      uri: billbookImage.uri,
      type: 'image/jpeg',
      name: billbookImage.fileName || 'photo.jpg',
    });

    try {
      const response = await axios.post(
        `https://sajhamarket.com.np/api/secondhand/${email}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'You have successfully stored the product');
        resetForm();
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', `An error occurred: ${err.message}`);
    }
  };

  const resetForm = () => {
    setProductName('');
    setAddress('');
    setDetails('');
    setUsedFor('');
    setPrice('');
    setExpiryDate('');
    setCondValue(null);
    setBillbookImage(null);
    setSelectedCategory(null); // Reset selected category as well

  };

  const ConditionValue = [
    { id: '1', condition: 'New' },
    { id: '2', condition: 'Old' },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />

        <View style={styles.imagePickerContainer}>
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={() => selectImage(true)}
          >
            <Text style={styles.imagePickerText}>Add a photo</Text>
          </TouchableOpacity>
          {billbookImage && (
            <Image
              source={{ uri: billbookImage.uri }}
              style={styles.image}
            />
          )}
        </View>


        <Text style={styles.label}>Category:</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={categoryData.map(cat => ({ label: cat.category_name, value: cat.id }))}
        labelField="label"
        valueField="value"
        placeholder="Choose a category"
        value={selectedCategory}
        onChange={item => setSelectedCategory(item.value)}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="appstore1" size={20} />
        )}
      />


        <Text style={styles.label}>Condition:</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={ConditionValue}
          labelField="condition"
          valueField="condition"
          placeholder="Choose an option"
          value={condValue}
          onChange={item => setCondValue(item.condition)}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Details:</Text>
        <TextInput
          style={styles.input}
          value={details}
          onChangeText={setDetails}
          multiline
        />

        <Text style={styles.label}>Used For:</Text>
        <TextInput
          style={styles.input}
          value={usedFor}
          onChangeText={setUsedFor}
        />

        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Expiry Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        <TouchableOpacity
          onPress={onSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  icon: {
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#0F6FFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  imagePickerContainer: {
    marginBottom: 16,
  },
  imagePickerButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#333',
    fontSize: 16,
  },
});

export default CreateProduct;