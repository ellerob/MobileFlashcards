import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import { connect } from 'react-redux';
import { addDeck, recieveDecks } from '../actions';
import { saveDeckTitle, getDecks } from '../utils/api'

class AddDeck extends Component {
  state = {
    title: ''
  }

  componentDidMount() {
    getDecks()
      .then(decks => this.props.recieveDecks(decks))
      .catch(console.log('ERROR'))
  }

  onSubmit() {
    const { title } = this.state;
    const decks = Object.values(this.props.decks)

    const hasTitleAlready = decks.some((deck) => deck.title === title);
    if (!hasTitleAlready) {
      this.props.addDeck(title)
      saveDeckTitle(title)
      this.setState({ title: ''})
    }

    if (hasTitleAlready) {
      Alert.alert(
        'Error',
        'A deck with the same name already exists!',
        [
          {text: 'OK', onPress: () => this.setState({ title: ''})},
        ],
        { cancelable: false }
      )
      
    }
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'blue'}}>What is the title of your new Deck?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Deck Title"
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <Button
          onPress={(e) => this.onSubmit(e)}
          title="Submit"
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
    justifyContent: 'center'
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


function mapStatetoProps(state) {
  console.log('STATE', state)
  return {
    decks: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    recieveDecks: (decks) => dispatch(recieveDecks(decks)),
    addDeck: (title) => dispatch(addDeck(title))
  }
}


export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(AddDeck);
