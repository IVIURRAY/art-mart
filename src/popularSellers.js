import React from 'react';
import { Card, ListItem } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listUsers } from './graphql/queries';
import { Storage } from 'aws-amplify';

USERS = [
    {
        name: 'Byrnn',
        avatar: require('../assets/avatar1.png')
    },
    {
        name: 'Paul',
        avatar: require('../assets/avatar2.png')
    },
    {
        name: 'Sarah',
        avatar: require('../assets/avatar3.png')
    }
]

export default class PopularSellers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getPopularUsers()
    }

    getPopularUsers = async () => {
        console.log('Starting query for users');
        const users = await API.graphql(graphqlOperation(listUsers));

        console.log(users);
        console.log('Start')
        const items = await users.data.listUsers.items.reduce(async (promisedItems, user) => {
            const items = await promisedItems
            user.avatar = await this.getUserImage(user.avatar);
            return items.concat(user)
        }, [])
        // console.log(items);
        console.log('End')

        console.log('Query for users complete');

        this.setState({ users: items })
    }

    getUserImage = async (userAvatar) => {
        console.log('starting image get')
        const path = 'users/' + userAvatar;
        const imageUrl = await Storage.get(path)
            .then(result => {
                console.log('successfully got image: ', path);
                return result;
            })
            .catch(err => console.log('ERROR:::' + err));
        console.log('finished image get')

        return imageUrl;
    }

    renderSeller(user, i) {
        const { avatar, username } = user;

        return (
            <ListItem
                key={i}
                title={username}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'black' }}
                subtitle="Visit Store"
                leftAvatar={{ rounded: true, size: 'large', source: { uri: avatar }, avatarStyle: styles.sellerCardImage }}
                rightIcon={< Icon name='hearto' size={18} />}
                chevron={{ color: 'black' }}
                containerStyle={styles.sellerCard}
                contentContainerStyle={styles.sellerCardContent}
            />
        );
    }

    render() {
        const { users } = this.state;
        return (
            <View>
                <Text style={styles.title} >Popular sellers...</Text>
                <Card containerStyle={{ padding: 0, margin: 0 }} >
                    {
                        users.map((u, i) => {
                            return this.renderSeller(u, i);
                        })
                    }
                </Card>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'System',
        fontWeight: 'bold',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    sellerCard: {
        backgroundColor: '#F0F3F4',
        margin: 8,
        borderRadius: 10,
        minHeight: 100,
    },
    sellerCardContent: {

    },
    sellerCardImage: {
        borderRadius: 10,
    },
});