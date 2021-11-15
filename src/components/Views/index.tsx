import React from 'react';
import { SafeAreaView, ScrollView, StyleProp, ViewStyle, View } from 'react-native';
import styled from 'styled-components';

interface Ipage {
  style?: StyleProp<ViewStyle>;
  children?: any;
}

export const Page = (props: Ipage) => (
  <SafeAreaView style={[{flex: 1}]}>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={props.style}
      >
        {props.children}
      </ScrollView>
    </SafeAreaView>
)

const viewBase = styled(View)`
  position: relative;
`

export const Row = styled(viewBase)`
  flex-direction: row;
`

export const Col = styled(viewBase)`
  flex-direction: column;
`