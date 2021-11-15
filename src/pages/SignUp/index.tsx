import { Input, PasswordInput } from 'components/Inputs';
import { H2 } from 'components/Texts';
import { Page } from 'components/Views';
import React, { useReducer } from 'react';
import {gap} from 'util/sizes';

const initialState = {
  userName: '',
  email: '',
  password: '',
  rePassword: '',
};

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case "SET_STATE": return {...state, ...action.payload}
    default: return state;
  }
}

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setState(value: any) {dispatch({type: "SET_STATE", payload: value})}
  
  return(
    <Page style={{padding: gap.M}}>
      <H2 style={{marginBottom: gap.L}}>Sign Up</H2>
      <Input
        placeholder="User name"
        value={state.userName}
        onChange={(name) => setState({userName: name})}
        style={{marginBottom:gap.M}}
        />
      <Input
        placeholder="Email"
        value={state.email}
        onChange={(email) => setState({email})}
        keyboardType="email-address"
        style={{marginBottom:gap.M}}
        />
      <PasswordInput
        placeholder="Password"
        value={state.password}
        onChange={(password: String) => setState({password})}
        style={{marginBottom:gap.M}}
      />
      <PasswordInput
        placeholder="Confirm you password"
        value={state.rePassword}
        onChange={(rePassword: String) => setState({rePassword})}
      />
    </Page>
  );
}