import React from 'react'
import API, { graphqlOperation } from '@aws-amplify/api';
import { Storage, Auth } from 'aws-amplify';
import { View, StyleSheet, TextInput, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { createProduct } from './graphql/mutations'
const uuidv4 = require('uuid/v4');

class Selling extends React.Component {
    constructor(props) {
        super(props)
        this.initialState = {
            imageUri: '',
            title: '',
            description: '',
            price: 0
        }
        this.state = this.initialState
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
            this.setState({
                imageUri: result.uri
            });
        }
    }

    _uploadProduct = async () => {
        const { imageUri, price, title, description } = this.state;

        if (!imageUri) {
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
            console.log('Passed validation, will upload product:', title)
        }

        // Any user made through the AWS console needs a password reset...
        // const user = await Auth.signIn(
        //     'admin@test.com',
        //     'admin123'
        // ).then(res => {
        //     Auth.completeNewPassword(res, 'admin1234') // give the user a new password
        //         .then(res => console.log('USER PASSWORD::', res))
        //         .catch(err => console.log('USER PASSWORD::', err))
        //     console.log('USER SUCCESS::', res)
        // })
        //     .catch(err => console.log('USER ERROR::', err));

        // User needs to be authenticated to upload to S3
        // TODO - This needs to be the actual user...probably send them to the login page
        await Auth.signIn(
            'admin@test.com',
            'admin1234'
        ).then(res => console.log('sign in'))
            .catch(err => console.log('not sign in'))

        console.log('Authenticated user:', await Auth.currentAuthenticatedUser());

        // Upload the image to S3...give the file name to Dynamo
        const fileTypeSplit = imageUri.split('.');
        const fileType = fileTypeSplit[fileTypeSplit.length - 1];
        const s3FileName = `${uuidv4()}.${fileType}`;
        fetch(imageUri)
            .then(response => {
                response.blob()
                    .then(blob => {
                        Storage.put(
                            'products/' + s3FileName,
                            blob,
                            {
                                level: 'public',
                                contentType: fileType
                            }
                        )
                            .then(res => console.log('S3 File upload successful::', res))
                            .catch(err => console.log('S3 File upload failed::', err));
                    })
            })
            .catch(err => console.log('Unable to fetch image', err))


        // Using the new S3 file path...give that to dynamo to save.
        result = await API.graphql(
            graphqlOperation(
                createProduct,
                {
                    input: {
                        name: title,
                        description: description,
                        price: parseFloat(price),
                        mainImage: s3FileName
                    }
                }
            ))
            .then(res => {
                console.log('Dynamo SUCCESS::', res)
                Alert.alert(`Successfully uploaded ${title}.`)
                this.setState(this.initialState)
                console.log('Home');
            })
            .catch(err => {
                console.log('Dynamo ERROR::', err)
                Alert.alert('Issue with uploading product. Please try again.')
            })
        console.log(result);
    }

    render() {
        if (this.state.imageUri) {
            button = <Image style={styles.image} source={{ uri: this.state.imageUri }} />;
        } else {
            button = <Button title="Chose image" onPress={this._pickImage} />;
        }

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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

export default Selling;