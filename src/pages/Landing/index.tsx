import React from 'react';
import { Page, Col, Row } from 'components/Views';
import { useSelector, useDispatch } from 'util/redux/hooks';
import { P, H1 } from 'components/Texts';
import {Button} from 'components/Buttons';
import {increment, decrement} from 'util/redux/slices/counterSlice'

export default function Landing() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return(
    <Page>
      <Col>
        <H1>{count}</H1>
        <Row>
          <Button onPress={() => dispatch(increment())} label={'+'} />
          <Button onPress={() => dispatch(decrement())} label={'-'} />
        </Row>
        <P>Hello World</P>
      </Col>
    </Page>
  )
};