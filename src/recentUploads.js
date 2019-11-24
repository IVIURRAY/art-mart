import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listProducts } from './graphql/queries';
import Storage from '@aws-amplify/storage';

UPLOADS = [
    {
        id: 1,
        name: 'Brush',
        avatar: require('../assets/airpod1.png'),
        price: 10.00
    },
    {
        id: 2,
        name: 'Pen',
        avatar: require('../assets/airpod2.png'),
        price: 10.00
    },
    {
        id: 3,
        name: 'Paints',
        avatar: require('../assets/airpod3.png'),
        price: 10.00
    }
]



class RecentUploads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    async componentDidMount() {
        await this.getRecentProducts()
    }

    getRecentProducts = async () => {
        console.log('Starting query for data');
        const prods = await API.graphql(graphqlOperation(listProducts));
        // console.log(prods.data.listProducts.items);

        console.log('Start')
        const items = await prods.data.listProducts.items.reduce(async (promisedItems, product) => {
            const items = await promisedItems
            product.mainImage = await this.getProductImage(product.mainImage);
            return items + product
        }, [])
        console.log('End')
        console.log('I am items', items);

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

    renderUpload(product, i) {
        const { price, name, mainImage } = product;
        const { navigate } = this.props.navigation;

        return (
            <TouchableOpacity
                style={styles.carouselItem}
                onPress={() => navigate('Product')}
            >
                <Image
                    style={styles.carouselItemImage}
                    source={{ uri: mainImage }}
                />
                <Text style={styles.carouseTitle}>{name}</Text>
                <Text style={styles.carouselSubTitle}>£{Number(price).toFixed(2)}</Text>
            </TouchableOpacity >

        );
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >Recent uploads...</Text>
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => this.renderUpload(item)}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />

            </View>
        );
    }

};

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'System',
        fontWeight: 'bold',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    carouseTitle: {
        fontSize: 20,
        fontFamily: 'System',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    carouselSubTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'System',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    carouselItem: {
        margin: 10,
    },
    carouselItemImage: {
        borderRadius: 15,
        height: (screenHeight / 3),
        width: (screenWidth / 2) - 20,
    }
})

export default withNavigation(RecentUploads);