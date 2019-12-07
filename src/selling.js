import React, { useEffect, useReducer } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
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

        console.log(result);
    }

    render() {
        console.log(this.state);
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Button
                        title="Chose image"
                        onPress={this._pickImage}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <TextInput defaultValue="Title" onChangeText={val => this.setState({ title: val })} />
                </View>
                <View style={styles.descriptionContainer}>
                    <TextInput defaultValue="Description" onChangeText={val => this.setState({ description: val })} />
                </View>
                <View style={styles.priceContainer}>
                    <TextInput defaultValue="10.00" keyboardType="numeric" onChangeText={val => this.setState({ price: val })} />
                </View>
                <View style={styles.uploadContainer}>
                    <Button
                        title="List product"
                        onPress={this._uploadProduct}
                    />
                </View>
            </View>
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
    titleContainer: {
        flex: 1
    },
    descriptionContainer: {
        flex: 1
    },
    priceContainer: {
        flex: 1
    },
    uploadContainer: {
        flex: 1
    }
});

export default withNavigation(Selling)