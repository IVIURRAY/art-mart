import React from 'react';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { Badge } from 'react-native-elements'
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

class BottomNavigationTabs extends React.Component {

    tabs = [
        {
            key: 'Home',
            icon: 'home',
            label: 'Home',
            pressColor: 'white'
        },
        {
            key: 'Basket',
            icon: 'shoppingcart',
            label: 'Basket',
            pressColor: 'white'
        },
        {
            key: 'Watchlist',
            icon: 'hearto',
            label: 'Watch List',
            pressColor: 'white'
        },
        {
            key: 'Login',
            icon: 'user',
            label: 'Sign In',
            pressColor: 'white'
        }
    ]

    num_items_in_basket = 5;

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            labelStyle={{ color: '#000000' }}
            renderIcon={() => this.renderIcon(tab.icon)}
        />
    )

    renderIcon(icon) {
        return (
            <View>
                <Icon size={24} name={icon} />
                {
                    icon === 'shoppingcart' &&
                    <Badge value="4" status="error" containerStyle={{ position: 'absolute', top: -4, right: -10 }} />
                }

            </View>
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <BottomNavigation
                onTabPress={newTab => navigate(newTab.key)}
                renderTab={this.renderTab}
                tabs={this.tabs}
            />
        );
    }
}

export default withNavigation(BottomNavigationTabs);