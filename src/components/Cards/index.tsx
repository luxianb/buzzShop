import React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import styled from 'styled-components';

import {H4, P} from 'components/Texts';
import {Col} from 'components/Views';
import Image from 'components/ImageDisplay';
import {gap} from "util/sizes";
import color from 'util/colors';

const CardContainer = styled(Col)`
  flex: 1;
`;

const ProductName = styled(P)`
  margin-top: ${gap.S}px;
  word-wrap: normal;
  /* flex: 1; */
`;

const PriceLabel = styled(H4)`
  color: ${color.primary};
  margin-top: ${gap.S}px;
`;

export const ProductCard = (props: any) => {
  const {product, product: {name, price, image_url}, cardWidth, colSeparator} = props;

  return (
  <Pressable onPress={() => props.onPress()} style={{marginRight: colSeparator || 0}} disabled={!props.onPress}>
    <CardContainer style={{width: cardWidth}}>
      <Image.Card source={image_url} cardWidth={cardWidth}/>
      <ProductName>{name}</ProductName>
      <PriceLabel>${price}</PriceLabel>
    </CardContainer>
  </Pressable>
)}