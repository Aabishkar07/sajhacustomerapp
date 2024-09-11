import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BaseUrl } from '../baseurl/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const   Profile = () => {
  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
    gender: '',
    birthday: '',
  });

  const fetchData = async () => {
    const email = await AsyncStorage.getItem('email');
    try {
      const response = await axios.get(`${BaseUrl}api/customer/customerdata/${email}`);
      const customerData = response.data;
      console.log(customerData);
      setData(customerData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa', padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Settings</Text>

      {/* Full Name */}
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={data.name}
          onChangeText={(text) => setData({ ...data, name: text })}
        />
      </View>

      {/* Change Password */}
      <TouchableOpacity style={styles.settingContainer}>
        <Text style={styles.label}>Change Password</Text>
        <Icon name="chevron-right" size={24} color="#555" />
      </TouchableOpacity>

      {/* Change Mobile */}
      <TouchableOpacity style={styles.settingContainer}>
        <Text style={styles.label}>Change Mobile</Text>
        <Text style={styles.infoText}>{data.mobile}</Text>
        <Icon name="chevron-right" size={24} color="#555" />
      </TouchableOpacity>

      {/* Change Email */}
      <TouchableOpacity style={styles.settingContainer}>
        <Text style={styles.label}>Change Email</Text>
        <Text style={styles.infoText}>{data.email}</Text>
        <Icon name="chevron-right" size={24} color="#555" />
      </TouchableOpacity>

      {/* Gender */}
      <TouchableOpacity style={styles.settingContainer}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.infoText}>{data.gender}</Text>
        <Icon name="chevron-right" size={24} color="#555" />
      </TouchableOpacity>

      {/* Birthday */}
      <TouchableOpacity style={styles.settingContainer}>
        <Text style={styles.label}>Birthday</Text>
        <Text style={styles.infoText}>{data.birthday}</Text>
        <Icon name="chevron-right" size={24} color="#555" />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = {
  settingContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    padding: 0,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoText: {
    fontSize: 18,
    color: '#555',
  },
};
