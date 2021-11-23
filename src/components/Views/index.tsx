import React from 'react';
import { SafeAreaView, ScrollView, StyleProp, ViewStyle, View } from 'react-native';
import styled from 'styled-components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavBar from 'components/NavBar';
import {gap} from 'util/sizes';
import color from 'util/colors';
import {hexToRGB} from 'util/helperFunctions';

interface Ipage {
  style?: StyleProp<ViewStyle>;
  children?: any;
}

export const Page = (props: Ipage) => {
  const safeArea = {
    bottom: Math.max(useSafeAreaInsets().bottom, 16),
    top: Math.max(useSafeAreaInsets().top, 16),
  };

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <View style={[{ flex: 1 }, props.style]}>
        {/* <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={props.style}
        contentContainerStyle={{minHeight: window.height}}
      > */}
        {props.children}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};
// export const Page = (props: any) => {
//   const {showNavBar, navigation} = props;
//   const safeArea = {
//     bottom: Math.max(useSafeAreaInsets().bottom, 16),
//     top: Math.max(useSafeAreaInsets().top, 16),
//   };
//   const SafeAreaContainer = styled(View)`
//     flex: 1;
//     padding-top: ${safeArea.top}px;
//     /* padding-bottom: ${safeArea.bottom}px; */
//     background-color: ${color.white};
//     z-index: 1;
//   `
//   const PageView = styled(View)`
//     flex: 1;
//   `

//   return (
//     <SafeAreaContainer>
//       <PageView style={props.style}>
//         {props.children}
//       </PageView>
//       {showNavBar && <NavBar navigation={navigation} />}
//     </SafeAreaContainer>
//   );
// };

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