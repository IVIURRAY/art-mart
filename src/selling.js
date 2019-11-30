import React, { useEffect, useReducer } from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import API, { graphqlOperation } from '@aws-amplify/api'

class Selling extends React.Component {
    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
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
        return (
            <View style={styles.container}>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddeeff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

export default withNavigation(Selling)