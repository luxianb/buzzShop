import React from 'react';
import {View, Pressable} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';

import {Row, Col, P, H5} from 'components/index';
import {CheckBox} from 'components/Buttons';
import { SquaredImage } from 'components/ImageDisplay';
import { hexToRGB, color, gap, BASE_URL } from 'util/index';
import { useSelector } from 'util/redux/hooks';

const ItemContainer = styled(Row)`
  background-color: ${(props: {selected: boolean}) => hexToRGB(props.selected ? color.primary : color.blueGrey[400], .1)};
  border-radius: ${gap.S}px;
  padding: ${gap.M}px;
`;

const SquareButtonBase = styled(Pressable)`
  height: 20px;
  width: 20px;
  border-radius: ${gap.XS}px;
  justify-content: center;
  align-items: center;
  background-color: ${hexToRGB(color.blueGrey[900], .1)};
`

const SquareButton = (props: any) => (
  <SquareButtonBase {...props}>
    <P>{props.label}</P>
  </SquareButtonBase>
)

const AmountSelector = (props: any) => (
  <Row style={[{alignItems: 'center'}, props.style]}>
    <P>{'Amount: '}</P>
    <SquareButton
      label="-"
      onPress={() => props.onPress('decrement')}
    />
    <View style={{marginHorizontal: gap.S}}>
      <P>{props.amount}</P>
    </View>
    <SquareButton
      label="+"
      onPress={() => props.onPress('increment')}
    />
  </Row>
)

export const CartItem = (props: any) => {
  const { selected, product, user, amount, status, id } = props;
  const {access: accessToken} = useSelector(state => state.token)

  async function updateAmount(type: string) {
    const updatedForm = {product: product.id, user, amount, status, id};

    switch(type) {
      case 'increment': updatedForm.amount += 1; break;
      case 'decrement': updatedForm.amount -= 1; break;
      default: return;
    }

    try {
      const res = await axios.put(`${BASE_URL}/cart/e/${id}/`, updatedForm, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      props.onAmountUpdate({...updatedForm, product, selected})
    } catch (err) {console.log(err)}
  }
  
  return (
    <ItemContainer selected={selected}>
      <CheckBox value={selected} onPress={() => props.toggleSelected()} style={{marginRight: gap.M}} />
      <SquaredImage source={product?.image_url}/>
      <Col style={{marginLeft: gap.M, flex: 1}}>
        <P>{product?.name}</P>
        <H5 style={{color: color.primary}}>${product?.price}</H5>
        <AmountSelector
          amount={props?.amount} 
          style={{alignSelf: 'flex-end', marginTop: 'auto'}}
          onPress={(type: string) => updateAmount(type)}
        />
      </Col>
    </ItemContainer>
)};