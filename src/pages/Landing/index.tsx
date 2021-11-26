import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

import axios from "axios";

import { H1, Col, Page, Chip, Row } from "components/index";
import NavBar from "components/NavBar";

import { gap, BASE_URL, color } from "util/index";
import { useSelector } from "util/redux/hooks";
import LandingCarousel from "./LandingCarousel";
import { ProductCardList } from "components/Cards/CardLists";

const Landing = (props: any) => {
  const { navigation, route } = props;
  const { access: accessToken, userInfo } = useSelector((state) => state.token);
  const [products, setProducts] = useState<{status: string, data: Product[]}>({ status: "initial", data: [] });
  const [displayedProducts, setDisplayedProducts] = useState<Product[] | []>([])
  const [tagFilter, setTagFilter] = useState('');
  const [cloudData, setCloudData] = useState({status: 'initial', tags: [], banners: []});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/product/`);
        console.log(res);
        setProducts({ status: "fetched", data: res.data });
      } catch (err) { console.log(err); }
    }
    async function fetchCloudData() {
      try {
        const res = await axios.get(`${BASE_URL}/enviroment/`);
        console.log(res);
        setCloudData({ status: "fetched", ...res.data });
      } catch (err) { console.log(err); }
    }
    
    navigation.addListener('focus', () => {
      fetchProducts();
      fetchCloudData();
    })
  }, [navigation]);

  useEffect(() => {
    filterProducts()
  }, [tagFilter])

  function filterProducts() {
    console.log(tagFilter);
    const productToDisplay = [...products.data.filter((item) => item.tags.includes(tagFilter))]
    console.log(productToDisplay);
    setDisplayedProducts(productToDisplay);
  }

  const Header = () => (
    <Col style={{ paddingHorizontal: gap.M }}>
      <H1 style={{ marginBottom: gap.XL }}>
        Welcome {accessToken ? `${userInfo.username}` : ""}
      </H1>
    </Col>
  )

  const Carousel = () => (
    <Col style={{marginBottom: gap.L}}>
      <LandingCarousel data={cloudData.banners}/>
    </Col>
  )

  const FilterList = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Row style={{justifyContent: 'flex-start', paddingHorizontal: gap.M, marginBottom: gap.M}}>
          <Chip.Toggable 
            text={'All Products'}
            active={'' === tagFilter}
            onPress={() => setTagFilter('')}
          />
          <View style={{width: gap.S}} />
        {cloudData.tags.map((tag: any, index, arr) => (
          <>
            <Chip.Toggable 
              text={tag.name}
              active={tag.value === tagFilter}
              onPress={() => setTagFilter(tag.value)}
            />
            {index !== arr.length - 1 && <View style={{width: gap.S}} />}
          </>
          ))}
      </Row>
    </ScrollView>
  )


  if (cloudData.status === 'initial' || products.status === 'initial' ) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={color.primary} />
      </View>
    )
  }
  return (
    <>
    <Page>
      <ProductCardList
        ListHeaderComponentStyle={{marginHorizontal: -gap.M}}
        ListHeaderComponent={
          <>
            <Header />
            <Carousel />
            <FilterList />
          </>
        }
        contentContainerStyle={{paddingHorizontal: gap.M, flexGrow: 1}}
        data={tagFilter ? displayedProducts : products.data}
        navigation={navigation}
      />
      </Page>
      <NavBar navigation={navigation} />
    </>
  );
}

export default Landing