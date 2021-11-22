import React from 'react';
import {TextInput, Pressable} from 'react-native';
import { PseudoInputContainer } from ".";
import color from 'util/colors'

export default function SearchBar(props: any) {
  return(
    <PseudoInputContainer>
      <TextInput
        {...props}
        style={[{padding: 0, flex: 1}]}
        placeholderTextColor={color.blueGrey[400]}
      />
    </PseudoInputContainer>
  );
}