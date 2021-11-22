import * as React from 'react';
import styled from 'styled-components'
import {Pressable} from 'react-native';
import {P} from 'components/Texts';
import {hexToRGB} from 'util/helperFunctions'
import color from 'util/colors'

const buttonBase = styled(Pressable)`
  padding: 12px;
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

const Button = {
  Primary: PrimaryButton,
  Wire: WireButton,
  Ghost: GhostButton,
};

export default Button;