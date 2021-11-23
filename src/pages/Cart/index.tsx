import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios';

import { Page, P, H2, H4, Row, Button } from "components/index";
import NavBar from "components/NavBar";

import {gap, BASE_URL, color} from 'util/index';
import { CartItem } from './components';
import { useSelector } from 'util/redux/hooks';

export default function CartPage(props: any) {
  const {navigation, route} = props;
  const [cartItems, setCartItems] = useState({status: 'initial', data:[{product: {id: 0}, selected: false}]})
  const {access: accessToken, userInfo: { id: user_id }} = useSelector(state => state.token)
  const selectedItems = cartItems.data.filter((data) => data.selected)

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await axios.get(`${BASE_URL}/cart/${user_id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        // console.log(res)
        const formatedData = res.data.map((data: any) => ({...data, selected: false}))
        setCartItems({status: 'loaded', data: formatedData})
      } catch (err) {console.log(err)}

    }
    fetchCartItems();
  }, [route])

  function handleAmountUpdate(updatedData: any, index: number) {
    const updatedCart = [...cartItems.data];
    updatedCart.splice(index, 1, updatedData);

    setCartItems({ ...cartItems, data: updatedCart });
  }

  function handleSelectToggle(index: number) {
    const updatedCart = [...cartItems.data]
    const item = updatedCart[index];
    item.selected = !item.selected;

    setCartItems({...cartItems, data: updatedCart})
  }


  console.log(cartItems)
  return (
    <>
      <Page style={{ padding: gap.M }}>
        <H2 style={{ marginBottom: gap.L }}>Shopping Cart</H2>

        {cartItems.status !== "initial" && cartItems.data.length > 0 && (
          <FlatList
            data={cartItems.data}
            ItemSeparatorComponent={() => <View style={{ height: gap.S }} />}
            renderItem={({ item, index }) => {
              return (
                <CartItem
                  {...item}
                  toggleSelected={() => handleSelectToggle(index)}
                  onAmountUpdate={(updatedData: any) => handleAmountUpdate(updatedData, index)}
                />
              );
            }}
          />
        )}

      </Page>
      {selectedItems.length > 0 && (
        <Row style={s.checkOutContainer}>
          <P>Total: <H4 style={{color: color.primary}}>${selectedItems.reduce((total, item) => (total + (item.product.price * item.amount)), 0)}</H4></P>
          <Button.Primary padding={gap.S} label="Check Out" onPress={() => navigation.push('CheckOut', selectedItems)}/>
        </Row>
      )}
      <NavBar navigation={navigation}/>
    </>
  );
}

const s = StyleSheet.create({
  checkOutContainer: {
    borderTopWidth: 1,
    borderColor: color.blueGrey[100],
    backgroundColor: color.white,
    padding: gap.L,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})