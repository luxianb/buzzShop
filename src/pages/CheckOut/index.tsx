import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {addDays, format} from 'date-fns';

import {Page, H5, H4, Row, P, Col, Hr, Button} from 'components/index';
import { BackableHeader } from 'components/Buttons/BackButtons';
import CheckOutItem from './CheckOutItem';

import {color, gap, hexToRGB} from 'util/index'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function CheckOutPage(props: any) {
  const {navigation, route: {params: selectedItems}} = props;
  const today = new Date();
	const safeAreaBottom = Math.max(useSafeAreaInsets().bottom, 16);

  const itemsSubtotal = selectedItems.reduce((total, item) => (total + (item.amount * item.product.price)), 0);
  const deliveryFee = 1.5;
	const orderTotal = itemsSubtotal + deliveryFee;

  console.log(props); 
  return(
    <>
      <Page style={{padding: gap.M}}>
				<ScrollView>
        <BackableHeader
          onPress={() => navigation.goBack()}
          title="Checkout"
        />

        <Col style={{marginBottom: gap.L}}>
        {selectedItems.map((item: any, index: number, arr: Array<any>) => (
          <>
            <CheckOutItem {...item} />
            {index !== arr.length - 1 && (
              <View style={{height: 1, backgroundColor: color.blueGrey[100], marginVertical: gap.M}}/>
            )}
          </>
        ))}
        </Col>

        <View style={{padding: gap.M, borderRadius: gap.M, backgroundColor: hexToRGB(color.primary, .1), marginBottom: gap.L}}>
          <Row style={{justifyContent: 'space-between', marginBottom: gap.M}}>
            <H5>Delivery</H5>
            <H5>${deliveryFee.toFixed(2)}</H5>
          </Row>
          <P>{`Est. Arrival: ${format(addDays(today, 4), 'd MMM')} - ${format(addDays(today, 13), 'd MMM')}`}</P>
        </View>
        
        <View style={{marginBottom: gap.L, alignItems: 'flex-end'}}>
          <P>Subtotal: <H4>${(itemsSubtotal + deliveryFee).toFixed(2)}</H4></P>
        </View>

        <View style={{marginBottom: gap.L}}>
          <H5>Payment method</H5>
          <Row style={{marginTop: gap.M}}>
            <View style={{height: 100, width: 300, borderRadius: gap.S, backgroundColor: hexToRGB(color.blueGrey[900], .1)}} />
          </Row>
        </View>

        <Hr/>
        
        <Col>
					<Row style={{justifyContent: 'space-between', marginBottom: gap.M}}>
						<H5>Item Subtotal</H5>
						<H5>${itemsSubtotal.toFixed(2)}</H5>
					</Row>
					<Row style={{justifyContent: 'space-between', marginBottom: gap.M}}>
						<H5>Delivery Fee</H5>
						<H5>${deliveryFee.toFixed(2)}</H5>
					</Row>
					<Row style={{justifyContent: 'space-between'}}>
						<H5>Order Amount</H5>
						<H5>${orderTotal.toFixed(2)}</H5>
					</Row>
        </Col>
				</ScrollView>

      </Page>
			<Row style={[s.orderContainer, {paddingBottom: safeAreaBottom + gap.M}]}>
				<H4>Total: <H4 style={{color: color.primary}}>${orderTotal.toFixed(2)}</H4></H4>
				<Button.Primary
					label="Place Order"
					padding={gap.S}
				/>
			</Row>
    </>
  )
}

const s = StyleSheet.create({
	orderContainer: {
		padding: gap.M,
		borderTopWidth: 1,
		borderColor: color.blueGrey[100],
		justifyContent: 'space-between',
		alignItems: 'center',
	}
})