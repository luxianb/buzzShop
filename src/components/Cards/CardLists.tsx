import React, {useEffect, useState} from 'react';
import {FlatList, View, useWindowDimensions, VirtualizedList} from 'react-native';

import {} from 'components/index'
import {ProductCard} from 'components/Cards'

import {gap} from 'util/index'


export const ProductCardList = (props: any) => {
  const {navigation, data} = props;
  const [listData, setListData] = useState([])

  const windowWidth = useWindowDimensions().width;
  const displayProperties = {
    cols: props.cols || 2,
    padding: props.pagePadding || gap.M,
    imgGap: props.imageGap || gap.M
  }
  const {cols, padding, imgGap} = displayProperties;
  const cardSize = (windowWidth / cols) - padding - (imgGap / cols);

  useEffect(() => {
    setListData(data);
  }, [data])

  return (
    // <View style={{backgroundColor: 'red'}}>
      <FlatList
        data={listData}
        numColumns={cols}
        style={{ marginRight: -padding }}
        ItemSeparatorComponent={() => <View style={{ height: gap.M }} />}

        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate("ProductDetail", { product: item }) }
            cardWidth={cardSize}
            colSeparator={imgGap}
          />
        )}
        {...props}
      />
    // </View>
  );
}