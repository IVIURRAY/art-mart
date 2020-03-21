import React from 'react';
import { Text, StyleSheet, ImageBackground, View, Image } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableHighlight } from 'react-native-gesture-handler';

class Login extends React.Component {

    render() {
        return (
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={require('../assets/background1.png')}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }} >
                        <TouchableHighlight onPress={() => console.log('Home')}>
                            <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100 }} />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input
                            placeholder='USERNAME'
                            leftIcon={<Icon name='user' size={24} color='white' />}
                            placeholderTextColor='white'
                            inputStyle={{ padding: 10, color: 'white' }}
                        />
                        <Input
                            secureTextEntry
                            placeholder='PASSWORD'
                            leftIcon={<Icon name='lock' size={24} color='white' />}
                            placeholderTextColor='white'
                            inputStyle={{ padding: 10, color: 'white' }}
                            type='password'
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button title="Sign In" titleStyle={{ color: 'white' }} type="outline" buttonStyle={styles.btnStyle} />
                    </View>
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Forgot password?</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <SocialIcon
                            title='Sign In With Facebook'
                            button
                            type='facebook'
                            style={{ backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1 }}
                        />
                    </View>
                </View>

            </ImageBackground >

        );
    }

}

const styles = StyleSheet.create({
    btnStyle: {
        borderColor: 'white',
        borderRadius: 60,
        marginHorizontal: 40,
    },
});

export default Login;