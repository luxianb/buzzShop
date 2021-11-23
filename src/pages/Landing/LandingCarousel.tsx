import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions} from 'react-native';
import styled from 'styled-components';
import Carousel from 'react-native-snap-carousel';
import {useSpring, animated} from '@react-spring/native';

import {P, Row} from 'components/index';
import {gap, color, hexToRGB} from 'util/index';

const IndicatorItem = styled(animated.View)`
  /* width: ${(props: any) => props.isActive ? '30px' : '10px'}; */
  /* opacity: ${(props: any) => props.isActive ? 1 : .5}; */
  margin-right: ${(props: any) => props.isLast ? '0' : `${gap.S}px`};
  height: 10px;
  border-radius: 5px;
  background-color: ${hexToRGB(color.primary, 0.8)};
`;

const Indicator = (props: any) => {
  const [styles, api] = useSpring(() => ({ opacity: .5, width: 10 }))

  useEffect(() => {
    if (props.isActive) {
      api.start({ opacity: 1, width: 30, config: {duration: 150} })
    } else {
      api.start({ opacity: .5, width: 10, config: {duration: 0} })
    }
  }, [props.isActive]);

  return <IndicatorItem {...props} style={[styles]} />
}

export default function LandingCarousel(props: any) {
  const [activeIndex, setActiveIndex] = useState(0)
  const data = ['', '', '']
  const window = useWindowDimensions();
  const padding = gap.M;

  const CarouselItem = () => (
    <View style={{height: 200, borderRadius: gap.M, backgroundColor: 'red'}}>
      <P>Content</P>
    </View>
  )

  return(
    <>

      <Carousel
        layout="default"
        data={data}
        renderItem={() => <CarouselItem />}
        onSnapToItem={(index) => setActiveIndex(index)}
        sliderWidth={window.width}
        itemWidth={window.width - padding * 2}
        loop
        autoplay={true}
        autoplayInterval={6000}
        {...props}
      />

      <Row style={{marginTop: gap.S, marginHorizontal: padding}}>
        {data.map((item, index: number, arr) => (
          <Indicator 
            isActive={Boolean(index === activeIndex)}
            isLast={Boolean(index === arr.length -1)} 
          />
        ))}
      </Row>

    </>
  )
}

