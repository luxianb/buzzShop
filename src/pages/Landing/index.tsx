import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import axios from "axios";

import { H1, Col, Page, Chip, Row } from "components/index";
import NavBar from "components/NavBar";

import { gap, BASE_URL } from "util/index";
import { useSelector } from "util/redux/hooks";
import LandingCarousel from "./LandingCarousel";
import { ProductCardList } from "components/Cards/CardLists";

const Landing = (props: any) => {
  const { navigation, route } = props;
  const { access: accessToken, userInfo } = useSelector((state) => state.token);
  const [products, setProducts] = useState<{status: string, data: Product[]}>({ status: "initial", data: [] });
  const [displayedProducts, setDisplayedProducts] = useState<Product[] | []>([])
  const [tagFilter, setTagFilter] = useState('');
  const filterTags = [{value: '', name: 'All Products'}, {value: 'electronic', name: "Electronics"}]

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/product/`);
        console.log(res);
        setProducts({ status: "fetched", data: res.data });
      } catch (err) { console.log(err); }
    }
    
    navigation.addListener('focus', () => {
      fetchProducts();
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
      <LandingCarousel />
    </Col>
  )

  const FilterList = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Row style={{justifyContent: 'flex-start', paddingHorizontal: gap.M, marginBottom: gap.M}}>
        {filterTags.map((tag: any, index, arr) => (
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
        contentContainerStyle={{paddingHorizontal: gap.M}}
        data={tagFilter ? displayedProducts : products.data}
        navigation={navigation}
      />
      </Page>
      <NavBar navigation={navigation} />
    </>
  );
}

export default Landing