import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    render() {
        const { search } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <SearchBar
                placeholder="Search for a product..."
                onChangeText={searchValue => this.setState({ search: searchValue })}
                value={search}
                onSubmitEditing={() => navigate('Products')}
                inputContainerStyle={styles.searchbarInput}
                containerStyle={styles.searchbarContainer}
            />
        );
    }
}

const styles = StyleSheet.create({
    searchbarContainer: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 5,
        borderColor: 'white',
        borderTopColor: 'white',
        borderBottomColor: 'white',
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    searchbarInput: {
        backgroundColor: 'white',
        height: 30,
    }
});

export default withNavigation(Searchbar);