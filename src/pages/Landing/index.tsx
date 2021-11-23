import React, { useEffect, useState } from "react";
import { FlatList, View, ScrollView } from "react-native";

import axios from "axios";

import { H1, Col, Page } from "components/index";
import NavBar from "components/NavBar";
import { ProductCard } from "components/Cards";

import { gap, BASE_URL } from "util/index";
import { useSelector } from "util/redux/hooks";
import LandingCarousel from "./LandingCarousel";

export default function Landing(props: any) {
  const { navigation, route } = props;
  const { access: accessToken, userInfo } = useSelector((state) => state.token);
  const [products, setProducts] = useState({ status: "initial", data: [] });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/product/`);
        console.log(res);
        setProducts({ status: "fetched", data: res.data });
      } catch (err) { console.log(err); }
    }

    fetchProducts();
  }, [navigation]);

  return (
    <>
      <Page>
        <ScrollView>
          <Col style={{ paddingHorizontal: gap.M }}>
            <H1 style={{ marginBottom: gap.XL }}>
              Welcome {accessToken ? `${userInfo.username}` : ""}
            </H1>
          </Col>

          <Col style={{marginBottom: gap.L}}>
          <LandingCarousel />
          </Col>

          <Col style={{ paddingHorizontal: gap.M }}>
            <FlatList
              data={products.data}
              numColumns={2}
              style={{ marginRight: -gap.M }}
              ItemSeparatorComponent={() => <View style={{ height: gap.M }} />}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  onPress={() =>
                    navigation.navigate("ProductDetail", { product: item })
                  }
                />
              )}
            />
          </Col>

        </ScrollView>
      </Page>
      <NavBar navigation={navigation} />
    </>
  );
}
