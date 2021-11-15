import React, {useState} from 'react';
import {TextInput, View, Pressable} from 'react-native';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {gap} from 'util/sizes';
import {Row} from 'components/Views'

export const Input = styled(TextInput)`
  border: 1px;
  padding: ${gap.M}px;
  border-radius: ${gap.S}px;
  `;

const PseudoInputContainer = styled(Row)`
  border: 1px;
  padding: ${gap.M}px;
  justify-content: space-between;
  border-radius: ${gap.S}px;

`;

export const PasswordInput = (props: any) => {
  const [blur, setBlur] = useState(false);

  return(
    <PseudoInputContainer style={props.style}>
      <TextInput
        {...props}
        secureTextEntry={blur}
        style={[{padding: 0}]}
      />
      <Pressable onPress={() => setBlur(!blur)}>
        {blur ? (
          <FontAwesomeIcon icon={faEyeSlash} style={{opacity: .8}}/>
          ) : (
            <FontAwesomeIcon icon={faEye}/>
        )}
      </Pressable>
    </PseudoInputContainer>
  )
}