import React, { useState } from "react";
import axios from "axios";

import {Button, Prompt, Page} from 'components/index'
import { Input, PasswordInput } from "components/Inputs";
import { BackableHeader } from "components/Buttons/BackButtons";

import {gap, BASE_URL} from 'util/index'
import { useDispatch } from "util/redux/hooks";
import { setLoginInfo } from "util/redux/slices/tokenSlice";

export default function LoginPage(props: any) {
  const {navigation} = props;
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const res =  await axios.post(`${BASE_URL}/user/login/`, form);
      // console.log(res)
      const userInfo = await axios.get(`${BASE_URL}/decodeJWT/${res.data.token}/`)
      // console.log(userInfo);

      const loginInfo = {access: res.data.token, userInfo: userInfo.data}

      await dispatch(setLoginInfo(loginInfo));
      navigation.navigate("Landing");
    } catch (err) {
      console.log(err)
      setError(true);
    }
  }

  return(
    <Page style={{padding: gap.M}}>
      <BackableHeader
        onPress={() => navigation.goBack()}
        title="Log In"
      />

      <Input
        placeholder="User name"
        value={form.username}
        onChangeText={(username: string) => setForm({...form, username})}
        autoCapitalize='none'
        style={{marginBottom:gap.M}}
      />
      <PasswordInput
        placeholder="Password"
        value={form.password}
        onChangeText={(password: string) => setForm({...form, password})}
        style={{marginBottom:gap.M}}
      />
      {error && (<Prompt.Error>Unable to login, check if you are using the right username or password</Prompt.Error>)}
      <Button.Primary 
        label="Log In"
        style={{position: "absolute", bottom: 0, left: gap.M, right: gap.M}}
        onPress={() => handleLogin()}
      />
    </Page>
  );
      
}