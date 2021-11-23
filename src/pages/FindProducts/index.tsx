import React from 'react';
import NavBar from "components/NavBar";
import { P } from "components/Texts";
import { Page } from "components/Views";

export default function FindProducts(props: any) {
  const {navigation} = props;
  return(
    <>
      <Page>
        <P>Search Page</P>
      </Page>
      <NavBar navigation={navigation}/>
    </>
  )
}