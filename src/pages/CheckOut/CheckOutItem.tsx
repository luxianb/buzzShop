import React from 'react';

import {Row, Col, Image, P, H5} from 'components/index';
import {gap} from 'util/index';

export default function CheckOutItem(props: any) {
  const {product, amount} = props;

  return(
    <Row>
      <Image.Square source={product?.image_url}/>
      <Col style={{flex: 1, marginLeft: gap.S}}>
        <P>{product?.name}</P>
        <Row style={{justifyContent: 'space-between', marginTop: gap.S}}>
          <H5>${product.price}</H5>
          <H5>Amt: {amount}</H5>
        </Row>
      </Col>
    </Row>
  )
}