import React, {useState} from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { addDays, format } from "date-fns";

import { Page, H5, H4, Row, P, Col, Hr, Button, Modal, H2 } from "components/index";
import { BackableHeader } from "components/Buttons/BackButtons";
import CheckOutItem from "./CheckOutItem";

import { color, gap, hexToRGB, BASE_URL } from "util/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { useSelector } from "util/redux/hooks";

export default function CheckOutPage(props: any) {
  const {navigation, route: { params: selectedItems }} = props;
  const {access: accessToken} = useSelector((state) => state.token)
  const today = new Date();
  const safeAreaBottom = Math.max(useSafeAreaInsets().bottom, 16);
  const [displayModal, setDisplayModal] = useState('')

  const itemsSubtotal = selectedItems.reduce((total: number, item: any) => total + item.amount * item.product.price, 0 );
  const deliveryFee = 1.5;
  const orderTotal = itemsSubtotal + deliveryFee;

  async function handlePurchase() {
    for (const item of selectedItems) {
      const dataToSend = {...item, product: item.product.id, status: 'Ordered'}
      console.log(dataToSend)
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
            {selectedItems.map((item: any, index: number, arr: Array<any>) => (
              <>
                <CheckOutItem {...item} />
                {index !== arr.length - 1 && (
                  <View style={s.checkOutItemSeperator} />
                )}
              </>
            ))}
          </Col>

          <View style={s.deliveryInfoContainer}>
            <Row style={{ justifyContent: "space-between", marginBottom: gap.M }} >
              <H5>Delivery</H5>
              <H5>${deliveryFee.toFixed(2)}</H5>
            </Row>
            <P>{`Est. Arrival: ${format(addDays(today, 4), "d MMM")} - ${format(addDays(today, 13), "d MMM")}`}</P>
          </View>

          <View style={{ marginBottom: gap.L, alignItems: "flex-end" }}>
            <P>
              Subtotal: <H4>${(itemsSubtotal + deliveryFee).toFixed(2)}</H4>
            </P>
          </View>

          <View style={{ marginBottom: gap.L }}>
            <H5>Payment method</H5>
            <Row style={{ marginTop: gap.M }}>
              <View
                style={{
                  height: 100,
                  width: 300,
                  borderRadius: gap.S,
                  backgroundColor: hexToRGB(color.blueGrey[900], 0.1),
                }}
              />
            </Row>
          </View>

          <Hr />

          <Col>
            <Row
              style={{ justifyContent: "space-between", marginBottom: gap.M }}
            >
              <H5>Item Subtotal</H5>
              <H5>${itemsSubtotal.toFixed(2)}</H5>
            </Row>
            <Row
              style={{ justifyContent: "space-between", marginBottom: gap.M }}
            >
              <H5>Delivery Fee</H5>
              <H5>${deliveryFee.toFixed(2)}</H5>
            </Row>
            <Row style={{ justifyContent: "space-between" }}>
              <H5>Order Amount</H5>
              <H5>${orderTotal.toFixed(2)}</H5>
            </Row>
          </Col>
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
  deliveryInfoContainer: {
    padding: gap.M,
    borderRadius: gap.M,
    backgroundColor: hexToRGB(color.primary, 0.1),
    marginBottom: gap.L,
  },
  orderContainer: {
    padding: gap.M,
    borderTopWidth: 1,
    borderColor: color.blueGrey[100],
    justifyContent: "space-between",
    alignItems: "center",
  },

});
