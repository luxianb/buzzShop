import React, { useReducer } from 'react';
import axios from 'axios';
import validator from 'validator';

import { Prompt, Col, Page, Button } from 'components/index';
import { Input, PasswordInput } from 'components/Inputs';
import {BackableHeader} from 'components/Buttons/BackButtons';

import { gap, BASE_URL } from 'util/index';
import { useDispatch } from 'util/redux/hooks';
import { setLoginInfo } from 'util/redux/slices/tokenSlice';


const initialState = {
  username: '',
  email: '',
  password: '',
  rePassword: '',
  error: {
    username: '',
    email: '',
    password: '',
  },
  signupSuccess: false,
};

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case "SET_STATE": return {...state, ...action.payload}
    case "SET_ERROR": return {...state, error: {...state.error, ...action.payload}}
    default: return state;
  }
}


export default function SignUp(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const DISPATCH = useDispatch();
  const {navigation} = props;

  function setState(value: Object) {dispatch({type: "SET_STATE", payload: value})}
  function setError(value: Object) {dispatch({type: "SET_ERROR", payload: value})}

  function checkForm() {
    const errors = {...initialState.error};
    // Username check
    if (!state.username) {
      errors.username = "Include a user name"
    }
    // Email check
    if (!state.email) {
      errors.email = "Include an email";
    } else if (!validator.isEmail(state.email)) {
      errors.email = "Include a valide email address";
    }

    // Password check
    if (!state.password) {
      errors.password = "Include a password";
    } 
    // else if (!validator.isStrongPassword(state.password, {minSymbols: 0, minLowercase: 0})) {
    //   errors.password = "Include at least 1 uppercase, and 1 number";
    // }
     else if (state.password !== state.rePassword) {
      errors.password = "Passwords do not match";
    }

    setError(errors);
    if(!errors.username && !errors.email && !errors.password) {
      // console.log("Checks passed");
      createAccount();
    }
  }

  async function createAccount() {
    const {username, email, password} = state;
    const form = {username, email, password}
    try {
      const res = await axios.post(`${BASE_URL}/user/signup/`, form);
      // console.log(res);
      if (res.status === 201) {
        setState({signupSuccess: true})
        setTimeout(async () => {
          const loginResponse = await axios.post(`${BASE_URL}/user/login/`, {username, password});
          const userInfoResponse = await axios.get(`${BASE_URL}/user/${username}/`)
          console.log(loginResponse)
          if (loginResponse.status === 200) {
            await DISPATCH(setLoginInfo({access: loginResponse.data.token, userInfo: userInfoResponse.data}));
            navigation.navigate("Landing")
          }
        }, 150)

      }
    } catch (err) {
      console.log(err)
    }
  }
  
  return(
    <Page style={{padding: gap.M}}>

      <BackableHeader
        onPress={() => navigation.goBack()}
        title="Sign Up"
      />

      {/* Username Field */}
      <Col style={{marginBottom:gap.M}}>
        <Input
          placeholder="User name"
          value={state.username}
          onChangeText={(name) => setState({username: name})}
          autoCapitalize='none'
          error={Boolean(state.error.username)}
        />
        {Boolean(state.error.username) && (
          <Prompt.Error>{state.error.username}</Prompt.Error>
        )}
      </Col>

      {/* Email Field */}
      <Col style={{marginBottom:gap.M}}>
        <Input
          placeholder="Email"
          value={state.email}
          onChangeText={(email) => setState({email})}
          keyboardType="email-address"
          autoCapitalize='none'
          error={Boolean(state.error.email)}
        />
        {Boolean(state.error.email) && (
          <Prompt.Error>{state.error.email}</Prompt.Error>
        )}
      </Col>

      {/* Password Fields */}
      <Col style={{marginBottom:gap.M}}>
        <PasswordInput
          placeholder="Password"
          value={state.password}
          onChangeText={(password: String) => setState({password})}
          error={Boolean(state.error.password)}
        />
        {Boolean(state.error.password) && (
          <Prompt.Error>{state.error.password}</Prompt.Error>
        )}
      </Col>
      <PasswordInput
        placeholder="Confirm you password"
        value={state.rePassword}
        onChangeText={(rePassword: String) => setState({rePassword})}
      />

      {state.signupSuccess && (
        <Prompt.Success style={{marginTop: gap.L}}>Account successfully created</Prompt.Success>
      )}

      
      {/* Sign up button */}
      <Button.Primary 
        label="Sign Up"
        style={{position: "absolute", bottom: 0, left: gap.M, right: gap.M}}
        onPress={() => checkForm()}
      />
    </Page>
  );
}