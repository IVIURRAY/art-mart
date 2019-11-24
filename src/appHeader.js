import React from 'react';
import { Header } from 'react-native-elements'
import HeaderCenter from '../src/headerCenter';
import HeaderRight from '../src/headerRight'

class AppHeader extends React.Component {
    render() {
        return (
            <Header
                centerComponent={<HeaderCenter />}
                rightComponent={<HeaderRight />}
                backgroundColor='white' />
        );
    }
}

export default AppHeader