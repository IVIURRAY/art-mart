import React from 'react'
import { View, StyleSheet, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import AppHeader from './appHeader';

class Selling extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            title: '',
            description: '',
            price: 0
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
        console.log('This is uri: ', result);
    }

    _uploadProduct = async () => {
        const { image, price, title, description } = this.state;

        if (!image) {
            Alert.alert('Please uplodate an image.');
            return
        } else if (!price) {
            Alert.alert('Please specify a price.');
            return
        } else if (!title) {
            Alert.alert('Please add a title.');
            return
        } else if (!description) {
            Alert.alert('Please give a description.');
            return
        } else {
            console.log('Passed validation, will upload product:', this.state)
        }
    }

    render() {
        console.log(this.state);

        if (this.state.image) {
            button = <Image style={styles.image} source={{ uri: this.state.image }} />;
        } else {
            button = <Button title="Chose image" onPress={this._pickImage} />;
        }

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <AppHeader />
                <View style={styles.imageContainer}>
                    {button}
                </View>
                <View style={styles.titleContainer}>
                    <TextInput style={styles.titletStyles} defaultValue="Title" onChangeText={val => this.setState({ title: val })} />
                </View>
                <View style={styles.descriptionContainer}>
                    <TextInput style={styles.descriptionStyles} defaultValue="Description" onChangeText={val => this.setState({ description: val })} />
                </View>
                <View style={styles.priceContainer}>
                    <TextInput style={styles.priceStyles} defaultValue="£10.00" keyboardType="numeric" onChangeText={val => this.setState({ price: val })} />
                </View>
                <View style={styles.uploadContainer}>
                    <Button
                        title="Upload product"
                        onPress={this._uploadProduct}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    imageContainer: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 400,
    },
    titleContainer: {
        flex: 1,
    },
    titletStyles: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    descriptionContainer: {
        flex: 1
    },
    descriptionStyles: {
        fontSize: 18,
        color: 'grey',
    },
    priceContainer: {
        flex: 1,
    },
    priceStyles: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    uploadContainer: {
        flex: 1
    }
});

export default withNavigation(Selling)