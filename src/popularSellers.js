import React from 'react';
import { Card, ListItem } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listUsers } from './graphql/queries';

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
            users: [],
            defaultPic: '../assets/avatar1.png'
        }
    }

    componentDidMount() {
        this.getRecentProducts()
    }

    getRecentProducts = async () => {
        console.log('Starting query for users');
        const users = await API.graphql(graphqlOperation(listUsers));
        this.setState({ users: users.data.listUsers.items })
        console.log('Query for users complete');
    }

    renderSeller(user, i) {
        const { avatar } = user;
        // console.log('../assets/' + avatar);

        return (
            <ListItem
                key={i}
                title={user.name}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'black' }}
                subtitle="Visit Store"
                leftAvatar={{ rounded: true, size: 'large', source: { uri: 'https://art-mart-storage-dev.s3-eu-west-1.amazonaws.com/images/users/avatar1.png' }, avatarStyle: styles.sellerCardImage }}
                rightIcon={< Icon name='hearto' size={18} />}
                chevron={{ color: 'black' }}
                containerStyle={styles.sellerCard}
                contentContainerStyle={styles.sellerCardContent}
            />
        );
    }

    render() {
        const { users } = this.state;
        // console.log('this is renders')
        // console.log(users);
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