import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Pressable, Text} from 'react-native';
import { ProductImage } from 'components/ImageDisplay';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductBackButton } from 'components/Buttons/BackButtons';

import {H2, H4, P, A, Col, Button, Modal, Row} from 'components/index'
import {gap, color, BASE_URL} from 'util/index'
import {useSelector} from 'util/redux/hooks';
import axios from 'axios';

export default function ProductDetailPage(props: any) {
  const [displayModal, setDisplayModal] = useState('');
  const [floatHeight, setFloatHeight] = useState(0);
  const {route: {params: {product}}, navigation} = props;
  const {access: accessToken, userInfo: {id: user_id}} = useSelector(state => state.token);
  const safeArea = {
    top: Math.max(useSafeAreaInsets().top, 16),
    bottom: Math.max(useSafeAreaInsets().bottom, 16),
  };

  function onAddCartPress() {
    if (!Boolean(accessToken)) {
      return setDisplayModal('requireLogin');
    }

    AddToCart();
  }

  async function AddToCart() {
    try {
      const form = {user: user_id, product: product.id, amount: 1};
      console.log(form)
      const res = await axios.post(`${BASE_URL}/cart/add/`, form, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      console.log(res.data)
      navigation.navigate("Cart")

    } catch (err) {console.log(err)}

  }

  console.log(product)
  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <ProductBackButton
            style={[s.backButton, { top: safeArea.top }]}
            onPress={() => navigation.goBack()}
          />
          <ProductImage
            source={product?.image_url}
            style={{ marginBottom: gap.M }}
          />

          <Col style={{ paddingHorizontal: gap.M }}>
            <H2>{product.name}</H2>
            <H4 style={{ color: color.primary }}>${product.price}</H4>
            <P style={{ marginTop: gap.L }}>{product.description}</P>
          </Col>
          <View style={{height: floatHeight + gap.L}} />
        </ScrollView>

        <View 
          style={[s.cartButton, { paddingBottom: safeArea.bottom + gap.M }]}
          onLayout={(e) => setFloatHeight(e.nativeEvent.layout.height)}
        >
          <Button.Primary
            label="Add to cart"
            onPress={() => onAddCartPress()}
          />
        </View>
      </View>

      {Boolean(displayModal) && ( <>
          {displayModal === "requireLogin" && (
            <Modal closeAction={() => setDisplayModal('')}>
              <H2 style={{ marginBottom: gap.M }}>Log In Required</H2>
              <P>Log In or <A onPress={() => navigation.navigate("SignUp")}>Sign Up</A> to continue adding item to cart</P>

              <Row style={{ marginTop: gap.L }}>
                <Button.Ghost label="Back" style={{ marginRight: gap.M, flex: 1, padding: gap.XS }} onPress={() => setDisplayModal('')}/>
                <Button.Primary label="Log in" style={{ flex: 1, padding: gap.XS }} onPress={() => navigation.navigate("Login")}/>
              </Row>
            </Modal>
          )}
        </> )}

    </>
  );
}

const s = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: gap.M,
    zIndex: 2,
  },
  cartButton: {
    position: 'absolute',
    paddingHorizontal: gap.M,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2
  }
})