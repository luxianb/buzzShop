import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Pressable, Text} from 'react-native';
import { ProductImage } from 'components/ImageDisplay';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductBackButton } from 'components/Buttons/BackButtons';

import {H2, H4, P, A, Col, Button, Modal, Row} from 'components/index'
import {gap, color} from 'util/index'
import {useSelector} from 'util/redux/hooks';

export default function ProductDetailPage(props: any) {
  const [displayModal, setDisplayModal] = useState('');
  const {route: {params: {product}}, navigation} = props;
  const {access: accessToken} = useSelector(state => state.token);
  const safeArea = {
    top: Math.max(useSafeAreaInsets().top, 16),
    bottom: Math.max(useSafeAreaInsets().bottom, 16),
  };

  function onAddCartPress() {
    if (Boolean(accessToken)) {
      return setDisplayModal('requireLogin');
    }
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
        </ScrollView>
        <Button.Primary
          style={[s.cartButton, { bottom: safeArea.bottom + gap.M }]}
          label="Add to cart"
          onPress={() => onAddCartPress()}
        />
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
    left: gap.M,
    right: gap.M,
    zIndex: 2
  }
})