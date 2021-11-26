import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import styled from 'styled-components';

import {P} from 'components/Texts';

import {gap} from 'util/sizes';
import color from 'util/colors'
import {hexToRGB} from 'util/helperFunctions'


const ChipBase = (props: any) => {
  return (
    <View style={s.chipContainer}>
      <P style={s.chipText}>{props.text}</P>
    </View>
)}

const ToggableChip = (props: any) => {
  return(
  <Pressable onPress={props.onPress}>
    <View style={[s.chipContainer, props.active && {backgroundColor: color.primary}]}>
      <P style={[s.chipText, props.active && {color: color.white}]}>{props.text}</P>
    </View>
  </Pressable>
)}

const Chip = {
  Display: ChipBase,
  Toggable: ToggableChip,
}

const s = StyleSheet.create({
  chipContainer: {
    backgroundColor: hexToRGB(color.blueGrey[700], .1),
    paddingVertical: gap.S,
    paddingHorizontal: gap.M,
    borderRadius: 50,
  },
  chipText: {
    color: color.blueGrey[700],
  }
})

const pStyle = (props: any) => ({
  chipContainer: {
    color: props.active ? color.white : props.color || color.blueGrey[700],
  },
  chipText: {
    color: props.active ? color.white : props.color || color.blueGrey[700],
  }
})

export default Chip