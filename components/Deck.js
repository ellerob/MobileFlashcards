import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api'

class Deck extends Component {

  render() {
    const { navigation } = this.props;
    
    const numberOfCards = navigation.state.params.numberOfCards;
    const title = navigation.state.params.title;
    
    console.log('ITEM', item)
    const title = item && item.title
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{numberOfCards}</Text>
      </View>
    )
  }
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC'
  },
  text: {
    color: '#2F4F4F',
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    margin: 30,
    width: 200,
  }
})

// function mapDispatchToProps(dispatch) {
//   return {
//     addDeck: (title) => dispatch(addDeck(title))
//   }
// }
export default Deck;


