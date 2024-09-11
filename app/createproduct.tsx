import React, { useState } from 'react';
import { Text, View, TextInput, Button, Switch, StyleSheet ,ScrollView} from 'react-native';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [usedFor, setUsedFor] = useState('');
  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');

  return (

    <ScrollView>

  
    <View style={styles.container}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
      />
      
      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />
      
      {/* <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Furniture" value="furniture" />
        <Picker.Item label="Clothing" value="clothing" />
      </Picker> */}
      
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
      
      <Text style={styles.label}>Negotiable:</Text>
      <Switch
        value={negotiable}
        onValueChange={setNegotiable}
      />
      
      <Text style={styles.label}>Expiry Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      
      <Button
        title="Submit"
        onPress={() => {
          // Handle form submission
          console.log({
            productName,
            image,
            category,
            address,
            details,
            usedFor,
            price,
            negotiable,
            expiryDate,
          });
        }}
      />
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
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default CreateProduct;
