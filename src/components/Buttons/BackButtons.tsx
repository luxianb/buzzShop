import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import {Row, H2} from 'components/index';
import {gap, fontSize, color, hexToRGB} from 'util/index';

const BackButtonContainer = styled(Pressable)`
  background-color: ${color.white};
  box-shadow: 0 0 6px ${hexToRGB(color.black, 0.1)};
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
`

export const ProductBackButton = (props: any) => (
  <BackButtonContainer {...props}>
    <FontAwesomeIcon icon={faChevronLeft} style={{color: color.blueGrey[900]}}/>
  </BackButtonContainer>
)

export const BackableHeader = (props: any) => (
  <Row style={[{alignItems: 'center', marginBottom: gap.L}, props.style]}>
    <Pressable onPress={props.onPress} >
      <FontAwesomeIcon icon={faChevronLeft} style={{marginRight: gap.M}} size={fontSize.L}/>
    </Pressable>
    <H2>{props.title}</H2>
  </Row>
)