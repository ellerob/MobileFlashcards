import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class Deck extends Component {

  onButtonPress(thisDeck) {
    console.log(thisDeck)
    this.props.navigation.navigate('AddCard', {deck: thisDeck})
  }

  render() {
    if(this.props.decks === null) return null;
    const title = this.props.navigation.state.params.title
    console.log('TITLE', title)
    const decks = Object.values(this.props.decks)
    decks.map(deck => {
      if (deck.title === title) {
        thisDeck = deck
      }
    })

    const numberCards = thisDeck.questions.length
    
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{thisDeck.title}</Text>
        <Text style={styles.text}>{`${numberCards} Cards `}</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('Quiz', {questions: thisDeck.questions})}
          title="Quiz"
          color="#841584"
        />
        <Button
          onPress={() => this.onButtonPress(thisDeck)}
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

function mapStateToProps (state ) {
  return {
      decks: state,
  }
}

export default withNavigation(connect(mapStateToProps, null)(Deck));


