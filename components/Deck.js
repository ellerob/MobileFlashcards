import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux';
import { recieveDeck } from '../actions';
import { getDeck, clear } from '../utils/api'

class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: undefined
    }
  }

  
   componentDidMount() {
    const title = this.props.navigation.state.params.deck.title
    getDeck(title)
      .then(deck => this.setState({deck}))
    
  }

  onButtonPress() {
    const { deck } = this.state;
    this.props.navigation.navigate('AddCard', {deck: deck})
  }

  render() {
    if(!this.state.deck) return null;

    const {
      deck,
    } = this.state;

    const numberCards = deck.questions.length
    
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{deck.title}</Text>
        <Text style={styles.text}>{`${numberCards} Cards `}</Text>
        <Button
          onPress={() => this.onButtonPress()}
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

function mapStateToProps (state) {
  return {
      deck: state.deck
  }
}
function mapDispatchToProps(dispatch) {
  return {
    recieveDeck: (deck) => dispatch(recieveDeck(deck))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Deck);


