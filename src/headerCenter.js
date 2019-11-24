import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Font } from 'expo-font';

const LOGO_SIZE = 20;

class HeaderCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'iowan-old-style': require('../assets/fonts/iowan-old-style.ttf')
        }).then(() => {
            this.setState({ fontLoaded: true })
        });
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                {this.state.fontLoaded ?
                    <Text style={styles.title} onPress={() => navigate('Home')} >A R T  M A R T</Text>
                    :
                    <Text style={styles.titleNoFont} onPress={() => navigate('Home')} >A R T  M A R T</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    logo: {
        width: LOGO_SIZE,
        height: LOGO_SIZE,
    },
    titleNoFont: {
        fontSize: 28,
    },
    title: {
        fontSize: 28,
        fontFamily: 'iowan-old-style'
    }

});

export default withNavigation(HeaderCenter);