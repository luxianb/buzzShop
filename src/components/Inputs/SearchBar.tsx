import React from 'react';
import {TextInput, Pressable} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { PseudoInputContainer } from ".";
import {gap} from 'util/sizes'
import color from 'util/colors'

export default function SearchBar(props: any) {
  return(
    <PseudoInputContainer style={props.style}>
      <FontAwesomeIcon icon={faSearch} style={{color: color.blueGrey[600], marginRight: gap.M}} />
      <TextInput
        {...props}
        style={[{padding: 0, flex: 1}]}
        placeholderTextColor={color.blueGrey[400]}
        placeholder="Search for..."
      />
    </PseudoInputContainer>
  );
}