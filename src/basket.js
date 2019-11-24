import React from 'react';
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import BottomNavigationTabs from '../src/bottomNavigationTabs';
import Icon from 'react-native-vector-icons/AntDesign';
import { withNavigation } from 'react-navigation';
import AppHeader from './appHeader';

const PRODUCTS = [
    {
        id: 1,
        name: "Paint Brush",
        price: 10.00,
        qty: 1,
        image: require('../assets/product1.png')
    },
    {
        id: 2,
        name: "Pens and pencils",
        price: 19.32,
        qty: 1,
        image: require('../assets/product2.png')
    },
    {
        id: 3,
        name: "Art Canvas",
        price: 12.00,
        qty: 3,
        image: require('../assets/product3.png')
    },
    {
        id: 4,
        name: "Sewing machien",
        price: 8.00,
        qty: 1,
        image: require('../assets/product4.png')
    },
]

class Basket extends React.Component {

    renderProduct(product) {
        const { navigate } = this.props.navigation;

        return (
            <TouchableOpacity
                style={styles.productContainer}
                onPress={() => navigate('Product')}
            >
                <View style={{ flex: 1 }}>
                    <Image source={product.image} style={styles.productImage} />
                </View>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    <View style={styles.productInfo}>
                        <Text style={styles.title} >{product.name}</Text>
                        <Text style={styles.qty}>Qty: {product.qty}</Text>
                        <Text style={styles.price}>£ {Number(product.price).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={styles.productRemove}>
                        <Icon name="close" />
                    </View>
                    <View style={styles.productOptions}>
                        <Icon name="plus" />
                        <Text> {product.qty} </Text>
                        <Icon name="minus" />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderBasketProducts = () => {
        return (
            <FlatList
                data={PRODUCTS}
                renderItem={({ item }) => this.renderProduct(item)}
                keyExtractor={item => item.id}
                horizontal={false}
            />
        );
    }

    renderBasketPrices = () => {
        return (
            <View style={styles.totalContainer}>
                <View style={styles.totalSubtitle}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.totalSubtitleLight}>Sub total</Text>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                        <Text style={styles.totalSubtitleDark}>£41.22</Text>
                    </View>
                </View>
                <View style={styles.totalSubtitle}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.totalSubtitleLight}>Shipping</Text>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                        <Text style={styles.totalSubtitleDark}>£6.95</Text>
                    </View>
                </View>
                <View style={styles.totalTitle}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.totalTitleDark}>Total</Text>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                        <Text style={styles.totalTitleDark}>£47.27</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2 }}>
                        {this.renderBasketProducts()}
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderBasketPrices()}
                    </View>
                </View>
                <BottomNavigationTabs />
            </View >
        );
    }
}

const divHeight = 80;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    productImage: {
        width: divHeight,
        height: divHeight,
    },
    productContainer: {
        flex: 1,
        flexDirection: 'row',
        height: divHeight,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 15,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 4,
    },
    productInfo: {
        marginHorizontal: 10
    },
    title: {
        fontSize: 14,
    },
    qty: {
        color: 'grey',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
    },
    productOptions: {
        flexDirection: 'row',
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    productRemove: {
        marginTop: 5,
        marginRight: 5,
        alignSelf: "flex-end"
    },
    totalContainer: {
        flex: 1,
        margin: 20,
    },
    totalSubtitle: {
        flex: 1,
        flexDirection: 'row'
    },
    totalSubtitleLight: {
        color: 'grey',
    },
    totalSubtitleDark: {
        fontWeight: 'bold',
    },
    totalTitle: {
        flex: 1,
        flexDirection: "row",
    },
    totalTitleDark: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    totalRight: {
        alignSelf: 'stretch',
        textAlign: 'right'
    }
});

export default withNavigation(Basket);