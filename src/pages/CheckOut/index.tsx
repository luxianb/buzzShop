import React, {useState} from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { Page, H2, H4, Row, P, Col, Button, Modal } from "components/index";
import { BackableHeader } from "components/Buttons/BackButtons";
import CheckOutItem from "./CheckOutItem";

import { color, gap, BASE_URL } from "util/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { useSelector } from "util/redux/hooks";
import { DeliveryIndicator, PaymentBreakDown, PaymentMethodPicker } from "./components";


export default function CheckOutPage(props: any) {
  const {navigation, route: { params: selectedItems }} = props;
  const {access: accessToken} = useSelector((state) => state.token)
  const [displayModal, setDisplayModal] = useState('')
  const safeAreaBottom = Math.max(useSafeAreaInsets().bottom, 16);
  
  const itemsSubtotal = selectedItems.reduce((total: number, item: any) => total + item.amount * item.product.price, 0 );
  const deliveryFee = 1.5;
  const orderTotal = itemsSubtotal + deliveryFee;


  async function handlePurchase() {
    for (const item of selectedItems) {
      const dataToSend = {...item, product: item.product.id, status: 'Ordered'}
      try {
        const res = await axios.put(`${BASE_URL}/cart/e/${item.id}/`, dataToSend, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
      } catch (err) { console.log(err) }
    }
    setDisplayModal('purchaseSuccess')
  }

  return (
    <>
      <Page style={{ padding: gap.M }}>
        <ScrollView>
          <BackableHeader
            onPress={() => navigation.goBack()}
            title="Checkout"
          />

          <Col style={{ marginBottom: gap.L }}>
            {selectedItems.map((item: CartItem, index: number, arr: Array<CartItem[]>) => (
              <>
                <CheckOutItem {...item} />
                {index !== arr.length - 1 && ( <View style={s.checkOutItemSeperator} /> )}
              </>
            ))}
          </Col>

          <DeliveryIndicator deliveryFee={deliveryFee} />

          <View style={{ marginBottom: gap.L, alignItems: "flex-end" }}>
            <P>Subtotal: <H4>${(itemsSubtotal + deliveryFee).toFixed(2)}</H4></P>
          </View>

          <PaymentMethodPicker />
          <PaymentBreakDown
            itemsSubtotal={itemsSubtotal}
            deliveryFee={deliveryFee}
          />
        </ScrollView>
      </Page>
			
      <Row style={[s.orderContainer, { paddingBottom: safeAreaBottom + gap.M }]} >
        <H4>
          Total:{" "}
          <H4 style={{ color: color.primary }}>${orderTotal.toFixed(2)}</H4>
        </H4>
        <Button.Primary label="Place Order" padding={gap.S} onPress={() => handlePurchase()}/>
      </Row>

      {Boolean(displayModal) && (
        <>
          {displayModal === 'purchaseSuccess' && (
            <Modal>
              <H2 style={{ marginBottom: gap.M }}>Purchase successful</H2>
              <P>Order for you item has been successfully submited</P>

              <Row style={{ marginTop: gap.L }}>
                <Button.Primary
                  label="Ok"
                  style={{ flex: 1 }}
                  onPress={() => navigation.navigate('Cart')}
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
  checkOutItemSeperator: {
    height: 1, 
    backgroundColor: color.blueGrey[100], 
    marginVertical: gap.M
  },
  orderContainer: {
    padding: gap.M,
    borderTopWidth: 1,
    borderColor: color.blueGrey[100],
    justifyContent: "space-between",
    alignItems: "center",
  },

});
