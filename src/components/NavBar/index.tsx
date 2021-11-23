import React from 'react';
import {Pressable, Platform} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartPlus, faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

import {Col, Row, P} from 'components/index';
import { fontSize, gap, color, hexToRGB } from 'util/index';

const Container = styled(Row)`
  /* height: ${Platform.OS === 'ios' ? "80px" : "60px"}; */
  align-items: center;
  box-shadow: 0 0 4px ${hexToRGB(color.black, 0.15)};
  background-color: ${color.white};
  z-index: 2;
  /* padding-bottom: ${Platform.OS === 'ios' ? '20px' : "initial"}; */
`;

const ItemContainer = styled(Col)`
  flex: 1;
  align-items: center;
  
`;

const ItemLabel = styled(P)`
  font-size: ${fontSize.XS}px;
  margin-top: ${gap.XS}px;
`;

const NavItem = (props: any) => (
  <ItemContainer>
    <Pressable onPress={() => props.onPress()} style={{alignItems: 'center'}}>
      <FontAwesomeIcon icon={props.icon} style={{color: props.isActive ? color.primary : color.black}} size={fontSize.L}/>
      <ItemLabel style={{color: props.isActive ? color.primary : color.black}}>{props.label}</ItemLabel>
    </Pressable>
  </ItemContainer>
)

export default function NavBar(props: any) {
  const route = useRoute();
  const {navigation} = props;
  const safeArea = Math.max(useSafeAreaInsets().bottom, 16)

  return(
    <Container style={{height: 60 + safeArea, paddingBottom: safeArea}}>
      <NavItem
        icon={faHome}
        label={"Home"}
        onPress={() => navigation.navigate("Landing")}
        isActive={route.name === "Landing"}
      />
      <NavItem
        icon={faSearch}
        label={"Search"}
        onPress={() => navigation.navigate("Search")}
        isActive={route.name === "Search"}
      />
      <NavItem
        icon={faCartPlus}
        label={"Cart"}
        onPress={() => navigation.navigate("Cart")}
        isActive={route.name === "Cart"}
      />
      <NavItem
        icon={faUser}
        label={"Profile"}
        onPress={() => navigation.navigate("Profile")}
        isActive={route.name === "Profile"}
      />
    </Container>
  )
}