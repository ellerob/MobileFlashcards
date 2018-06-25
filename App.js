import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createStore } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools';
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation';
import reducer from './reducers'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Decks from './components/Decks'
import Deck from './components/Deck'


const store = createStore(reducer, devToolsEnhancer());

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks
  },
  AddDeck: {
    screen: AddDeck
  },
});

const Stack = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {title: 'Home', headerTintColor: '#8FBC8F'},
  },
  Deck: {
    screen: Deck,
    navigationOptions: {title: 'Deck', headerTintColor: '#8FBC8F',},
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
  