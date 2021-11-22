import { faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import styled from 'styled-components';
import { hexToRGB } from 'util/helperFunctions';
import color from 'util/colors';
import {gap} from 'util/sizes';

const CardImgContainer = styled(View)`
  background-color: ${hexToRGB(color.blueGrey[900], 0.1)};
  border-radius: ${gap.M}px;
  overflow: hidden;
`;

export const ProdCardImage = (props: any) => {
  const windowWidth = useWindowDimensions().width;
  const displayProperties = {
    cols: props.cols || 2,
    padding: props.pagePadding || gap.M,
    imgGap: props.imageGap || gap.M
  }
  const {cols, padding, imgGap} = displayProperties;
  const imgWidth = (windowWidth / cols) - padding - (imgGap / cols)
  const imgHeight = imgWidth / 3 * 4;

  return (
  <CardImgContainer style={[{width: imgWidth, height: imgHeight}, props.style]}>
    {Boolean(props.source) ? (
      <Image source={{uri: props.source}} style={s.imageContainer} resizeMode="cover"/>
    ) : (
      <View style={s.imageContainer}>
        <FontAwesomeIcon icon={faBox} size={40} style={{color: hexToRGB(color.blueGrey[900], .3)}}/>
      </View>
    )}
  </CardImgContainer>
)}

const ProductImageContainer = styled(View)`
  background-color: ${hexToRGB(color.blueGrey[900], 0.1)};
  border-radius: ${gap.M}px;
  overflow: hidden;
`;

export const ProductImage = (props: any) => {
  const windowWidth = useWindowDimensions().width;
  const imgWidth = windowWidth;
  const imgHeight = imgWidth / 3 * 4;

  return (
  <ProductImageContainer style={[{width: imgWidth, height: imgHeight}, props.style]}>
    {Boolean(props.source) ? (
      <Image source={{uri: props.source}} style={s.imageContainer} resizeMode="cover"/>
    ) : (
      <View style={s.imageContainer}>
        <FontAwesomeIcon icon={faBox} size={40} style={{color: hexToRGB(color.blueGrey[900], .3)}}/>
      </View>
    )}
  </ProductImageContainer>
)}

const s = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})