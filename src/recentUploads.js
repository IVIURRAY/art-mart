import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listProducts } from './graphql/queries';
import Amplify, { Storage } from "aws-amplify";

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
        this.getRecentProducts()
        this.getFileTest()
    }

    getRecentProducts = async () => {
        console.log('Starting query for data');
        const prods = await API.graphql(graphqlOperation(listProducts));
        this.setState({ items: prods.data.listProducts.items })
        console.log('Query for data complete');
    }

    getFileTest = async () => {
        console.log('starting image get')
        const path = 'images/users/';
        // await Amplify.Auth.currentAuthenticatedUser().then(response => console.log(response))
        Storage.get('assets/products/airpod1.png')
            .then(result => console.log('RESULT:::' + result))
            .catch(err => console.log('ERROR:::' + err));
        console.log('finished image get')
    }

    renderUpload(product, i) {
        const { price, name } = product;
        const { navigate } = this.props.navigation;

        return (
            <TouchableOpacity
                style={styles.carouselItem}
                onPress={() => navigate('Product')}
            >
                <Image
                    style={styles.carouselItemImage}
                    source={{ uri: 'https://art-mart-storage-dev.s3-eu-west-1.amazonaws.com/images/products/airpod1.png' }}
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