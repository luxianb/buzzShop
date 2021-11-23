import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { FlatList, View } from 'react-native';

import {H1, Col, Page } from 'components/index';
import NavBar from 'components/NavBar';
import { ProductCard } from 'components/Cards';

import {gap, BASE_URL} from 'util/index';
import { useSelector } from 'util/redux/hooks';

export default function Landing(props: any) {
  const {navigation, route} = props;
  const {access: accessToken, userInfo} = useSelector(state => state.token);
  const [products, setProducts] = useState({status: 'initial', data:[]})

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/product/`)
        console.log(res)
        setProducts({status: 'fetched', data:res.data})

      } catch (err) {console.log(err)}
    }

    fetchProducts();
  },[navigation])


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
        
      </Col>
    </Page>
    <NavBar navigation={navigation}/>
    </>
  )
};