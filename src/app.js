import Homepage from '../src/homepage';
import Product from '../src/product';
import Products from '../src/products';
import Basket from '../src/basket';
import Login from '../src/login';
import Selling from '../src/selling';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

console.disableYellowBox = true; // TODO - disbales the warning during Expo

const MainNavigator = createStackNavigator({
    Home: { screen: Homepage },
    Product: { screen: Product },
    Products: { screen: Products },
    Basket: { screen: Basket },
    Login: { screen: Login },
    Selling: { screen: Selling }
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
}
);

const App = createAppContainer(MainNavigator);

export default App;