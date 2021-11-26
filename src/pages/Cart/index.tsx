import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import axios from 'axios';

import { Page, P, H2, H4, Row, Button, Modal } from "components/index";
import NavBar from "components/NavBar";

import {gap, BASE_URL, color} from 'util/index';
import { CartItem } from './components';
import { useSelector } from 'util/redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


export default function CartPage(props: any) {
  const {navigation, route} = props;
  const [cartItems, setCartItems] = useState<{status: string, data: CartItem[]}>({status: 'initial', data:[]})
  const [displayModal, setDisplayModal] = useState<string>('');
  const [itemToRemove, setItemToRemove] = useState<any>(null)
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
      } catch (err) {
        console.log(err)
        setCartItems({...cartItems, status: 'loaded'})
      }
    }
    navigation.addListener('focus', () => {
      fetchCartItems();
    })
  }, [navigation])

  // ? Functions
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

  async function removeMultipleItemFromCart(items: Array<any>) {
    const listToPush = [...cartItems.data];

    for (const selectedItem of items) {
      try {
        const res = await axios.delete(`${BASE_URL}/cart/e/${selectedItem.id}/`, {
          headers: {Authorization: `Bearer ${accessToken}`}
        })
        console.log(res);
        
        const targetIndex = listToPush.indexOf((listItem) => listItem.id === selectedItem.id)
        listToPush.splice(targetIndex, 1);
      } catch (err) {console.log(err)}
    }
    setCartItems({...cartItems, data:listToPush})

  }

  function handleRemoveCartItem() {
    if (Boolean(itemToRemove)) {
      removeItemFromCart(itemToRemove)
    } else {
      removeMultipleItemFromCart(selectedItems)
    }
    dismissModal()
  }

  function dismissModal() {
    setDisplayModal('');
    setItemToRemove(null);
  }

  // ? Render
  if (cartItems.status === 'initial') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={color.primary} />
      </View>
    )
  }
  return (
    <>
      <Page style={{ padding: gap.M, paddingBottom: 0 }}>
        <FlatList
          ListHeaderComponent={
            <>
              <Row style={{ justifyContent: "space-between", alignItems: "center", marginBottom: gap.L, }} >
                <H2>Shopping Cart</H2>
                <Pressable
                  disabled={selectedItems.length === 0}
                  onPress={() => setDisplayModal("confirmItemDelete")}
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ color: selectedItems.length === 0 ? color.blueGrey[200] : color.primary, }}
                    size={18}
                  />
                </Pressable>
              </Row>
            </>
          }
          data={cartItems.data}
          ItemSeparatorComponent={() => <View style={{ height: gap.S }} />}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item, index }) => {
            return (
              <CartItem
                {...item}
                toggleSelected={() => handleSelectToggle(index)}
                onAmountUpdate={(updatedData: any) =>
                  handleAmountUpdate(updatedData, index)
                }
                toggleDeleteModal={(item_id: number) => {
                  setItemToRemove(item_id);
                  setDisplayModal("confirmItemDelete");
                }}
              />
            );
          }}
          ListEmptyComponent={() => (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <P style={{color: color.blueGrey[400]}}>Your cart is empty</P>
            </View>
          )}
        />
      </Page>
      {selectedItems.length > 0 && (
        <Row style={s.checkOutContainer}>
          <P>
            Total:{" "}
            <H4 style={{ color: color.primary }}>
              $
              {selectedItems.reduce( (total, item) => total + item.product.price * item.amount, 0 )}
            </H4>
          </P>
          <Button.Primary
            padding={gap.S}
            label="Check Out"
            onPress={() => navigation.push("CheckOut", selectedItems)}
          />
        </Row>
      )}
      <NavBar navigation={navigation} />
      {Boolean(displayModal) && (
        <>
          {displayModal === "confirmItemDelete" && (
            <Modal closeAction={() => dismissModal()}>
              <H2 style={{ marginBottom: gap.M }}>Remove item from cart?</H2>
              <P>Remove this {selectedItems.length || 1} item from the cart</P>

              <Row style={{ marginTop: gap.L }}>
                <Button.Ghost
                  label="No"
                  style={{ marginRight: gap.M, flex: 1 }}
                  onPress={() => dismissModal()}
                />
                <Button.Primary
                  label="Yes"
                  style={{ flex: 1 }}
                  onPress={() => handleRemoveCartItem()}
                />
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