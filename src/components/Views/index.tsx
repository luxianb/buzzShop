import React from 'react';
import { SafeAreaView, ScrollView, StyleProp, ViewStyle, View } from 'react-native';
import styled from 'styled-components';

import {gap} from 'util/sizes';
import color from 'util/colors';
import {hexToRGB} from 'util/helperFunctions';

interface Ipage {
  style?: StyleProp<ViewStyle>;
  children?: any;
}

export const Page = (props: Ipage) => {

  return (
  <SafeAreaView style={[{flex: 1}]}>
    <View style={[{flex: 1}, props.style]}>
      {/* <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={props.style}
        contentContainerStyle={{minHeight: window.height}}
      > */}
        {props.children}
      {/* </ScrollView> */}
      </View>
    </SafeAreaView>
)}

const viewBase = styled(View)`
  position: relative;
`

export const Row = styled(viewBase)`
  flex-direction: row;
`

export const Col = styled(viewBase)`
  flex-direction: column;
`

export const Hr = styled(View)`
  /* flex: 1; */
  height: 1px;
  margin: ${gap.L}px 0;
  background-color: ${(props: {color?: string}) => props.color || hexToRGB(color.blueGrey[900], .3)};
`;