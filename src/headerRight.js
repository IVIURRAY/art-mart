import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements'

const LOGO_SIZE = 20;

class HeaderCenter extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Icon name="upload" type="antdesign" onPress={() => navigate('Selling')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    }
});

export default withNavigation(HeaderCenter);