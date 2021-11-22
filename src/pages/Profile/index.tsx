import React from 'react';
import {View} from 'react-native';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import NavBar from "components/NavBar";
import { P, H3, Page, Row, Col, Hr, Button } from "components/index";
import {hexToRGB, color, gap} from "util/index"
import {useSelector, useDispatch} from 'util/redux/hooks'
import {removeLoginInfo} from 'util/redux/slices/tokenSlice'

const ProfilePic = () => {
  const Container = styled(View)`
    height: 60px;
    width: 60px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    background-color: ${hexToRGB(color.primary, .1)};
  `;

  return(
    <Container>
      <FontAwesomeIcon icon={faUser} style={{color: hexToRGB(color.primary, .6)}} size={30} />
    </Container>
  )
}

export default function ProfilePage(props: any) {
  const {navigation} = props
  const {userInfo, access} = useSelector(state => state.token)
  const dispatch = useDispatch();

  return (
    <>
      <Page style={{ padding: gap.M }}>
        {Boolean(access) ? (
          <>
            <Row>
              <ProfilePic />
              <Col style={{ marginLeft: gap.S }}>
                <H3 style={{ textTransform: "capitalize" }}>
                  {userInfo.username}
                </H3>
                <P>{userInfo.email}</P>
              </Col>
            </Row>
            <Hr />
            <Button.Ghost label="Log Out" onPress={() => dispatch(removeLoginInfo())}/>
          </>
        ) : (
          <>
            <Button.Primary
              label="Log In"
              onPress={() => navigation.navigate("Login")}
              style={{ marginBottom: gap.M }}
            />
            <Button.Ghost
              label="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
            />
          </>
        )}
      </Page>
      <NavBar />
    </>
  );
}