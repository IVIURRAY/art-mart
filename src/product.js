import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';

class Product extends React.Component {

    render() {
        const product = {};
        const { name, price, description, mainImageUrl } = product;

        return (
            <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1.5 }}>
                        <Swiper activeDotColor='white' dotStyle={{ backgroundColor: 'grey' }} style={styles.wrapper}>
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{ uri: mainImageUrl }} />
                            </View>
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{ uri: mainImageUrl }} />
                            </View>
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{ uri: mainImageUrl }} />
                            </View>
                        </Swiper>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 20 }}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subTitle}>Description</Text>
                        <Text style={styles.text}>{description}</Text>
                    </View>
                    <View style={{ flex: .5, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.price} >£{price}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Icon reverse raised color="white" iconStyle={styles.favIcon} name="heart" type="antdesign" />
                        </View>
                        <View style={{ flex: 2 }}>
                            <Button onPress={() => console.log('Basket')} buttonStyle={styles.buyButton} containerStyle={styles.buyButtonContainer} title="ADD TO CART" />
                        </View>
                    </View>
                </View>
            </View >
        );
    }

}


const styles = StyleSheet.create({
    wrapper: {
        color: 'white',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    subTitle: {
        fontSize: 20,
        color: 'grey',
        paddingVertical: 10,
    },
    text: {
        fontSize: 18,
        color: 'grey',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingHorizontal: 20,
    },
    favIcon: {
        color: 'grey',
    },
    buyButton: {
        backgroundColor: 'black',
    },
    buyButtonContainer: {
        padding: 10
    }
});

export default Product;