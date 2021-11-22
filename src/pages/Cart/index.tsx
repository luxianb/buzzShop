import React from 'react';
import NavBar from "components/NavBar";
import { P } from "components/Texts";
import { Page } from "components/Views";

export default function CartPage(props: any) {
  return(
    <>
      <Page>
        <P>Cart</P>
      </Page>
      <NavBar />
    </>
  )
}