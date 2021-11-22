import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { FlatList, View } from 'react-native';

import {Button, H1, P, Col, Row, Page } from 'components/index';
import NavBar from 'components/NavBar';
import { ProductCard } from 'components/Cards';

import {gap, BASE_URL} from 'util/index';
import { useDispatch, useSelector } from 'util/redux/hooks';
import { setToken } from 'util/redux/slices/tokenSlice';

export default function Landing(props: any) {
  const {navigation} = props;

  const {access: accessToken, userInfo} = useSelector(state => state.token);
  const [products, setProducts] = useState({status: 'initial', data:[]})
  // const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/product/`)
        console.log(res)
        setProducts({status: 'fetched', data:res.data})

      } catch (err) {console.log(err)}
    }

    fetchProducts();
  },[])

  console.log(userInfo);
  console.log(products);

  const TESTING = false

  return(
    <>
    <Page style={{padding: gap.M}}>
      <Col>
        <H1 style={{marginBottom: gap.XL}}>Welcome {accessToken ? `${userInfo.username}` : ''}</H1>
        
        <FlatList
          data={products.data}
          numColumns={2}
          style={{marginRight: -gap.M}}
          ItemSeparatorComponent={() => <View style={{height: gap.M}} />}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("ProductDetail", {product: item})}
            />
          )}
        />
        {TESTING && (
          <>
        <Button.Primary
          label="Log In"
          onPress={() => navigation.navigate("Login") }
          style={{marginBottom: gap.M}}
        />
        <Button.Ghost
          label="Sign Up"
          onPress={() => navigation.navigate("SignUp") }
        />
        <Button.Primary
          label="Add Product"
          onPress={() => navigation.navigate("AddProduct") }
          style={{marginBottom: gap.M}}
        />
        </>
        )}
        
      </Col>
    </Page>
    <NavBar />
    </>
  )
};