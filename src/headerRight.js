import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

const LOGO_SIZE = 20;

class HeaderCenter extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon name="upload" type="antdesign" onPress={() => console.log('Selling')} />
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

export default HeaderCenter;