import React from 'react';
import {View, StyleSheet} from 'react-native';
import {format, addDays} from 'date-fns'
import styled from 'styled-components'

import {Row, P, H5, Col, Hr} from 'components/index'
import {gap, color, hexToRGB, fontSize} from 'util/index'


export const DeliveryIndicator = (props: any) => {
  const {deliveryFee} = props;
  const today = new Date();

  const Container = styled(View)`
    padding: ${gap.M}px;
    border-radius: ${gap.M}px;
    background-color: ${hexToRGB(color.primary, .2)};
    margin-bottom: ${gap.L}px;
  `

  return (
    <Container>
      <Row style={{ justifyContent: "space-between", marginBottom: gap.M }} >
        <H5>Delivery</H5>
        <H5>${deliveryFee.toFixed(2)}</H5>
      </Row>
      <P>{`Est. Arrival: ${format(addDays(today, 4), "d MMM")} - ${format(addDays(today, 13), "d MMM")}`}</P>
  </Container>
)}

export const PaymentMethodPicker = (props: any) => {

  const PaymentItemContainer = styled(View)`
    height: 100px;
    width: 300px;
    border-radius: ${gap.S}px;
    background-color: ${hexToRGB(color.blueGrey[900], .1)};
  `

  return (
    <View style={{ marginBottom: gap.L }}>
      <H5>Payment method</H5>
      <Row style={{ marginTop: gap.M }}>
        <PaymentItemContainer style={{justifyContent: "center", alignItems: "center"}}>
          <P style={{color: color.blueGrey[500], fontSize: fontSize.S}}>Coming soon</P>
        </PaymentItemContainer>
      </Row>
    </View>
  )
}

export const PaymentBreakDown = (props: any) => {

  const ItemContainer = styled(Row)`
    justify-content: space-between;
    margin-bottom: ${(props: {isLast?: boolean}) => !props.isLast ? `${gap.M}px` : 0};
  `;

  const BreakdownItem = (prop: any) => (
    <ItemContainer isLast={prop.isLast}>
      <H5>{prop.label}</H5>
      <H5>${prop.amount.toFixed(2)}</H5>
    </ItemContainer>
  )

  return (
   <>
   <Hr />

    <Col>
      <BreakdownItem label="Item Subtotal" amount={props.itemsSubtotal}/>
      <BreakdownItem label="Delivery Fee" amount={props.deliveryFee}/>
      <BreakdownItem label="Order Amount" amount={props.itemsSubtotal + props.deliveryFee} isLast/>
    </Col>
   </> 
  )
}