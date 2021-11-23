import * as React from 'react';
import {Pressable} from 'react-native';
import BouncyCheckBox from "react-native-bouncy-checkbox";

import styled from 'styled-components'
import {P} from 'components/Texts';
import {hexToRGB} from 'util/helperFunctions'
import color from 'util/colors'
import {gap} from 'util/sizes';

const buttonBase = styled(Pressable)`
  padding: ${(props: {padding?: number}) => props.padding ? `${props.padding}px` : `${gap.M}px`};
  border-radius: 6px;
  align-items: center;
`;

const ButtonContainer = styled(buttonBase)`

`;

const PrimaryButtonContainer = styled(buttonBase)`
  background-color: ${(prop: any) => prop.color || color.primary};
`;

const GhostButtonContainer = styled(buttonBase)`
  background-color: ${(prop: any) => hexToRGB(prop.color || color.primary, 0.1)};
`;

const WireButtonContainer = styled(buttonBase)`
  background-color: transparent;
  border: ${(prop: any) => `1px solid ${prop.color || color.primary}`};
`;

const PrimaryButton = (props: any) => (
  <PrimaryButtonContainer {...props}>
    <P style={{color: 'white'}}>{props.label}</P>
  </PrimaryButtonContainer>
)
const GhostButton = (props: any) => (
  <GhostButtonContainer {...props}>
    <P style={{color: props.color || color.primary}}>{props.label}</P>
  </GhostButtonContainer>
)
const WireButton = (props: any) => (
  <WireButtonContainer {...props}>
    <P style={{color: props.color || color.primary}}>{props.label}</P>
  </WireButtonContainer>
)

// export const Button = (props: any) => (
//   <ButtonContainer onPress={props.onPress} android_ripple={{color: 'white', foreground: true, }}>
//     <P>{props.label}</P>
//   </ButtonContainer>
// )

export const CheckBox = (props: any) => (
  <BouncyCheckBox
    size={20}
    iconStyle={{borderRadius: gap.XS}}
    bounceEffect={1}
    bounceFriction={100}
    disableText
    fillColor={props.color || color.primary}
    isChecked={props.value}
    onPress={props.onPress}
    style={props.style}
  />
)

const Button = {
  Primary: PrimaryButton,
  Wire: WireButton,
  Ghost: GhostButton,
};

export default Button;