import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import NavBar from "components/NavBar";
import axios from 'axios';

import { P, H2, Page } from "components/index";
import {ProductCardList} from 'components/Cards/CardLists'
import SearchBar from 'components/Inputs/SearchBar';
import { gap, BASE_URL, color } from "util/index";

export default function FindProducts(props: any) {
  const {navigation} = props;

  const [products, setProducts] = useState({status: 'initial', data:[]})
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredList, setFliteredList] = useState(products.data)

  async function fetchProducts() {
    try {
      const res = await axios.get(`${BASE_URL}/product/`)
      setProducts({status: 'loaded', data:res.data});

    } catch (err) {console.log(err)}
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  function handleSearch(query: string) {
    console.log("search query:", query)
    let filteredProducts = [...products.data];
    if (query) {
      filteredProducts = filteredProducts.filter((product: any) => product.name.toLowerCase().includes(query.toLowerCase()))
    }

    console.log("filtered list:", filteredProducts)
    setFliteredList(filteredProducts);
  }

  return(
    <>
      <Page style={{padding: gap.M}}>
        <H2 style={{marginBottom: gap.L}}>Search</H2>

        <SearchBar
          style={{marginBottom: gap.M}}
          value={searchQuery}
          onChangeText={(query: string) => {
            setSearchQuery(query);
            handleSearch(query)
          }}
        />
        <ProductCardList
          data={searchQuery.length > 0 ? filteredList : products.data}
          navigation={navigation}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={() => (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <P style={{color: color.blueGrey[400]}}>No such product found...</P>
            </View>
          )}
        />

      </Page>
      <NavBar navigation={navigation}/>
    </>
  )
}