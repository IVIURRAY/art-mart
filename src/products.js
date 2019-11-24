import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements'
import AppHeader from './appHeader';
import { withNavigation } from 'react-navigation';

const DATA = [
  {
    id: '1',
    title: 'First Item',
    price: 10.00,
    image: require('../assets/product1.png')
  },
  {
    id: '2',
    title: 'Second Item',
    price: 9.99,
    image: require('../assets/product2.png')
  },
  {
    id: '3',
    title: 'Third Item',
    price: 10.00,
    image: require('../assets/product3.png')
  },
  {
    id: '4',
    title: 'Fourth Item',
    price: 10.00,
    image: require('../assets/product1.png')
  },
  {
    id: '5',
    title: 'Fith Item',
    price: 9.99,
    image: require('../assets/product2.png')
  },
  {
    id: '6',
    title: 'Sixth Item',
    price: 10.00,
    image: require('../assets/product3.png')
  },
];

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleItemView: false,
    }
  }

  renderProduct(item) {
    const { title, price, image } = item;
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigate('Product')}
      >
        <View style={styles.productImageContainer}>
          <Image
            style={styles.productImage}
            source={image}
          />
        </View>

        <View style={styles.itemFooter}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>£{Number(price).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader />
        <View style={{ flex: .5, flexDirection: 'row', paddingBottom: 20 }}>
          <View style={{ flex: 7 }}>
            <Text style={styles.pageTitle}>All products</Text>
            <Text style={styles.itemCount}>Item count: {DATA.length}</Text>
          </View>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <Icon
              raised
              size={18}
              name="appstore-o"
              type="antdesign"
              onPress={() => this.setState({ singleItemView: !this.state.singleItemView })}
            />
          </View>
        </View>
        <View style={{ flex: 9.5 }}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => this.renderProduct(item)}
            key={this.state.singleItemView ? 'single' : 'multi'}
            keyExtractor={item => item.id}
            numColumns={this.state.singleItemView ? 1 : 2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View >

    );
  };
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    flex: 1,
    height: screenHeight / 1.8,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  productImageContainer: {
    flex: 1.5,
    padding: 4,
  },
  productImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10
  },
  itemFooter: {
    flex: 0.5,
  },
  itemCount: {
    fontSize: 12,
    textAlign: "left",
    marginHorizontal: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "left",
    marginHorizontal: 20,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
  },
  price: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
  }
});

export default withNavigation(Products);
