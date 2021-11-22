import React from 'react';
import {View, Pressable, ScrollView, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components';

import {color, gap, hexToRGB} from 'util/index';
import {Col} from 'components/Views';

const ModalBase = styled(Pressable)`
  background-color: ${hexToRGB(color.blueGrey[900], .1)};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  padding: ${gap.M}px;
`

const ModalCard = styled(Col)`
  background-color: ${color.white};
  box-shadow: 0 0 6px ${hexToRGB(color.black, .1)};
  border-radius: ${gap.S}px;
  padding: ${gap.L}px;
  max-width: 350px;
  z-index: 2;
`

const Modal = (props: any) => {
  return (
  <ModalBase onPress={props.closeAction}  disabled={props.disableCloseOnTap || !props.closeAction}>
    <TouchableWithoutFeedback>
      <ModalCard style={props.style} >
        {props.children}
      </ModalCard>
    </TouchableWithoutFeedback>
  </ModalBase>
)}

export default Modal;