import React from 'react';
import { SafeAreaView, ScrollView, StyleProp, ViewStyle, View } from 'react-native';
import styled from 'styled-components';

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