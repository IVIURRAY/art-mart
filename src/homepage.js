import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import BottomNavigationTabs from '../src/bottomNavigationTabs';
import PopularSellers from '../src/popularSellers';
import RecentUploads from '../src/recentUploads';
import Searchbar from '../src/searchbar';
import Categories from './categories';
import AppHeader from './appHeader';

export default class HomePage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <AppHeader />
                    <Searchbar />
                    <Categories />
                    <RecentUploads />
                    <PopularSellers />
                </ScrollView>
                <BottomNavigationTabs />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    }
});