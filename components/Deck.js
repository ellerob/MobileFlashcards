import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api'

class Deck extends Component {

  render() {
    const { navigation } = this.props;
    const { deck } = navigation.state.params
    const numberCards = deck.questions.length

    console.log('ITEM', deck.title)

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{deck.title}</Text>
        <Text style={styles.text}>{`${numberCards} Cards `}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('AddCard', {title: deck.title})}
          title="Add Card"
          color="#841584"
        />
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


