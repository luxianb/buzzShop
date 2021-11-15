import * as React from 'react';
import styled from 'styled-components'
import {Pressable} from 'react-native';
import {P} from 'components/Texts';

const buttonBase = styled(Pressable)`
  padding: 6px 12px;
  background-color: red;
  border-radius: 6px;
`;

const ButtonContainer = styled(buttonBase)`

`;


export const Button = (props: any) => (
  <ButtonContainer onPress={props.onPress} android_ripple={{color: 'white', foreground: true, }}>
    <P>{props.label}</P>
  </ButtonContainer>
)