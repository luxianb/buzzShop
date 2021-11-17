import React, {useState} from 'react';
import {TextInput, View, Pressable} from 'react-native';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {gap} from 'util/sizes';
import {Row} from 'components/Views'
import color from 'util/colors';
import { hexToRGB } from 'util/helperFunctions';

export const Input = styled(TextInput)`
  border-width: 1px;
  border-color: ${(prop: any) => prop.error ? color.red['A200'] : 'transparent' };
  border-radius: ${gap.M}px;
  padding: ${gap.M}px;
  background-color: ${hexToRGB(color.blueGrey[900], .05)};
`;


const PseudoInputContainer = styled(Row)`
  border-width: 1px;
  border-color: ${(props: any) => props.error ? color.red['A200'] : 'transparent' };
  /* border-color: ${(prop: any) => prop.error ? color.red['A200'] : color.blueGrey[400] }; */
  padding: ${gap.M}px;
  justify-content: space-between;
  border-radius: ${gap.M}px;
  background-color: ${hexToRGB(color.blueGrey[900], .05)};
`;

export const PasswordInput = (props: any) => {
  const [blur, setBlur] = useState(true);

  return(
    <PseudoInputContainer style={props.style} error={props.error}>
      <TextInput
        {...props}
        secureTextEntry={blur}
        style={[{padding: 0}]}
      />
      <Pressable onPress={() => setBlur(!blur)}>
        {blur ? (
          <FontAwesomeIcon icon={faEyeSlash} style={{opacity: .6}}/>
          ) : (
            <FontAwesomeIcon icon={faEye} style={{opacity: .8}}/>
        )}
      </Pressable>
    </PseudoInputContainer>
  )
}