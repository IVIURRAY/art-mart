import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements'
import AppHeader from './appHeader';
import { withNavigation } from 'react-navigation';
import { listProducts } from './graphql/queries';
import { Storage, API, graphqlOperation } from 'aws-amplify';

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
      items: []
    }
  }

  async componentDidMount() {
    await this.getAllProducts()
  }

  getAllProducts = async () => {
    console.log('Starting query for data');
    const prods = await API.graphql(graphqlOperation(listProducts));
    // console.log(prods.data.listProducts.items);

    console.log('Start')
    const items = await prods.data.listProducts.items.reduce(async (promisedItems, product) => {
      const items = await promisedItems
      product.mainImageUrl = await this.getProductImage(product.mainImage);
      return items.concat(product)
    }, [])
    console.log('End')
    // console.log('I am items', items);

    this.setState({ items: prods.data.listProducts.items })
    console.log('Query for data complete');
  }

  getProductImage = async (productName) => {
    console.log('starting image get')
    const path = 'products/' + productName;
    const imageUrl = await Storage.get(path)
      .then(result => {
        console.log('successfully got image: ', path);
        return result;
      })
      .catch(err => console.log('ERROR:::' + err));
    console.log('finished image get')

    return imageUrl;
  }

  renderProduct(product) {
    const { name, price, mainImageUrl } = product;
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigate('Product', { product })}
      >
        <View style={styles.productImageContainer}>
          <Image
            style={styles.productImage}
            source={{ uri: mainImageUrl }}
          />
        </View>

        <View style={styles.itemFooter}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.price}>£{price}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { items } = this.state;

    return (
      <View style={styles.container}>
        <AppHeader />
        <View style={{ flex: .5, flexDirection: 'row', paddingBottom: 20 }}>
          <View style={{ flex: 7 }}>
            <Text style={styles.pageTitle}>All products</Text>
            <Text style={styles.itemCount}>Item count: {items.length}</Text>
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
            data={items}
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
