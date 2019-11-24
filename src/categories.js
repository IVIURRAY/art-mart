import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { withNavigation } from 'react-navigation';

const CATEGORIES = [
    {
        id: '1',
        title: 'Paint',
    },
    {
        id: '2',
        title: 'Penciles',
    },
    {
        id: '3',
        title: 'Tools',
    },
    {
        id: '4',
        title: 'Ink',
    },
    {
        id: '5',
        title: 'Other',
    },
    {
        id: '6',
        title: 'Haydn',
    },
    {
        id: '7',
        title: 'Fran',
    },
    {
        id: '8',
        title: 'Fran',
    },
    {
        id: '9',
        title: 'Fran',
    },
    {
        id: '10',
        title: 'Fran',
    },
    {
        id: '11',
        title: 'Fran',
    },
];



class Categories extends React.Component {

    changeTab() {
        const { navigate } = this.props.navigation;
        navigate('Products');
    }


    renderCategory(item, i) {
        return (<Text key={i} tabLabel={item.title} />);
    }

    render() {


        return (
            <View style={styles.categories}>
                <ScrollableTabView
                    style={{ marginTop: 5 }}
                    initialPage={this.initialTab}
                    renderTabBar={() => <ScrollableTabBar style={{ borderColor: 'white' }} />}
                    tabBarTextStyle={{ color: 'black' }}
                    tabBarUnderlineStyle={styles.categoryUnderline}
                    onChangeTab={() => this.changeTab()}
                >
                    {CATEGORIES.map((item, i) => this.renderCategory(item, i))}
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'black'
    },
    categories: {
        marginVertical: 5,
        alignItems: "center",
    },
    categoryUnderline: {
        backgroundColor: 'black',
    }
});

export default withNavigation(Categories);