import React, {useState} from 'react';
import axios from 'axios';

import { Input, Label } from "components/Inputs";
import { Col, Page, Button } from "components/index";
import { BackableHeader } from "components/Buttons/BackButtons";

import { gap, BASE_URL } from "util/index";
import { useSelector } from "util/redux/hooks";


export default function PostProductPage(props: any) {
  const {navigation, isEdit} = props;
  const {access: token, userInfo:{id: user_id}} = useSelector((state) => state.token);
  const [errors, setError] = useState({name: '', description: '', price: '', amount: ''});
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

  async function handleSubmit() {
    console.log('Form submitted')
    let res;
    if (!isEdit) {
      try {
        res = await axios.post(`${BASE_URL}/product/add/`, {...form, user_id}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(res);
      } catch (err) {
        console.log(err)
      }
    } else {
        try {
          res = await axios.put(`${BASE_URL}/product`)
          console.log(res);
        } catch (err) {
          console.log(err)
        }
    }
  }


  return(
    <Page style={{padding: gap.M}}>

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
        <Label>Product Name</Label>
        <Input
          placeholder="Description"
          onChangeText={(description: string) => setForm({...form, description})}
          value={form.description}
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

      <Col style={{marginBottom: gap.M}}>
        <Label>Image</Label>
        <Input
          placeholder="Image Url"
          onChangeText={(image_url) => setForm({...form, image_url})}
          value={form.image_url}
        />
      </Col>

      <Button.Primary
        label={!isEdit ? "Add Product" : "Edit Product"}
        onPress={() => checkForm()}
      />
      

    </Page>
  ) 
}