import React from 'react';
import { Image, Pressable } from 'react-native';
import styled from 'styled-components';

import {H4, P} from 'components/Texts';
import {Col} from 'components/Views';
import { ProdCardImage } from 'components/ImageDisplay';
import {gap} from "util/sizes";
import color from 'util/colors';

const CardContainer = styled(Col)``;

const CardImage = styled(Image)`
  border-radius: ${gap.M}px;
`;

const ProductName = styled(P)`
  margin-top: ${gap.S}px;
`;

const PriceLabel = styled(H4)`
  color: ${color.primary};
  margin-top: ${gap.S}px;
`;

export const ProductCard = (props: any) => {
  const {product, product: {name, price, image_url}} = props;

  return (
  <Pressable onPress={() => props.onPress()} style={{marginRight: gap.M}} disabled={!props.onPress}>
    <CardContainer>
      <ProdCardImage source={image_url} />
      <ProductName>{name}</ProductName>
      <PriceLabel>${price}</PriceLabel>
    </CardContainer>
  </Pressable>
)}