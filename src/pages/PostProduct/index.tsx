import React, {useState} from 'react';
import {Image, ScrollView} from 'react-native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';


import { Input, Label } from "components/Inputs";
import { Col, Page, Button } from "components/index";
import { BackableHeader } from "components/Buttons/BackButtons";

import { gap, BASE_URL, color } from "util/index";
import { useSelector } from "util/redux/hooks";
import { ProductImage } from 'components/ImageDisplay';



export default function PostProductPage(props: any) {
  const {navigation, isEdit} = props;
  const {access: token, userInfo:{id: user_id}} = useSelector((state) => state.token);
  const [errors, setError] = useState({name: '', description: '', price: '', amount: ''});
  const [selectedImage, setSelectedImage] = useState({uri: ''})
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '0',
    amount: '0',
    image_url: '',
    store: 1,
  });

  function checkForm() {
    const error = {name: '', description: '', price: '', amount: ''};

    // Include checks here
    

    // Submit form
    if (!error.name && !error.description && !error.price && !error.amount) {
      handleSubmit()
    }
  }

  async function handleImageSelection() {
    const selection =  await launchImageLibrary({mediaType: 'photo'});
    const {uri, type, fileName: name} = selection.assets[0]
    setSelectedImage({uri, type, name})
  }

  async function uploadImageToCloudinary(photo: any) {
    console.log(photo)
    try {
      const formData = new FormData()
      await formData.append('file', photo)
      await formData.append('cloud_name', "draymggeb")
      await formData.append('upload_preset', 'k5oh91jb')
  
      const res = await axios.post("https://api.cloudinary.com/v1_1/draymggeb/image/upload", formData)
      console.log(res);
      return {image_url: res.data.secure_url, cloudinary_id: res.data.public_id}
    } catch (err) {console.log(err)}
  }

  async function handleSubmit() {
    console.log('Form submitted')
    let res;
    let uploadData = {...form, owner: user_id};
    if(Boolean(selectedImage.uri)) {
      const imageData =  await uploadImageToCloudinary(selectedImage);
      uploadData = {...uploadData, ...imageData}
    }

    if (!isEdit) {
      try {
        res = await axios.post(`${BASE_URL}/product/add/`, uploadData, {
          headers: {Authorization: `Bearer ${token}`}
        })
        // console.log(res);
        navigation.navigate('Profile')
      } catch (err) { console.log(err) }
    } else {
      try {
        res = await axios.put(`${BASE_URL}/product`, uploadData, {headers: {Authorization: `Bearer ${token}`}})
        console.log(res);
        navigation.navigate('Profile')
      } catch (err) { console.log(err) }
    }
  }


  return(
    <Page style={{padding: gap.M}}>
      <ScrollView>

      <BackableHeader
        onPress={() => navigation.goBack()}
        title="Add Product"
      />


      <Col style={{marginBottom: gap.M}}>
        <Label>Product Name</Label>
        <Input
          placeholder="Name"
          onChangeText={(name: string) => setForm({...form, name})}
          value={form.name}
          />
      </Col>

      <Col style={{marginBottom: gap.M}}>
        <Label>Description</Label>
        <Input
          placeholder="Description"
          onChangeText={(description: string) => setForm({...form, description})}
          value={form.description}
          style={{minHeight: 150, justifyContent: 'flex-start'}}
          multiline
        />
      </Col>

      <Col style={{marginBottom: gap.M}}>
        <Label>Price</Label>
        <Input
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(price) => setForm({...form, price})}
          value={form.price.toString()}
        />
      </Col>

      <Col style={{marginBottom: gap.M}}>
        <Label>Amount</Label>
        <Input
          placeholder="Amount"
          keyboardType="numeric"
          onChangeText={(amount) => setForm({...form, amount})}
          value={form.amount.toString()}
        />
      </Col>

      <Col>
        <Label>Image</Label>
        {/* <Input
          placeholder="Image Url"
          onChangeText={(image_url) => setForm({...form, image_url})}
          value={form.image_url}
        /> */}
        <ProductImage 
          style={{flex: 1, height: 300, width: null, marginBottom: gap.S}} 
          source={selectedImage.uri}
        />
        <Button.Ghost
          label="Select Image to Upload"
          onPress={() => handleImageSelection()}
          padding={gap.S}
          color={color.blueGrey[900]}
        />
      </Col>

      

      <Button.Primary
        label={!isEdit ? "Add Product" : "Edit Product"}
        // onPress={() => checkForm()}
        onPress={() => checkForm()}
        style={{marginTop: gap.XL}}
      />
      
    </ScrollView>
    </Page>
  ) 
}