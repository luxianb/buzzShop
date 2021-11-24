import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';

import { Page, P, H2, H4, Row, Button, Modal } from "components/index";
import NavBar from "components/NavBar";

import {gap, BASE_URL, color} from 'util/index';
import { CartItem } from './components';
import { useSelector } from 'util/redux/hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function CartPage(props: any) {
  const {navigation, route} = props;

  const [cartItems, setCartItems] = useState({status: 'initial', data:[{id: 0, product: {id: 0}, selected: false}]})
  const [displayModal, setDisplayModal] = useState('');
  const [itemToRemove, setItemToRemove] = useState(null)
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

  async function removeItemFromCart(item_id: number) {
    try {
      const res = await axios.delete(`${BASE_URL}/cart/e/${item_id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      console.log(res);

      setCartItems({...cartItems, data:cartItems.data.filter((item) => item.id !== item_id)})

    } catch (err) {console.log(err)}
  }

  function handleRemoveCartItem() {
    if (Boolean(itemToRemove)) {
      removeItemFromCart(itemToRemove)
    } else {
      for (const item of selectedItems) {
        removeItemFromCart(item.id)
      }
    }
    setDisplayModal('')
  }

  function dismissModal() {
    setDisplayModal('');
    setItemToRemove(null);
  }


  console.log(cartItems)
  return (
    <>
      <Page style={{ padding: gap.M }}>
        <ScrollView>
        <Row style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: gap.L }}>
          <H2>Shopping Cart</H2>
          <Pressable disabled={selectedItems.length === 0} onPress={() => setDisplayModal('confirmItemDelete')}>
            <FontAwesomeIcon 
              icon={faTrashAlt} 
              style={{color: selectedItems .length === 0 ? color.blueGrey[200] : color.primary}}
              size={18}
            />
          </Pressable>
        </Row>

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
                  toggleDeleteModal={(item_id: number) => {
                    setItemToRemove(item_id);
                    setDisplayModal('confirmItemDelete')
                  }}
                />
              );
            }}
          />
        )}
      </ScrollView>
      </Page>
      {selectedItems.length > 0 && (
        <Row style={s.checkOutContainer}>
          <P>Total: <H4 style={{color: color.primary}}>${selectedItems.reduce((total, item) => (total + (item.product.price * item.amount)), 0)}</H4></P>
          <Button.Primary padding={gap.S} label="Check Out" onPress={() => navigation.push('CheckOut', selectedItems)}/>
        </Row>
      )}
      <NavBar navigation={navigation}/>
      {Boolean(displayModal) && (
        <>
        {displayModal === 'confirmItemDelete' && (
          <Modal closeAction={() => dismissModal()}>
            <H2 style={{ marginBottom: gap.M }}>Remove item from cart?</H2>
            <P>Remove this {selectedItems.length || 1} item from the cart</P>

            <Row style={{ marginTop: gap.L }}>
              <Button.Ghost label="No" style={{ marginRight: gap.M, flex: 1}} onPress={() => dismissModal()}/>
              <Button.Primary label="Yes" style={{ flex: 1}} onPress={() => handleRemoveCartItem()}/>
            </Row>
          </Modal>
        )}
        </>
      )}
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