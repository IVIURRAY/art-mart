import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PopularSellers from '../src/popularSellers';
import RecentUploads from '../src/recentUploads';
import Searchbar from '../src/searchbar';
import Categories from './categories';

export default class HomePage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Searchbar />
                    <Categories />
                    <RecentUploads />
                    <PopularSellers />
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});